import type { TranscriptSegment } from "@/types";

export interface TranscriptionResult {
  text: string;
  segments: TranscriptSegment[];
  language: string;
  durationSeconds: number;
}

const TRANSCRIPTION_PROMPT = `Transcribe this YouTube video verbatim. Return ONLY valid JSON matching this schema — no markdown fences, no commentary.

{
  "text": "The complete verbatim transcription as a single continuous string",
  "segments": [
    {"start": 0.0, "end": 12.5, "text": "First segment of speech..."},
    {"start": 12.5, "end": 25.0, "text": "Next segment of speech..."}
  ],
  "language": "en",
  "durationSeconds": 600
}

Rules:
- "text": complete verbatim transcript, all spoken words
- "segments": break into chunks of roughly 15-30 seconds each with start/end timestamps in seconds
- "language": ISO 639-1 code of the primary spoken language (e.g. "en", "ar", "fr")
- "durationSeconds": total video duration in seconds (integer)
- Transcribe exactly what is said — do not summarize or paraphrase`;

export async function transcribeYouTubeVideo(
  videoId: string
): Promise<TranscriptionResult> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_GEMINI_API_KEY is not configured");
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const result = await model.generateContent([
    {
      fileData: {
        fileUri: youtubeUrl,
        mimeType: "video/mp4",
      },
    },
    { text: TRANSCRIPTION_PROMPT },
  ]);

  const raw = result.response.text();
  return parseTranscriptionResponse(raw);
}

function parseTranscriptionResponse(raw: string): TranscriptionResult {
  let json = raw.trim();
  const fenceMatch = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) json = fenceMatch[1].trim();

  const parsed = JSON.parse(json);

  if (typeof parsed.text !== "string" || !parsed.text.trim()) {
    throw new Error("Transcription returned empty text");
  }

  const segments: TranscriptSegment[] = Array.isArray(parsed.segments)
    ? parsed.segments
        .filter(
          (s: Record<string, unknown>) =>
            typeof s.start === "number" &&
            typeof s.end === "number" &&
            typeof s.text === "string"
        )
        .map((s: { start: number; end: number; text: string }) => ({
          start: Math.round(s.start * 10) / 10,
          end: Math.round(s.end * 10) / 10,
          text: s.text.trim(),
        }))
    : [];

  const language =
    typeof parsed.language === "string" && parsed.language.length === 2
      ? parsed.language
      : "en";

  const durationSeconds =
    typeof parsed.durationSeconds === "number" && parsed.durationSeconds > 0
      ? Math.round(parsed.durationSeconds)
      : segments.length > 0
        ? Math.round(segments[segments.length - 1].end)
        : 0;

  return { text: parsed.text.trim(), segments, language, durationSeconds };
}

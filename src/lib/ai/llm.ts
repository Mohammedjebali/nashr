import type { GeneratedContent, BlogSection } from "@/types";

interface LLMGenerateInput {
  title: string;
  sourceText: string;
  sourceType: "youtube" | "upload" | "text";
  language: string;
}

interface LLMContentResult {
  linkedinPost: string;
  xThread: string[];
  blogOutline: BlogSection[];
  blogDraft: string;
  hooks: string[];
  hashtags: string[];
  captions: string[];
}

const CONTENT_PROMPT = `You are Nashr, an AI content repurposing assistant for creators in the MENA region and beyond.

Given the following source material, generate all of these content formats. Respond with ONLY valid JSON matching the schema below — no markdown fences, no commentary.

Source title: {{TITLE}}
Source type: {{SOURCE_TYPE}}
Detected language: {{LANGUAGE}}

Source text:
---
{{SOURCE_TEXT}}
---

Output JSON schema:
{
  "linkedinPost": "A professional LinkedIn post (300-600 words). Include relevant hashtags at the end.",
  "xThread": ["Array of 4-8 tweets forming a thread. First tweet is the hook. Last is a CTA."],
  "blogOutline": [{"heading": "Section title", "points": ["bullet point 1", "bullet point 2"]}],
  "blogDraft": "Full markdown blog post (800-1500 words) with ## headings.",
  "hooks": ["6 attention-grabbing opening lines for social media"],
  "hashtags": ["12 relevant hashtags including niche and broad tags"],
  "captions": ["5 short social media captions (under 150 chars each)"]
}

Important:
- If the source is in Arabic or French, generate content in that language.
- Make the LinkedIn post professional but conversational.
- Make the X thread punchy and engaging.
- Blog draft should be well-structured with clear sections.
- Hooks should create curiosity or urgency.
- Hashtags should mix niche and broad reach tags.`;

function buildPrompt(input: LLMGenerateInput): string {
  return CONTENT_PROMPT.replace("{{TITLE}}", input.title)
    .replace("{{SOURCE_TYPE}}", input.sourceType)
    .replace("{{LANGUAGE}}", input.language)
    .replace("{{SOURCE_TEXT}}", input.sourceText.slice(0, 12000));
}

function parseLLMResponse(raw: string): LLMContentResult | null {
  try {
    let json = raw.trim();
    const fenceMatch = json.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) json = fenceMatch[1].trim();

    const parsed = JSON.parse(json);

    if (
      typeof parsed.linkedinPost !== "string" ||
      !Array.isArray(parsed.xThread) ||
      !Array.isArray(parsed.blogOutline) ||
      typeof parsed.blogDraft !== "string" ||
      !Array.isArray(parsed.hooks) ||
      !Array.isArray(parsed.hashtags) ||
      !Array.isArray(parsed.captions)
    ) {
      return null;
    }

    return {
      linkedinPost: parsed.linkedinPost,
      xThread: parsed.xThread.map(String),
      blogOutline: parsed.blogOutline.map(
        (s: { heading?: string; points?: string[] }) => ({
          heading: String(s.heading ?? ""),
          points: Array.isArray(s.points) ? s.points.map(String) : [],
        })
      ),
      blogDraft: parsed.blogDraft,
      hooks: parsed.hooks.map(String),
      hashtags: parsed.hashtags.map(String),
      captions: parsed.captions.map(String),
    };
  } catch {
    return null;
  }
}

export async function generateWithLLM(
  input: LLMGenerateInput
): Promise<GeneratedContent | null> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const prompt = buildPrompt(input);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = parseLLMResponse(text);
    if (!parsed) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function isLLMAvailable(): boolean {
  return !!process.env.GOOGLE_GEMINI_API_KEY;
}

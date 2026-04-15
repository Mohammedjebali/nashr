import type {
  TranscriptSegment,
  Highlight,
  GeneratedContent,
  BlogSection,
} from "@/types";

interface SourceInput {
  type: "youtube" | "upload" | "text";
  value: string;
  title: string;
}

interface GeneratedResult {
  transcript: TranscriptSegment[];
  highlights: Highlight[];
  content: GeneratedContent;
  language: string;
  durationSeconds: number;
}

function sentenceTokenize(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
}

function extractKeyPhrases(sentences: string[]): string[] {
  const words = new Map<string, number>();
  const stops = new Set([
    "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "shall", "can", "need", "dare", "ought",
    "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
    "as", "into", "through", "during", "before", "after", "above", "below",
    "between", "out", "off", "over", "under", "again", "further", "then",
    "once", "here", "there", "when", "where", "why", "how", "all", "both",
    "each", "few", "more", "most", "other", "some", "such", "no", "nor",
    "not", "only", "own", "same", "so", "than", "too", "very", "just",
    "don", "now", "and", "but", "or", "if", "while", "that", "this",
    "these", "those", "it", "its", "i", "me", "my", "we", "our", "you",
    "your", "he", "him", "his", "she", "her", "they", "them", "their",
    "what", "which", "who", "whom", "about", "up", "also", "get", "got",
  ]);
  for (const s of sentences) {
    for (const w of s.toLowerCase().replace(/[^a-z0-9\s'-]/g, "").split(/\s+/)) {
      if (w.length > 3 && !stops.has(w)) {
        words.set(w, (words.get(w) ?? 0) + 1);
      }
    }
  }
  return [...words.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([w]) => w);
}

function pickTopSentences(sentences: string[], count: number): string[] {
  if (sentences.length <= count) return sentences;
  const step = Math.max(1, Math.floor(sentences.length / count));
  const picked: string[] = [];
  for (let i = 0; i < sentences.length && picked.length < count; i += step) {
    picked.push(sentences[i]);
  }
  return picked;
}

function buildTranscript(sentences: string[]): {
  segments: TranscriptSegment[];
  duration: number;
} {
  const segments: TranscriptSegment[] = [];
  let time = 0;
  for (const text of sentences) {
    const wordCount = text.split(/\s+/).length;
    const duration = Math.max(3, Math.round((wordCount / 2.5) * 10) / 10);
    segments.push({
      start: Math.round(time * 10) / 10,
      end: Math.round((time + duration) * 10) / 10,
      text,
    });
    time += duration;
  }
  return { segments, duration: Math.round(time) };
}

function buildHighlights(
  segments: TranscriptSegment[],
  keywords: string[]
): Highlight[] {
  if (segments.length < 2) {
    return [
      {
        id: "hl-gen-1",
        title: "Key Insight",
        startTime: segments[0]?.start ?? 0,
        endTime: segments[0]?.end ?? 5,
        summary: segments[0]?.text ?? "Content summary",
        tags: keywords.slice(0, 3),
      },
    ];
  }

  const chunkSize = Math.max(2, Math.floor(segments.length / 4));
  const highlights: Highlight[] = [];
  const labels = ["Key Insight", "Core Argument", "Main Takeaway", "Action Point"];

  for (let i = 0; i < 4 && i * chunkSize < segments.length; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, segments.length) - 1;
    const bestSeg = segments[start];
    highlights.push({
      id: `hl-gen-${i + 1}`,
      title: labels[i],
      startTime: segments[start].start,
      endTime: segments[end].end,
      summary: bestSeg.text.length > 160
        ? bestSeg.text.slice(0, 157) + "..."
        : bestSeg.text,
      tags: keywords.slice(i * 3, i * 3 + 3).filter(Boolean),
    });
  }

  return highlights;
}

function toHashtag(word: string): string {
  return "#" + word.charAt(0).toUpperCase() + word.slice(1);
}

function buildContent(
  title: string,
  sentences: string[],
  keywords: string[],
  highlights: Highlight[],
  sourceType: string
): GeneratedContent {
  const topSentences = pickTopSentences(sentences, 6);
  const keyPoints = highlights.map((h) => h.summary);

  const linkedinPost = [
    title,
    "",
    topSentences[0] ?? "Key insights from this content:",
    "",
    ...keyPoints.map((p, i) => `${i + 1}. ${p}`),
    "",
    topSentences[topSentences.length - 1] !== topSentences[0]
      ? topSentences[topSentences.length - 1]
      : "What are your thoughts? Drop a comment below.",
    "",
    keywords.slice(0, 8).map(toHashtag).join(" "),
  ].join("\n");

  const xThread: string[] = [
    `${title} — a thread on what I took away:`,
    ...keyPoints.map(
      (p, i) => `${i + 1}/ ${p}`
    ),
    `The bottom line: ${topSentences[topSentences.length - 1] ?? "worth thinking about."}`,
  ];

  const blogOutline: BlogSection[] = [
    {
      heading: "Introduction",
      points: [
        `Why "${title}" matters`,
        topSentences[0] ?? "Context and background",
        `Source: ${sourceType === "youtube" ? "Video content" : sourceType === "text" ? "Written content" : "Uploaded media"}`,
      ],
    },
    ...highlights.map((h) => ({
      heading: h.title,
      points: [
        h.summary,
        ...h.tags.map((t) => `Explore the ${t} angle`),
      ],
    })),
    {
      heading: "Conclusion & Next Steps",
      points: [
        "Summary of key takeaways",
        "Actionable recommendations",
        "Further resources and reading",
      ],
    },
  ];

  const blogDraft = [
    `# ${title}`,
    "",
    topSentences[0] ?? "This content covers several important topics worth exploring.",
    "",
    ...highlights.flatMap((h) => [
      `## ${h.title}`,
      "",
      h.summary,
      "",
      ...sentences
        .filter((s) =>
          h.tags.some((t) => s.toLowerCase().includes(t.toLowerCase()))
        )
        .slice(0, 3)
        .map((s) => s),
      "",
    ]),
    "## Conclusion",
    "",
    topSentences[topSentences.length - 1] ??
      "These insights offer a solid foundation for further exploration.",
    "",
    `*Repurposed from ${sourceType === "youtube" ? "video" : sourceType === "text" ? "text" : "uploaded"} content using Nashr.*`,
  ].join("\n");

  const hooks: string[] = [
    `Here's what most people miss about ${keywords[0] ?? "this topic"}.`,
    `I spent time analyzing "${title}" — here are the takeaways.`,
    `${highlights[0]?.title ?? "This insight"} changed my perspective. Here's why.`,
    `The data is clear on ${keywords[1] ?? "this"}. Let me break it down.`,
    `If you care about ${keywords[2] ?? "growth"}, read this.`,
    `"${topSentences[0]?.slice(0, 80) ?? title}" — let's unpack it.`,
  ];

  const hashtags = keywords.slice(0, 12).map(toHashtag);
  if (hashtags.length < 6) {
    for (const fallback of ["#ContentCreation", "#Insights", "#Growth", "#Strategy", "#Digital", "#MENA"]) {
      if (hashtags.length >= 12) break;
      if (!hashtags.includes(fallback)) hashtags.push(fallback);
    }
  }

  const captions: string[] = [
    `${title} — the key points you need to know.`,
    `${highlights[0]?.summary.slice(0, 100) ?? "Key insight from this content"}.`,
    `${keywords.slice(0, 3).map(toHashtag).join(" ")} — full breakdown inside.`,
    `What I learned from this content will surprise you.`,
    `Save this for later. ${title.split(" ").slice(0, 5).join(" ")}...`,
  ];

  return {
    linkedinPost,
    xThread,
    blogOutline,
    blogDraft,
    hooks,
    hashtags,
    captions,
  };
}

function extractYouTubeContext(url: string): string {
  try {
    const u = new URL(url);
    const videoId = u.searchParams.get("v") ?? u.pathname.split("/").pop() ?? "";
    return `This content is derived from a YouTube video (${videoId}). The video covers the topic in depth with visual and spoken explanations.`;
  } catch {
    return "This content is derived from a YouTube video source.";
  }
}

export function generateFromInput(input: SourceInput): GeneratedResult {
  let rawText: string;

  if (input.type === "text" && input.value.trim().length > 0) {
    rawText = input.value;
  } else if (input.type === "youtube" && input.value.trim().length > 0) {
    const ytContext = extractYouTubeContext(input.value);
    rawText = [
      `${input.title}.`,
      ytContext,
      "The creator shares their perspective on this subject, walking through key points and practical advice.",
      "Several frameworks and strategies are discussed that viewers can immediately apply.",
      "The presentation style emphasizes clarity and actionable takeaways for the audience.",
      "Real-world examples and case studies illustrate the main arguments.",
      "Community engagement and audience building are recurring themes throughout.",
      "The content wraps up with a summary of main points and a call to action for viewers.",
    ].join(" ");
  } else {
    rawText = [
      `${input.title}.`,
      "This content covers the subject matter in detail, exploring multiple dimensions and practical applications.",
      "Key themes include strategy, execution, and measurable outcomes.",
      "The material is structured to provide both high-level insights and actionable specifics.",
      "Examples and frameworks are used to illustrate the core arguments.",
      "The conclusion ties together the main threads and suggests next steps for the audience.",
    ].join(" ");
  }

  const sentences = sentenceTokenize(rawText);
  const keywords = extractKeyPhrases(sentences);
  const { segments, duration } = buildTranscript(sentences);
  const highlights = buildHighlights(segments, keywords);
  const content = buildContent(input.title, sentences, keywords, highlights, input.type);

  const hasArabic = /[\u0600-\u06FF]/.test(rawText);
  const hasFrench = /[àâäéèêëïîôùûüÿçœæ]/i.test(rawText);
  const language = hasArabic ? "ar" : hasFrench ? "fr" : "en";

  return {
    transcript: segments,
    highlights,
    content,
    language,
    durationSeconds: duration,
  };
}

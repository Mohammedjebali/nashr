export interface Project {
  id: string;
  title: string;
  sourceType: "youtube" | "upload" | "text";
  sourceUrl?: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
  thumbnailUrl?: string;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface Highlight {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  summary: string;
  tags: string[];
}

export interface GeneratedContent {
  linkedinPost: string;
  xThread: string[];
  blogOutline: BlogSection[];
  blogDraft: string;
  hooks: string[];
  hashtags: string[];
  captions: string[];
}

export interface BlogSection {
  heading: string;
  points: string[];
}

export interface ProjectResult {
  project: Project;
  transcript: TranscriptSegment[];
  highlights: Highlight[];
  content: GeneratedContent;
}

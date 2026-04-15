import type { ProjectResult } from "@/types";
import { getMockProjectResult } from "@/lib/mock-data";

export async function processContent(input: {
  type: "youtube" | "upload" | "text";
  value: string;
}): Promise<ProjectResult> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return getMockProjectResult("proj-1");
}

export async function processYouTubeUrl(url: string): Promise<ProjectResult> {
  return processContent({ type: "youtube", value: url });
}

export async function processUploadedFile(
  _file: File,
): Promise<ProjectResult> {
  return processContent({ type: "upload", value: "uploaded-file" });
}

export async function processText(text: string): Promise<ProjectResult> {
  return processContent({ type: "text", value: text });
}

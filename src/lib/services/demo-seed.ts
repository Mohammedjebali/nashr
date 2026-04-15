import type { SupabaseClient } from "@supabase/supabase-js";
import {
  mockTranscript,
  mockHighlights,
  mockGeneratedContent,
} from "@/lib/mock-data";

export async function seedDemoContent(
  supabase: SupabaseClient,
  projectId: string
) {
  await supabase.from("transcripts").insert({
    project_id: projectId,
    segments: mockTranscript,
    language: "en",
    duration_seconds: 145,
  });

  await supabase.from("highlights").insert(
    mockHighlights.map((h) => ({
      project_id: projectId,
      title: h.title,
      start_time: h.startTime,
      end_time: h.endTime,
      summary: h.summary,
      tags: h.tags,
    }))
  );

  const assets: { asset_type: string; content: Record<string, unknown> }[] = [
    { asset_type: "linkedin", content: { text: mockGeneratedContent.linkedinPost } },
    { asset_type: "x_thread", content: { tweets: mockGeneratedContent.xThread } },
    {
      asset_type: "blog_outline",
      content: { sections: mockGeneratedContent.blogOutline },
    },
    { asset_type: "blog_draft", content: { text: mockGeneratedContent.blogDraft } },
    { asset_type: "hooks", content: { items: mockGeneratedContent.hooks } },
    { asset_type: "hashtags", content: { items: mockGeneratedContent.hashtags } },
    { asset_type: "captions", content: { items: mockGeneratedContent.captions } },
  ];

  await supabase.from("generated_assets").insert(
    assets.map((a) => ({
      project_id: projectId,
      asset_type: a.asset_type,
      content: a.content,
    }))
  );
}

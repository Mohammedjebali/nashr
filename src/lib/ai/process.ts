"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { generateFromInput } from "@/lib/ai/generate";

export async function processProject(
  supabase: SupabaseClient,
  projectId: string,
  input: { type: "youtube" | "upload" | "text"; value: string; title: string }
) {
  const result = generateFromInput(input);

  await supabase.from("transcripts").insert({
    project_id: projectId,
    segments: result.transcript,
    language: result.language,
    duration_seconds: result.durationSeconds,
  });

  await supabase.from("highlights").insert(
    result.highlights.map((h) => ({
      project_id: projectId,
      title: h.title,
      start_time: h.startTime,
      end_time: h.endTime,
      summary: h.summary,
      tags: h.tags,
    }))
  );

  const assets: { asset_type: string; content: Record<string, unknown> }[] = [
    { asset_type: "linkedin", content: { text: result.content.linkedinPost } },
    { asset_type: "x_thread", content: { tweets: result.content.xThread } },
    { asset_type: "blog_outline", content: { sections: result.content.blogOutline } },
    { asset_type: "blog_draft", content: { text: result.content.blogDraft } },
    { asset_type: "hooks", content: { items: result.content.hooks } },
    { asset_type: "hashtags", content: { items: result.content.hashtags } },
    { asset_type: "captions", content: { items: result.content.captions } },
  ];

  await supabase.from("generated_assets").insert(
    assets.map((a) => ({
      project_id: projectId,
      asset_type: a.asset_type,
      content: a.content,
    }))
  );
}

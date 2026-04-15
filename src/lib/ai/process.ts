import type { SupabaseClient } from "@supabase/supabase-js";
import { generateFromInput } from "@/lib/ai/generate";

export async function processProject(
  supabase: SupabaseClient,
  projectId: string,
  userId: string,
  input: { type: "youtube" | "upload" | "text"; value: string; title: string }
) {
  const result = await generateFromInput(input);

  await supabase.from("transcripts").upsert(
    {
      project_id: projectId,
      segments: result.transcript,
      language: result.language,
      duration_seconds: result.durationSeconds,
    },
    { onConflict: "project_id" }
  );

  await supabase
    .from("highlights")
    .delete()
    .eq("project_id", projectId);

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

  await supabase
    .from("generated_assets")
    .delete()
    .eq("project_id", projectId);

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

  await supabase.from("usage_events").insert({
    user_id: userId,
    project_id: projectId,
    event_type: "generation_completed",
    metadata: { generated_by: result.generatedBy, language: result.language },
  });
}

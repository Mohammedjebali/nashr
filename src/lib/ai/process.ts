"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { seedDemoContent } from "@/lib/services/demo-seed";

/**
 * Entrypoint for content processing. Replace internals with real
 * AI / video services when ready — the interface stays the same.
 *
 * Steps (currently backed by demo seed data):
 *   1. transcribe  — produce transcript segments
 *   2. extract     — pull highlights from transcript
 *   3. generate    — create LinkedIn, X thread, blog, hooks, hashtags, captions
 */
export async function processProject(
  supabase: SupabaseClient,
  projectId: string,
  _input: { type: "youtube" | "upload" | "text"; value: string }
) {
  // TODO: replace with real pipeline stages:
  //   const transcript = await transcribe(input);
  //   const highlights = await extractHighlights(transcript);
  //   const assets     = await generateAssets(transcript, highlights);
  //   await persistResults(supabase, projectId, { transcript, highlights, assets });

  await seedDemoContent(supabase, projectId);
}

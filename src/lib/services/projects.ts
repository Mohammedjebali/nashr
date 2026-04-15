import type { Project, ProjectResult, CreateProjectInput } from "@/types";
import { getMockProjectResult, mockProjects } from "@/lib/mock-data";
import { processProject } from "@/lib/ai/process";

const USE_SUPABASE =
  typeof process !== "undefined" &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function mapDbProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    title: row.title as string,
    sourceType: row.source_type as Project["sourceType"],
    sourceUrl: row.source_url as string | null,
    status: row.status as Project["status"],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    thumbnailUrl: row.thumbnail_url as string | null,
  };
}

export async function listProjects(userId: string): Promise<Project[]> {
  if (USE_SUPABASE) {
    const { createSupabaseServer } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((r: Record<string, unknown>) => mapDbProject(r));
  }

  return mockProjects;
}

export async function getProjectResult(
  projectId: string,
  _userId?: string
): Promise<ProjectResult | null> {
  if (USE_SUPABASE) {
    const { createSupabaseServer } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServer();

    const [projectRes, transcriptRes, highlightsRes, assetsRes, usageRes] =
      await Promise.all([
        supabase.from("projects").select("*").eq("id", projectId).single(),
        supabase
          .from("transcripts")
          .select("*")
          .eq("project_id", projectId)
          .single(),
        supabase
          .from("highlights")
          .select("*")
          .eq("project_id", projectId)
          .order("start_time"),
        supabase
          .from("generated_assets")
          .select("*")
          .eq("project_id", projectId),
        supabase
          .from("usage_events")
          .select("metadata")
          .eq("project_id", projectId)
          .eq("event_type", "generation_completed")
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

    if (projectRes.error) return null;

    const project = mapDbProject(projectRes.data as Record<string, unknown>);
    const transcript = ((transcriptRes.data as Record<string, unknown>)
      ?.segments ?? []) as { start: number; end: number; text: string }[];
    const highlights = (
      (highlightsRes.data ?? []) as Record<string, unknown>[]
    ).map((h) => ({
      id: h.id as string,
      title: h.title as string,
      startTime: Number(h.start_time),
      endTime: Number(h.end_time),
      summary: h.summary as string,
      tags: (h.tags ?? []) as string[],
    }));

    const assetsMap = new Map<string, Record<string, unknown>>();
    for (const a of (assetsRes.data ?? []) as Record<string, unknown>[]) {
      assetsMap.set(
        a.asset_type as string,
        a.content as Record<string, unknown>
      );
    }

    const content = {
      linkedinPost: (assetsMap.get("linkedin")?.text as string) ?? "",
      xThread: (assetsMap.get("x_thread")?.tweets as string[]) ?? [],
      blogOutline:
        (assetsMap.get("blog_outline")?.sections as {
          heading: string;
          points: string[];
        }[]) ?? [],
      blogDraft: (assetsMap.get("blog_draft")?.text as string) ?? "",
      hooks: (assetsMap.get("hooks")?.items as string[]) ?? [],
      hashtags: (assetsMap.get("hashtags")?.items as string[]) ?? [],
      captions: (assetsMap.get("captions")?.items as string[]) ?? [],
    };

    const generatedBy =
      ((usageRes.data?.[0] as Record<string, unknown> | undefined)?.metadata as
        | Record<string, unknown>
        | undefined)?.generated_by as "llm" | "deterministic" | undefined;

    return { project, transcript, highlights, content, generatedBy };
  }

  return getMockProjectResult(projectId);
}

export async function createProject(
  input: CreateProjectInput,
  userId: string
): Promise<Project> {
  if (USE_SUPABASE) {
    const { createSupabaseServer } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: userId,
        title: input.title,
        source_type: input.sourceType,
        source_url: input.sourceUrl ?? null,
        status: "draft",
      })
      .select()
      .single();

    if (error) throw error;

    const projectId = (data as Record<string, unknown>).id as string;

    if (input.rawText || input.sourceUrl) {
      await supabase.from("source_inputs").insert({
        project_id: projectId,
        input_type: input.sourceType,
        raw_url: input.sourceUrl ?? null,
        raw_text: input.rawText ?? null,
      });
    }

    await supabase.from("usage_events").insert({
      user_id: userId,
      project_id: projectId,
      event_type: "project_created",
      metadata: { source_type: input.sourceType },
    });

    await supabase
      .from("projects")
      .update({ status: "processing" })
      .eq("id", projectId);

    try {
      await processProject(supabase, projectId, {
        type: input.sourceType,
        value: input.sourceUrl ?? input.rawText ?? "",
        title: input.title,
      });

      await supabase
        .from("projects")
        .update({ status: "completed" })
        .eq("id", projectId);
    } catch {
      await supabase
        .from("projects")
        .update({ status: "failed" })
        .eq("id", projectId);
      throw new Error("Content generation failed");
    }

    return mapDbProject({
      ...(data as Record<string, unknown>),
      status: "completed",
    });
  }

  const mockId = `proj-${Date.now()}`;
  return {
    id: mockId,
    user_id: userId,
    title: input.title,
    sourceType: input.sourceType,
    sourceUrl: input.sourceUrl ?? null,
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    thumbnailUrl: null,
  };
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProject } from "@/lib/services/projects";
import { getUser } from "@/lib/supabase/server";
import type { CreateProjectInput } from "@/types";

export type ProjectActionResult = {
  error?: string;
  projectId?: string;
};

export async function createProjectAction(
  input: CreateProjectInput
): Promise<ProjectActionResult> {
  const user = await getUser();
  if (!user) redirect("/login");

  if (!input.title.trim()) {
    return { error: "Project title is required." };
  }
  if (input.sourceType === "youtube" && !input.sourceUrl?.trim()) {
    return { error: "YouTube URL is required." };
  }
  if (input.sourceType === "text" && !input.rawText?.trim()) {
    return { error: "Text content is required." };
  }

  try {
    const project = await createProject(input, user.id);
    revalidatePath("/dashboard");
    redirect(`/project/${project.id}`);
  } catch (err) {
    if (typeof err === "object" && err !== null && "digest" in err) {
      throw err;
    }
    return { error: "Something went wrong creating your project. Please try again." };
  }
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProject } from "@/lib/services/projects";
import { getUser } from "@/lib/supabase/server";
import type { CreateProjectInput } from "@/types";

export async function createProjectAction(input: CreateProjectInput) {
  const user = await getUser();
  if (!user) redirect("/login");

  const project = await createProject(input, user.id);
  revalidatePath("/dashboard");
  redirect(`/project/${project.id}`);
}

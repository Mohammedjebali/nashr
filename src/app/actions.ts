"use server";

import { redirect } from "next/navigation";
import { createProject } from "@/lib/services/projects";
import { getUser } from "@/lib/supabase/server";
import type { CreateProjectInput } from "@/types";

export async function createProjectAction(input: CreateProjectInput) {
  const user = await getUser();
  if (!user) redirect("/login");

  const project = await createProject(input, user.id);
  redirect(`/project/${project.id}`);
}

"use server";

import { redirect } from "next/navigation";
import { createProject } from "@/lib/services/projects";
import type { CreateProjectInput } from "@/types";

export async function createProjectAction(input: CreateProjectInput) {
  const project = await createProject(input);
  redirect(`/project/${project.id}`);
}

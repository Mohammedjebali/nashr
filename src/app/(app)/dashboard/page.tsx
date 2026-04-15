import { redirect } from "next/navigation";
import { InputCard } from "@/components/dashboard/input-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { listProjects } from "@/lib/services/projects";
import { getUser } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  const projects = await listProjects(user.id);

  const completed = projects.filter((p) => p.status === "completed").length;
  const processing = projects.filter((p) => p.status === "processing").length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload content and generate repurposed formats instantly.
          </p>
        </div>
        {projects.length > 0 && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">{completed}</span>{" "}
              completed
            </span>
            {processing > 0 && (
              <span>
                <span className="font-medium text-foreground">
                  {processing}
                </span>{" "}
                processing
              </span>
            )}
            <span>
              <span className="font-medium text-foreground">
                {projects.length}
              </span>{" "}
              total
            </span>
          </div>
        )}
      </div>
      <InputCard />
      <ProjectList projects={projects} />
    </div>
  );
}

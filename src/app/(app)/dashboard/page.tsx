import { InputCard } from "@/components/dashboard/input-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { listProjects } from "@/lib/services/projects";

export default async function DashboardPage() {
  const projects = await listProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload content and generate repurposed formats instantly.
        </p>
      </div>
      <InputCard />
      <ProjectList projects={projects} />
    </div>
  );
}

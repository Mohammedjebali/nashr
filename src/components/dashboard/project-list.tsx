"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/mock-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

const sourceLabels: Record<string, string> = {
  youtube: "YouTube",
  upload: "Upload",
  text: "Text",
};

export function ProjectList() {
  if (mockProjects.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-12 text-center">
          <svg className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <p className="text-sm text-muted-foreground mb-1">No projects yet</p>
          <p className="text-xs text-muted-foreground/60">
            Create your first project to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {project.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {sourceLabels[project.sourceType]}
                </span>
                <span className="text-xs text-muted-foreground/40">·</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(project.createdAt)}
                </span>
              </div>
            </div>
            <Badge
              variant={project.status === "completed" ? "default" : project.status === "processing" ? "secondary" : "destructive"}
              className="ml-3 text-[10px] shrink-0"
            >
              {project.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

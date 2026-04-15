"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const sourceConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  youtube: {
    label: "YouTube",
    color:
      "bg-red-500/10 text-red-400 border-red-500/20",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  upload: {
    label: "Upload",
    color:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: (
      <svg
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
    ),
  },
  text: {
    label: "Text",
    color:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: (
      <svg
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
};

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
  failed: { label: "Failed", variant: "destructive" },
};

export function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <Card className="border-border/50 border-dashed">
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-primary/40"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold mb-1">
            Create your first project
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            Paste a YouTube URL, upload a file, or drop in some text. Nashr will
            generate LinkedIn posts, X threads, blog drafts, and more.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              document
                .querySelector('[data-slot="tabs"]')
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            <svg
              className="h-3.5 w-3.5 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            Go to input above
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recent Projects</CardTitle>
          <span className="text-xs text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {projects.map((project) => {
          const source = sourceConfig[project.sourceType] ?? sourceConfig.text;
          const status = statusConfig[project.status] ?? statusConfig.draft;
          const wasUpdated =
            project.updatedAt !== project.createdAt &&
            new Date(project.updatedAt).getTime() -
              new Date(project.createdAt).getTime() >
              5000;

          return (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="flex items-center gap-3 p-3 -mx-1 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {project.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${source.color}`}
                  >
                    {source.icon}
                    {source.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground/50">
                    &middot;
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {timeAgo(project.createdAt)}
                  </span>
                  {wasUpdated && (
                    <>
                      <span className="text-[10px] text-muted-foreground/50">
                        &middot;
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        updated {timeAgo(project.updatedAt)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <Badge variant={status.variant} className="text-[10px] shrink-0">
                {status.label}
              </Badge>
              <svg
                className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

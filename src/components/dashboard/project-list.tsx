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
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  upload: {
    label: "Upload",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
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
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    dot: string;
  }
> = {
  completed: {
    label: "Completed",
    variant: "default",
    dot: "bg-emerald-400",
  },
  processing: {
    label: "Processing",
    variant: "secondary",
    dot: "bg-amber-400 animate-pulse",
  },
  draft: { label: "Draft", variant: "outline", dot: "bg-zinc-400" },
  failed: { label: "Failed", variant: "destructive", dot: "bg-red-400" },
};

export function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <Card className="border-border/50 border-dashed overflow-hidden">
        <CardContent className="relative py-20 text-center">
          {/* Gradient background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.145_70/0.06)_0%,transparent_70%)]" />

          <div className="relative">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10">
              <svg
                className="h-10 w-10 text-primary/60"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold mb-2">
              Create your first project
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Paste a YouTube URL, upload a file, or drop in some text. Nashr
              will generate LinkedIn posts, X threads, blog drafts, and more
              -- all in seconds.
            </p>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30"
              onClick={() =>
                document
                  .querySelector('[data-slot="tabs"]')
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              <svg
                className="h-4 w-4"
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
              Get started above
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Projects
          </CardTitle>
          <span className="text-xs text-muted-foreground tabular-nums">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border/50">
          {projects.map((project) => {
            const source =
              sourceConfig[project.sourceType] ?? sourceConfig.text;
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
                className="flex items-center gap-4 py-3.5 px-2 -mx-2 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
              >
                {/* Source type icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${source.color} transition-transform duration-200 group-hover:scale-105`}
                >
                  <span className="scale-125">{source.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${source.color}`}
                    >
                      {source.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">
                      &middot;
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {timeAgo(project.createdAt)}
                    </span>
                    {wasUpdated && (
                      <>
                        <span className="text-[10px] text-muted-foreground/40">
                          &middot;
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          updated {timeAgo(project.updatedAt)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status badge */}
                <Badge
                  variant={status.variant}
                  className="text-[10px] shrink-0 gap-1.5"
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`}
                  />
                  {status.label}
                </Badge>

                {/* Chevron */}
                <svg
                  className="h-4 w-4 text-muted-foreground/20 group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
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
        </div>
      </CardContent>
    </Card>
  );
}

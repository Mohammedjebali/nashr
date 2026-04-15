import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentWorkspace } from "@/components/project/content-workspace";
import { ProjectActions } from "@/components/project/project-actions";
import { getProjectResult } from "@/lib/services/projects";
import { getUser } from "@/lib/supabase/server";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser();
  if (!user) redirect("/login");
  const result = await getProjectResult(id, user.id);

  if (!result) {
    notFound();
  }

  const statusVariant =
    result.project.status === "completed"
      ? "default"
      : result.project.status === "failed"
        ? "destructive"
        : ("secondary" as const);

  const isReady = result.project.status === "completed";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </Button>
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-[10px]">
                  N
                </span>
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:inline">
                Nashr
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant} className="text-[10px]">
              {result.project.status}
            </Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {result.project.sourceType === "youtube"
                ? "YouTube"
                : result.project.sourceType === "upload"
                  ? "Upload"
                  : "Text"}
            </span>
            {isReady && <ProjectActions projectId={id} />}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
            {result.project.title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {isReady
                ? "Generated content from your source material"
                : result.project.status === "processing"
                  ? "Your content is being generated..."
                  : result.project.status === "failed"
                    ? "Content generation encountered an error"
                    : "Project created — content generation pending"}
            </p>
            {isReady && result.generatedBy && (
              <Badge
                variant="outline"
                className="text-[10px] font-normal"
              >
                {result.generatedBy === "llm" ? "AI generated" : "Auto generated"}
              </Badge>
            )}
          </div>
        </div>

        {!isReady && (
          <div className="rounded-lg border border-border/50 p-12 text-center">
            {result.project.status === "processing" ? (
              <>
                <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">
                  Processing your content. This page will show results once
                  generation completes.
                </p>
              </>
            ) : result.project.status === "failed" ? (
              <>
                <svg
                  className="h-8 w-8 mx-auto mb-4 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <p className="text-sm text-muted-foreground">
                  Something went wrong during generation. Please try creating a
                  new project.
                </p>
              </>
            ) : (
              <>
                <svg
                  className="h-8 w-8 mx-auto mb-4 text-muted-foreground/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <p className="text-sm text-muted-foreground">
                  This project is in draft state. Content will appear once
                  processing begins.
                </p>
              </>
            )}
          </div>
        )}

        {isReady && <ContentWorkspace result={result} />}
      </main>
    </div>
  );
}

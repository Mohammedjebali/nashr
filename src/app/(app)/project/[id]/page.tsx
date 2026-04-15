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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with gradient border */}
      <header className="bg-background/80 backdrop-blur-xl sticky top-0 z-50 border-b border-transparent" style={{ borderImage: "linear-gradient(to right, transparent, oklch(0.78 0.145 70 / 0.3), transparent) 1" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-primary/10">
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
            <div className="h-4 w-px bg-border/50" />
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                <span className="text-primary-foreground font-bold text-xs">
                  N
                </span>
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:inline text-foreground/90">
                Nashr
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant} className="text-[10px] uppercase tracking-wider">
              {result.project.status}
            </Badge>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              {result.project.sourceType === "youtube" ? (
                <svg className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              ) : result.project.sourceType === "upload" ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              )}
              <span>
                {result.project.sourceType === "youtube"
                  ? "YouTube"
                  : result.project.sourceType === "upload"
                    ? "Upload"
                    : "Text"}
              </span>
            </div>
            {isReady && <ProjectActions projectId={id} />}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Project title and metadata */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 text-foreground">
            {result.project.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
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
                className={
                  result.generatedBy === "llm"
                    ? "text-[10px] font-medium border-primary/30 bg-primary/5 text-primary gap-1"
                    : "text-[10px] font-medium border-border bg-secondary/50 text-muted-foreground gap-1"
                }
              >
                {result.generatedBy === "llm" ? (
                  <>
                    {/* Sparkle icon */}
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
                    </svg>
                    AI generated
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m-2.01 17.334-.364-1.43M13.303 3.08l-.364-1.43" />
                    </svg>
                    Auto generated
                  </>
                )}
              </Badge>
            )}
          </div>
        </div>

        {/* Non-ready states */}
        {!isReady && (
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            {result.project.status === "processing" ? (
              <div className="p-12 sm:p-16">
                {/* Animated processing indicator */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <svg className="h-7 w-7 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                      </svg>
                    </div>
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-ping" style={{ animationDuration: "2s" }} />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-center mb-2">
                  Generating your content
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-10 max-w-md mx-auto">
                  We are analyzing your source material and creating optimized content for multiple platforms.
                </p>

                {/* Multi-step progress indicator */}
                <div className="max-w-lg mx-auto">
                  <div className="flex items-center justify-between relative">
                    {/* Connecting line background */}
                    <div className="absolute top-4 left-8 right-8 h-px bg-border/50" />
                    {/* Animated progress line */}
                    <div className="absolute top-4 left-8 h-px bg-gradient-to-r from-primary to-primary/50 animate-pulse" style={{ width: "40%", animationDuration: "1.5s" }} />

                    {[
                      { label: "Transcribing", icon: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z", active: true },
                      { label: "Extracting", icon: "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776", active: false },
                      { label: "Generating", icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z", active: false },
                      { label: "Finalizing", icon: "m4.5 12.75 6 6 9-13.5", active: false },
                    ].map((step, i) => (
                      <div key={step.label} className="flex flex-col items-center gap-2 relative z-10">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                          step.active
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                            : "bg-muted/80 text-muted-foreground/50"
                        }`}>
                          {step.active ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          ) : (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[11px] font-medium ${step.active ? "text-primary" : "text-muted-foreground/50"}`}>
                          {step.label}
                        </span>
                        {i < 3 && step.active && (
                          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : result.project.status === "failed" ? (
              <div className="p-12 sm:p-16 text-center">
                {/* Failed state with polished design */}
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <svg
                      className="h-7 w-7 text-destructive"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Generation failed
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Something went wrong while generating your content. This can happen with certain source formats. You can retry the generation or create a new project.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link href={`/project/${id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                      </svg>
                      Retry
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="sm" className="gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      New project
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-12 sm:p-16 text-center">
                {/* Draft state with polished design */}
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <svg
                      className="h-7 w-7 text-muted-foreground/40"
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
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Draft project
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  This project is in draft state. Content will appear here once processing begins.
                </p>
              </div>
            )}
          </div>
        )}

        {isReady && <ContentWorkspace result={result} />}
      </main>
    </div>
  );
}

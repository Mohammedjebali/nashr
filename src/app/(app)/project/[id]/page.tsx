import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TranscriptPanel } from "@/components/project/transcript-panel";
import { HighlightCards } from "@/components/project/highlight-cards";
import { LinkedInPost } from "@/components/project/linkedin-post";
import { XThread } from "@/components/project/x-thread";
import { BlogDraft } from "@/components/project/blog-draft";
import { HooksHashtags } from "@/components/project/hooks-hashtags";
import { getMockProjectResult } from "@/lib/mock-data";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getMockProjectResult(id);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </Button>
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-[10px]">N</span>
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:inline">Nashr</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="default" className="text-[10px]">
              {result.project.status}
            </Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {result.project.sourceType === "youtube" ? "YouTube" : result.project.sourceType === "upload" ? "Upload" : "Text"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
            {result.project.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Generated content from your source material
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TranscriptPanel segments={result.transcript} />
            <HighlightCards highlights={result.highlights} />
          </div>

          <div className="space-y-6">
            <LinkedInPost content={result.content.linkedinPost} />
            <XThread tweets={result.content.xThread} />
            <HooksHashtags
              hooks={result.content.hooks}
              hashtags={result.content.hashtags}
              captions={result.content.captions}
            />
            <BlogDraft
              outline={result.content.blogOutline}
              draft={result.content.blogDraft}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

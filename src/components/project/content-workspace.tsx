"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LinkedInPost } from "./linkedin-post";
import { XThread } from "./x-thread";
import { BlogDraft } from "./blog-draft";
import { HooksHashtags } from "./hooks-hashtags";
import { TranscriptPanel } from "./transcript-panel";
import { HighlightCards } from "./highlight-cards";
import type { ProjectResult } from "@/types";

export function ContentWorkspace({ result }: { result: ProjectResult }) {
  const [downloadingAll, setDownloadingAll] = useState(false);

  // Count items per tab
  const socialCount = 1 + (result.content.xThread?.length > 0 ? 1 : 0); // LinkedIn + X Thread
  const blogCount = result.content.blogOutline?.length || 0;
  const shortformCount =
    (result.content.hooks?.length || 0) +
    (result.content.hashtags?.length || 0) +
    (result.content.captions?.length || 0);
  const sourceCount =
    (result.transcript?.length > 0 ? 1 : 0) +
    (result.highlights?.length || 0);

  function handleDownloadAll() {
    setDownloadingAll(true);

    const sections: string[] = [];

    // LinkedIn Post
    if (result.content.linkedinPost) {
      sections.push("=== LINKEDIN POST ===\n\n" + result.content.linkedinPost);
    }

    // X Thread
    if (result.content.xThread?.length) {
      sections.push(
        "=== X THREAD ===\n\n" +
          result.content.xThread
            .map((t, i) => `[Tweet ${i + 1}]\n${t}`)
            .join("\n\n")
      );
    }

    // Blog
    if (result.content.blogDraft) {
      sections.push("=== BLOG DRAFT ===\n\n" + result.content.blogDraft);
    }
    if (result.content.blogOutline?.length) {
      sections.push(
        "=== BLOG OUTLINE ===\n\n" +
          result.content.blogOutline
            .map(
              (s) =>
                `## ${s.heading}\n${s.points.map((p) => `- ${p}`).join("\n")}`
            )
            .join("\n\n")
      );
    }

    // Hooks
    if (result.content.hooks?.length) {
      sections.push(
        "=== HOOKS ===\n\n" +
          result.content.hooks.map((h, i) => `${i + 1}. ${h}`).join("\n")
      );
    }

    // Hashtags
    if (result.content.hashtags?.length) {
      sections.push(
        "=== HASHTAGS ===\n\n" + result.content.hashtags.join(" ")
      );
    }

    // Captions
    if (result.content.captions?.length) {
      sections.push(
        "=== CAPTIONS ===\n\n" +
          result.content.captions.map((c, i) => `${i + 1}. ${c}`).join("\n\n")
      );
    }

    const blob = new Blob([sections.join("\n\n\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nashr-content-export.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingAll(false), 1500);
  }

  return (
    <div className="space-y-6">
      {/* Download All bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Content workspace
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadAll}
          disabled={downloadingAll}
          className="gap-2 text-xs h-8 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
        >
          {downloadingAll ? (
            <>
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Downloaded
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download All
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="social">
        <TabsList className="mb-6 bg-muted/50 p-1 rounded-xl h-auto gap-0.5">
          <TabsTrigger value="social" className="rounded-lg px-4 py-2 gap-2 text-xs sm:text-sm">
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            Social
            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
              {socialCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="rounded-lg px-4 py-2 gap-2 text-xs sm:text-sm">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Blog
            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
              {blogCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="shortform" className="rounded-lg px-4 py-2 gap-2 text-xs sm:text-sm">
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
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.6 19.5m-2.4-19.5-3.6 19.5"
              />
            </svg>
            Short-form
            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
              {shortformCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="source" className="rounded-lg px-4 py-2 gap-2 text-xs sm:text-sm">
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
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
            Source
            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
              {sourceCount}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="animate-in fade-in-0 duration-300">
          <div className="space-y-6">
            <LinkedInPost content={result.content.linkedinPost} />
            <XThread tweets={result.content.xThread} />
          </div>
        </TabsContent>

        <TabsContent value="blog" className="animate-in fade-in-0 duration-300">
          <BlogDraft
            outline={result.content.blogOutline}
            draft={result.content.blogDraft}
          />
        </TabsContent>

        <TabsContent value="shortform" className="animate-in fade-in-0 duration-300">
          <HooksHashtags
            hooks={result.content.hooks}
            hashtags={result.content.hashtags}
            captions={result.content.captions}
          />
        </TabsContent>

        <TabsContent value="source" className="animate-in fade-in-0 duration-300">
          <div className="space-y-6">
            <TranscriptPanel segments={result.transcript} />
            <HighlightCards highlights={result.highlights} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

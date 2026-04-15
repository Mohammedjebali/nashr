"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";
import type { BlogSection } from "@/types";

export function BlogDraft({
  outline,
  draft,
}: {
  outline: BlogSection[];
  draft: string;
}) {
  const [view, setView] = useState<"outline" | "draft">("draft");
  const wordCount = draft ? draft.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <Card className="border-border/50 overflow-hidden relative">
      {/* Blog accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div>
              <span className="text-foreground">Blog Draft</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-muted-foreground font-normal">
                  {wordCount.toLocaleString()} words
                </span>
                <span className="text-[10px] text-muted-foreground/40">|</span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  ~{readingTime} min read
                </span>
              </div>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center bg-muted/50 rounded-lg p-0.5">
              <Button
                variant={view === "outline" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2.5 text-[10px] rounded-md"
                onClick={() => setView("outline")}
              >
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Outline
              </Button>
              <Button
                variant={view === "draft" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 px-2.5 text-[10px] rounded-md"
                onClick={() => setView("draft")}
              >
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
                Full Draft
              </Button>
            </div>
            <CopyButton text={view === "draft" ? draft : outline.map(s => `## ${s.heading}\n${s.points.map(p => `- ${p}`).join("\n")}`).join("\n\n")} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "outline" ? (
          <div className="space-y-3 animate-in fade-in-0 duration-200">
            {outline.map((section, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-border/50 bg-accent/10 hover:bg-accent/20 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-mono text-primary/60 bg-primary/5 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-2">{section.heading}</p>
                    <ul className="space-y-1">
                      {section.points.map((point, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex gap-2 leading-relaxed">
                          <span className="text-primary/40 shrink-0 mt-0.5">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in-0 duration-200">
            <div className="rounded-lg border border-border/50 bg-accent/10 p-5 max-h-[600px] overflow-y-auto">
              <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed !bg-transparent !p-0 !border-0">
                  {draft}
                </pre>
              </article>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

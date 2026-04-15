"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "./copy-button";

export function HooksHashtags({
  hooks,
  hashtags,
  captions,
}: {
  hooks: string[];
  hashtags: string[];
  captions: string[];
}) {
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  function handleTagCopy(tag: string) {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  }

  return (
    <div className="space-y-6">
      {/* Attention Hooks */}
      <Card className="border-border/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber via-amber/60 to-amber/20" />
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-amber/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <div>
                <span className="text-foreground">Attention Hooks</span>
                <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                  {hooks.length} hooks to grab attention
                </span>
              </div>
            </CardTitle>
            <CopyButton text={hooks.join("\n")} label="Copy all" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {hooks.map((hook, i) => (
              <div
                key={i}
                className="group relative p-4 rounded-lg border border-border/50 bg-accent/10 hover:bg-accent/20 hover:border-primary/20 transition-all"
              >
                {/* Quote decoration */}
                <svg className="absolute top-3 left-3 h-5 w-5 text-primary/10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex items-start gap-3 pl-4">
                  <span className="text-[10px] font-mono text-primary/50 bg-primary/5 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-foreground/90 flex-1 italic leading-relaxed">
                    {hook}
                  </p>
                </div>
                {/* Per-hook copy */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={hook} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hashtags */}
      <Card className="border-border/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.6 19.5m-2.4-19.5-3.6 19.5" />
                </svg>
              </div>
              <div>
                <span className="text-foreground">Hashtags</span>
                <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                  {hashtags.length} tags — click to copy individually
                </span>
              </div>
            </CardTitle>
            <CopyButton text={hashtags.join(" ")} label="Copy all" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagCopy(tag)}
                className="group relative"
              >
                <Badge
                  variant="secondary"
                  className={`text-xs cursor-pointer transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/20 ${
                    copiedTag === tag ? "bg-primary/20 text-primary border-primary/30" : ""
                  }`}
                >
                  {copiedTag === tag ? (
                    <>
                      <svg className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Copied
                    </>
                  ) : (
                    tag
                  )}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Captions */}
      <Card className="border-border/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/15 to-transparent" />
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <div>
                <span className="text-foreground">Captions</span>
                <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                  {captions.length} ready-to-use captions
                </span>
              </div>
            </CardTitle>
            <CopyButton text={captions.join("\n\n")} label="Copy all" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {captions.map((caption, i) => (
              <div
                key={i}
                className="group relative p-4 rounded-lg border border-border/50 bg-accent/10 hover:bg-accent/20 hover:border-border transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted/30 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-foreground/90 flex-1 leading-relaxed">
                    {caption}
                  </p>
                </div>
                {/* Per-caption copy */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={caption} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

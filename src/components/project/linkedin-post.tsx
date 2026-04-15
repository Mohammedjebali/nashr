"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./copy-button";

export function LinkedInPost({ content }: { content: string }) {
  const charCount = content?.length || 0;
  const maxChars = 3000;
  const charPercent = Math.min((charCount / maxChars) * 100, 100);

  return (
    <Card className="border-border/50 overflow-hidden relative group">
      {/* LinkedIn brand accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0077B5] via-[#0077B5] to-[#0077B5]/50" />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2.5">
            {/* LinkedIn icon */}
            <div className="h-7 w-7 rounded-lg bg-[#0077B5]/10 flex items-center justify-center">
              <svg className="h-4 w-4 text-[#0077B5]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <span className="text-foreground">LinkedIn Post</span>
              <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                Professional format
              </span>
            </div>
          </CardTitle>
          <CopyButton text={content} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border border-border/50 bg-accent/10 p-5 hover:bg-accent/20 transition-colors">
          <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
            {content}
          </pre>
        </div>

        {/* Character count indicator */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  charPercent > 90 ? "bg-destructive" : charPercent > 70 ? "bg-amber" : "bg-primary/60"
                }`}
                style={{ width: `${charPercent}%` }}
              />
            </div>
            <span className={`text-[10px] font-mono ${charPercent > 90 ? "text-destructive" : "text-muted-foreground"}`}>
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            characters
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

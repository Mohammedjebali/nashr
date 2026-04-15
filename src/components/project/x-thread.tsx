"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "./copy-button";

export function XThread({ tweets }: { tweets: string[] }) {
  const fullThread = tweets.join("\n\n---\n\n");
  const maxTweetChars = 280;

  return (
    <Card className="border-border/50 overflow-hidden relative">
      {/* X brand accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/20" />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-foreground/10 flex items-center justify-center">
              <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground">X Thread</span>
              <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0 h-4">
                {tweets.length} tweets
              </Badge>
            </div>
          </CardTitle>
          <CopyButton text={fullThread} label="Copy all" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {tweets.map((tweet, i) => {
            const tweetLength = tweet.length;
            const isOver = tweetLength > maxTweetChars;

            return (
              <div key={i} className="flex gap-3 group">
                {/* Thread line visualization */}
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                    i === 0
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-muted/30 group-hover:border-primary/50"
                  }`}>
                    <span className={`text-[10px] font-mono font-bold ${
                      i === 0 ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    }`}>
                      {i + 1}
                    </span>
                  </div>
                  {/* Connecting thread line */}
                  {i < tweets.length - 1 && (
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-border/50 to-border/20 my-1" />
                  )}
                </div>

                {/* Tweet content */}
                <div className="flex-1 pb-4 min-w-0">
                  <div className="rounded-lg border border-border/50 bg-accent/10 p-4 hover:bg-accent/20 transition-colors relative group/tweet">
                    <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed pr-8">
                      {tweet}
                    </pre>
                    {/* Per-tweet copy button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover/tweet:opacity-100 transition-opacity">
                      <CopyButton text={tweet} label="Copy" />
                    </div>
                  </div>
                  {/* Per-tweet character count */}
                  <div className="flex items-center justify-end mt-1.5 px-1 gap-2">
                    <span className={`text-[10px] font-mono ${isOver ? "text-destructive" : "text-muted-foreground/60"}`}>
                      {tweetLength}/{maxTweetChars}
                    </span>
                    {isOver && (
                      <span className="text-[10px] text-destructive font-medium">
                        over limit
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

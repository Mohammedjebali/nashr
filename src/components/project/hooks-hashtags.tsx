"use client";

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
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.6 19.5m-2.4-19.5-3.6 19.5" />
          </svg>
          Hooks, Hashtags & Captions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Attention Hooks
            </h4>
            <CopyButton text={hooks.join("\n")} label="Copy all" />
          </div>
          <div className="space-y-2">
            {hooks.map((hook, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-2.5 rounded-lg border border-border/50 bg-accent/10 group"
              >
                <span className="text-[10px] font-mono text-primary/60 pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-foreground/90 flex-1">{hook}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Hashtags
            </h4>
            <CopyButton text={hashtags.join(" ")} label="Copy all" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Captions
            </h4>
            <CopyButton text={captions.join("\n\n")} label="Copy all" />
          </div>
          <div className="space-y-2">
            {captions.map((caption, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg border border-border/50 bg-accent/10"
              >
                <p className="text-sm text-foreground/90">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

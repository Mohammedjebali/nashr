import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Highlight } from "@/types";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function HighlightCards({ highlights }: { highlights: Highlight[] }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
          Highlights & Clip Ideas
          <Badge variant="secondary" className="text-[10px] ml-auto">
            {highlights.length} found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="p-3 rounded-lg border border-border/50 bg-accent/20 hover:bg-accent/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="text-sm font-medium">{highlight.title}</h4>
              <span className="text-[10px] font-mono text-primary shrink-0">
                {formatTime(highlight.startTime)} - {formatTime(highlight.endTime)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {highlight.summary}
            </p>
            <div className="flex flex-wrap gap-1">
              {highlight.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

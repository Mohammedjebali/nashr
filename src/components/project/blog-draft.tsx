import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./copy-button";
import type { BlogSection } from "@/types";

export function BlogDraft({
  outline,
  draft,
}: {
  outline: BlogSection[];
  draft: string;
}) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Blog Draft
          </CardTitle>
          <CopyButton text={draft} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Outline
          </h4>
          <div className="space-y-3">
            {outline.map((section, i) => (
              <div key={i} className="p-3 rounded-lg border border-border/50 bg-accent/10">
                <p className="text-sm font-medium mb-1">{section.heading}</p>
                <ul className="space-y-0.5">
                  {section.points.map((point, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-primary/60 shrink-0">-</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Full Draft
          </h4>
          <div className="rounded-lg border border-border/50 bg-accent/10 p-4 max-h-[500px] overflow-y-auto">
            <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
              {draft}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

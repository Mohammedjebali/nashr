import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./copy-button";

export function XThread({ tweets }: { tweets: string[] }) {
  const fullThread = tweets.join("\n\n---\n\n");

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X Thread
            <span className="text-[10px] text-muted-foreground font-normal">
              {tweets.length} tweets
            </span>
          </CardTitle>
          <CopyButton text={fullThread} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tweets.map((tweet, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] text-primary font-mono font-bold">{i + 1}</span>
              </div>
              {i < tweets.length - 1 && <div className="w-px flex-1 bg-border/50 mt-1" />}
            </div>
            <div className="pb-3 flex-1">
              <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
                {tweet}
              </pre>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

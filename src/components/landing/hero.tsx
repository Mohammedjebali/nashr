import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.08,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8">
            Built for MENA Creators
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            One piece of content.
            <br />
            <span className="text-primary">Ten formats. Zero effort.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Upload a video, paste a YouTube link, or drop in your text.
            Nashr extracts highlights, generates LinkedIn posts, X threads,
            blog drafts, and more — optimized for Arabic, French, and English audiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className={buttonVariants({ size: "lg", className: "text-base px-8 h-12" })}>
              Start Repurposing Free
            </Link>
            <Link href="#how-it-works" className={buttonVariants({ variant: "outline", size: "lg", className: "text-base px-8 h-12" })}>
              See How It Works
            </Link>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/50 p-1 shadow-2xl shadow-primary/5">
            <div className="rounded-lg bg-card border border-border/30 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-amber/60" />
                <div className="h-3 w-3 rounded-full bg-chart-2/60" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-20 rounded bg-muted animate-pulse" />
                  <div className="h-8 flex-1 rounded bg-muted/50 border border-border/50 flex items-center px-3">
                    <span className="text-xs text-muted-foreground font-mono">
                      https://youtube.com/watch?v=your-content
                    </span>
                  </div>
                  <div className="h-8 w-24 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">Generate</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {["LinkedIn Post", "X Thread", "Blog Draft"].map((label) => (
                    <div key={label} className="h-16 rounded bg-muted/30 border border-border/30 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

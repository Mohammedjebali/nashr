import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-primary/20 bg-primary/5 p-12 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.06,transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Stop creating from scratch.
              <br />
              Start repurposing.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join creators and agencies across Tunisia, Morocco, Egypt, and
              the Gulf who are multiplying their content output with Nashr.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className={buttonVariants({ size: "lg", className: "text-base px-8 h-12" })}>
                Get Started Free
              </Link>
              <p className="text-xs text-muted-foreground">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTA() {
  return (
    <>
      <style>{`
        @keyframes ctaGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes ctaGlow2 {
          0%, 100% { opacity: 0.3; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        .cta-glow-1 {
          position: absolute;
          top: -20%;
          left: 30%;
          width: 40%;
          height: 80%;
          border-radius: 50%;
          background: radial-gradient(ellipse, oklch(0.78 0.145 70 / 0.15), transparent 70%);
          animation: ctaGlow 6s ease-in-out infinite;
          pointer-events: none;
        }
        .cta-glow-2 {
          position: absolute;
          bottom: -10%;
          right: 20%;
          width: 35%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(ellipse, oklch(0.65 0.13 55 / 0.1), transparent 70%);
          animation: ctaGlow2 8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes borderShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cta-border-shimmer {
          position: relative;
        }
        .cta-border-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            90deg,
            oklch(0.78 0.145 70 / 0.1),
            oklch(0.78 0.145 70 / 0.4),
            oklch(0.78 0.145 70 / 0.1),
            oklch(0.78 0.145 70 / 0.4),
            oklch(0.78 0.145 70 / 0.1)
          );
          background-size: 300% 100%;
          animation: borderShimmer 6s linear infinite;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(5px); opacity: 0.6; }
          50% { transform: translateY(-35px) translateX(-3px); opacity: 0.4; }
          75% { transform: translateY(-15px) translateX(8px); opacity: 0.5; }
        }
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: oklch(0.78 0.145 70 / 0.5);
          animation: particleFloat 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 0 20px oklch(0.78 0.145 70 / 0.2), 0 0 40px oklch(0.78 0.145 70 / 0.1); }
          50% { box-shadow: 0 0 30px oklch(0.78 0.145 70 / 0.35), 0 0 60px oklch(0.78 0.145 70 / 0.15); }
        }
        .cta-button-glow {
          animation: buttonGlow 3s ease-in-out infinite;
        }
      `}</style>
      <section className="py-28 relative">
        {/* Subtle top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-border-shimmer relative rounded-3xl bg-gradient-to-b from-primary/[0.06] to-primary/[0.02] p-12 sm:p-16 lg:p-20 text-center overflow-hidden">
            {/* Animated glows */}
            <div className="cta-glow-1" />
            <div className="cta-glow-2" />

            {/* Floating particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${8 + (i * 7.5)}%`,
                  top: `${20 + Math.sin(i * 1.3) * 40}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                  width: `${1.5 + (i % 3)}px`,
                  height: `${1.5 + (i % 3)}px`,
                }}
              />
            ))}

            <div className="relative z-10">
              {/* Social proof */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="flex -space-x-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"
                    >
                      <span className="text-[9px] font-bold text-primary/70">
                        {["A", "M", "S", "K"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  Join <span className="text-foreground">500+</span> MENA creators
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                Stop creating from scratch.
                <br />
                <span className="text-primary">Start repurposing.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Join creators and agencies across Tunisia, Morocco, Egypt, and
                the Gulf who are multiplying their content output with Nashr.
              </p>

              <div className="flex flex-col items-center gap-5">
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "lg",
                    className: "cta-button-glow text-base px-10 h-13 font-semibold",
                  })}
                >
                  Get Started Free
                  <svg className="h-4 w-4 ml-1.5 transition-transform group-hover/button:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-primary/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

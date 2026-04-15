"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const floatingBadges = [
  { label: "LinkedIn Post", x: "-8%", y: "18%", delay: "0s" },
  { label: "X Thread", x: "92%", y: "12%", delay: "0.5s" },
  { label: "Blog Draft", x: "-6%", y: "68%", delay: "1s" },
  { label: "Newsletter", x: "88%", y: "72%", delay: "1.5s" },
  { label: "Hooks", x: "85%", y: "42%", delay: "2s" },
];

const typingWords = [
  "Analyzing content...",
  "Extracting highlights...",
  "Generating formats...",
];

export function Hero() {
  return (
    <>
      <style>{`
        @keyframes heroGlow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes heroGlow2 {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
          50% { opacity: 0.45; transform: translate(-50%, -50%) scale(0.9); }
        }
        .hero-glow-1 {
          position: absolute;
          top: 20%;
          left: 50%;
          width: 800px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, oklch(0.78 0.145 70 / 0.12), transparent 70%);
          animation: heroGlow 8s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          top: 40%;
          left: 40%;
          width: 600px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, oklch(0.78 0.145 70 / 0.08), transparent 70%);
          animation: heroGlow2 6s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%);
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .floating-badge {
          animation: floatBadge 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .mockup-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            oklch(0.78 0.145 70 / 0.06) 25%,
            oklch(0.78 0.145 70 / 0.12) 50%,
            oklch(0.78 0.145 70 / 0.06) 75%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes typewriter {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes typeLine1 {
          0%, 100% { width: 0; opacity: 0; }
          5% { opacity: 1; width: 0; }
          25% { width: 100%; opacity: 1; }
          33% { width: 100%; opacity: 1; }
          35% { opacity: 0; }
        }
        @keyframes typeLine2 {
          0%, 33% { width: 0; opacity: 0; }
          38% { opacity: 1; width: 0; }
          58% { width: 100%; opacity: 1; }
          66% { width: 100%; opacity: 1; }
          68% { opacity: 0; }
        }
        @keyframes typeLine3 {
          0%, 66% { width: 0; opacity: 0; }
          71% { opacity: 1; width: 0; }
          91% { width: 100%; opacity: 1; }
          98% { width: 100%; opacity: 1; }
          100% { opacity: 0; }
        }
        .type-line-1 { animation: typeLine1 9s ease-in-out infinite; }
        .type-line-2 { animation: typeLine2 9s ease-in-out infinite; }
        .type-line-3 { animation: typeLine3 9s ease-in-out infinite; }
        @keyframes cardReveal {
          0%, 70% { opacity: 0; transform: translateY(6px) scale(0.97); }
          80%, 100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-reveal { animation: cardReveal 9s ease-in-out infinite; }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.78 0.145 70 / 0.15); }
          50% { box-shadow: 0 0 20px 4px oklch(0.78 0.145 70 / 0.1); }
        }
        .mockup-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in { animation: fadeInUp 0.8s ease-out both; }
        .hero-fade-in-delay-1 { animation: fadeInUp 0.8s ease-out 0.15s both; }
        .hero-fade-in-delay-2 { animation: fadeInUp 0.8s ease-out 0.3s both; }
        .hero-fade-in-delay-3 { animation: fadeInUp 0.8s ease-out 0.45s both; }
        .hero-fade-in-delay-4 { animation: fadeInUp 0.8s ease-out 0.6s both; }
      `}</style>
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background layers */}
        <div className="hero-grid" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="hero-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary text-xs font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Built for MENA Creators
            </div>

            {/* Headline */}
            <h1 className="hero-fade-in-delay-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              One piece of content.
              <br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
                Ten formats. Zero effort.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="hero-fade-in-delay-2 text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Upload a video, paste a YouTube link, or drop in your text.
              Nashr extracts highlights, generates LinkedIn posts, X threads,
              blog drafts, and more — optimized for Arabic, French, and English audiences.
            </p>

            {/* CTA Buttons */}
            <div className="hero-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link
                href="/register"
                className={buttonVariants({
                  size: "lg",
                  className: "text-base px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300",
                })}
              >
                Start Repurposing Free
              </Link>
              <Link
                href="#how-it-works"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "text-base px-8 h-12 border-border/60 hover:border-primary/30 group/demo",
                })}
              >
                <svg className="h-4 w-4 mr-1.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </Link>
            </div>

            {/* Mockup with floating badges */}
            <div className="hero-fade-in-delay-4 relative">
              {/* Floating badges */}
              {floatingBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="floating-badge hidden lg:flex absolute z-10 items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md shadow-lg shadow-primary/5 text-xs font-medium text-foreground/80"
                  style={{
                    left: badge.x,
                    top: badge.y,
                    animationDelay: badge.delay,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {badge.label}
                </div>
              ))}

              {/* Main mockup card */}
              <div className="mockup-glow rounded-2xl border border-border/50 bg-card/60 p-1.5 shadow-2xl shadow-primary/5 backdrop-blur-sm">
                <div className="mockup-shimmer rounded-xl" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none" }} />
                <div className="relative rounded-xl bg-card border border-border/30 p-6 sm:p-8">
                  {/* Window controls */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    <div className="ml-4 h-6 flex-1 max-w-xs rounded-md bg-muted/40 flex items-center px-3">
                      <span className="text-[10px] text-muted-foreground/60 font-mono">nashr.app</span>
                    </div>
                  </div>

                  {/* Input row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-9 w-20 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-xs text-primary font-semibold">URL</span>
                    </div>
                    <div className="h-9 flex-1 rounded-lg bg-muted/30 border border-border/40 flex items-center px-3 overflow-hidden">
                      <span className="text-xs text-muted-foreground/70 font-mono truncate">
                        https://youtube.com/watch?v=your-content
                      </span>
                    </div>
                    <div className="h-9 w-28 rounded-lg bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                      <span className="text-xs text-primary-foreground font-semibold">Generate</span>
                    </div>
                  </div>

                  {/* Typing status area */}
                  <div className="mb-5 h-8 flex items-center gap-2 px-1">
                    <div className="h-4 w-4 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                    <div className="relative overflow-hidden">
                      {typingWords.map((word, i) => (
                        <span
                          key={word}
                          className={`type-line-${i + 1} absolute left-0 top-0 text-xs text-primary/70 font-mono whitespace-nowrap overflow-hidden`}
                        >
                          {word}
                          <span className="typing-cursor text-primary">|</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Output cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "LinkedIn Post", icon: "in", lines: 4 },
                      { label: "X Thread", icon: "X", lines: 5 },
                      { label: "Blog Draft", icon: "B", lines: 3 },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className="card-reveal rounded-lg bg-muted/20 border border-border/30 p-3 hover:border-primary/20 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="h-5 w-5 rounded bg-primary/15 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-primary">{card.icon}</span>
                          </div>
                          <span className="text-[10px] font-medium text-foreground/70">{card.label}</span>
                        </div>
                        <div className="space-y-1.5">
                          {Array.from({ length: card.lines }).map((_, j) => (
                            <div
                              key={j}
                              className="h-1.5 rounded-full bg-muted/50"
                              style={{ width: `${70 + Math.sin(j * 2.1) * 25}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

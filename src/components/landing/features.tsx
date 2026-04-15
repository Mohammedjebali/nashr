"use client";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Smart Transcription",
    description:
      "Auto-transcribe videos and audio with support for Arabic, French, and English. Accurate timestamps and speaker detection.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    title: "Highlight Extraction",
    description:
      "AI identifies the most compelling moments, quotes, and insights from your content. Ready-to-use clip ideas with timestamps.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "LinkedIn Posts",
    description:
      "Generate professional, engagement-optimized LinkedIn posts from your content. Formatted for maximum reach in MENA markets.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    title: "X Threads",
    description:
      "Transform long-form content into compelling thread narratives. Optimized hooks, smooth transitions, and strong closers.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    title: "Blog Drafts",
    description:
      "Get structured outlines and full article drafts from any content piece. SEO-friendly and ready for your editorial voice.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Hooks & Hashtags",
    description:
      "AI-generated attention hooks, hashtag strategies, and captions tailored for MENA audiences across platforms.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.6 19.5m-2.4-19.5-3.6 19.5" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <>
      <style>{`
        @keyframes featureCardEntrance {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .feature-card {
          animation: featureCardEntrance 0.6s ease-out both;
        }
        .feature-card:nth-child(1) { animation-delay: 0s; }
        .feature-card:nth-child(2) { animation-delay: 0.08s; }
        .feature-card:nth-child(3) { animation-delay: 0.16s; }
        .feature-card:nth-child(4) { animation-delay: 0.24s; }
        .feature-card:nth-child(5) { animation-delay: 0.32s; }
        .feature-card:nth-child(6) { animation-delay: 0.4s; }
        .feature-icon-bg {
          background: linear-gradient(135deg, oklch(0.78 0.145 70 / 0.15), oklch(0.78 0.145 70 / 0.05));
        }
        .feature-card-inner {
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .feature-card-inner:hover {
          border-color: oklch(0.78 0.145 70 / 0.25);
          box-shadow: 0 0 0 1px oklch(0.78 0.145 70 / 0.08), 0 8px 32px oklch(0.78 0.145 70 / 0.06);
        }
        .feature-card-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(ellipse at 50% 0%, oklch(0.78 0.145 70 / 0.04), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .feature-card-inner:hover::before {
          opacity: 1;
        }
      `}</style>
      <section id="features" className="py-28 relative">
        {/* Subtle top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/15 bg-primary/5 text-primary text-[11px] font-semibold uppercase tracking-wider mb-6">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
              </svg>
              Powered by AI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
              Everything you need to
              <br className="hidden sm:block" />
              <span className="text-primary"> repurpose content</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From a single video or article, generate every format your
              audience consumes — across Arabic, French, and English.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <Card className="feature-card-inner bg-card/40 border-border/40 h-full">
                  <CardContent className="pt-6 pb-6">
                    <div className="feature-icon-bg h-12 w-12 rounded-xl flex items-center justify-center text-primary mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-[15px] mb-2.5 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload or paste",
      description:
        "Drop a YouTube URL, upload a video/audio file, or paste text directly. We handle Arabic, French, and English content.",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "AI processes your content",
      description:
        "Our AI transcribes, analyzes, and identifies the most compelling moments and insights from your content.",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Get every format",
      description:
        "Receive LinkedIn posts, X threads, blog drafts, hooks, hashtags, and highlight clips — all in seconds.",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes stepPulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.78 0.145 70 / 0.2); }
          50% { box-shadow: 0 0 0 12px oklch(0.78 0.145 70 / 0); }
        }
        .step-circle {
          animation: stepPulse 3s ease-in-out infinite;
        }
        .step-circle:nth-child(1) { animation-delay: 0s; }
        .step-circle:nth-child(2) { animation-delay: 1s; }
        .step-circle:nth-child(3) { animation-delay: 2s; }
        @keyframes lineFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .connecting-line {
          height: 2px;
          background: linear-gradient(
            90deg,
            oklch(0.78 0.145 70 / 0.05),
            oklch(0.78 0.145 70 / 0.4),
            oklch(0.78 0.145 70 / 0.05)
          );
          background-size: 200% 100%;
          animation: lineFlow 3s linear infinite;
        }
        .step-number-bg {
          background: linear-gradient(135deg, oklch(0.78 0.145 70), oklch(0.65 0.13 55));
        }
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .step-item {
          animation: stepFadeIn 0.6s ease-out both;
        }
        .step-item:nth-child(1) { animation-delay: 0s; }
        .step-item:nth-child(2) { animation-delay: 0.15s; }
        .step-item:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
      <section id="how-it-works" className="py-28 relative">
        {/* Subtle top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.03,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
              Three steps.{" "}
              <span className="text-primary">Every format.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From raw content to a full content calendar in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-0 relative">
            {/* Connecting lines (desktop) */}
            <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] z-0">
              <div className="grid grid-cols-2 gap-8">
                <div className="connecting-line rounded-full" />
                <div className="connecting-line rounded-full" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>

            {steps.map((step, i) => (
              <div key={step.number} className="step-item relative z-10 text-center px-4 md:px-8">
                {/* Step circle */}
                <div className="flex justify-center mb-8">
                  <div className="step-circle relative" style={{ animationDelay: `${i}s` }}>
                    {/* Outer ring */}
                    <div className="h-[4.25rem] w-[4.25rem] rounded-full border border-primary/15 bg-primary/5 flex items-center justify-center">
                      {/* Inner number circle */}
                      <div className="step-number-bg h-12 w-12 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-primary-foreground font-mono font-bold text-lg">{step.number}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-semibold text-lg mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload or paste",
      description:
        "Drop a YouTube URL, upload a video/audio file, or paste text directly. We handle Arabic, French, and English content.",
    },
    {
      number: "02",
      title: "AI processes your content",
      description:
        "Our AI transcribes, analyzes, and identifies the most compelling moments and insights from your content.",
    },
    {
      number: "03",
      title: "Get every format",
      description:
        "Receive LinkedIn posts, X threads, blog drafts, hooks, hashtags, and highlight clips — all in seconds.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Three steps. Every format.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From raw content to a full content calendar in under a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border/50" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border border-primary/20 bg-primary/5 mb-6">
                  <span className="text-primary font-mono font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

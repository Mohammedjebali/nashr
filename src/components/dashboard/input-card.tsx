"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createProjectAction } from "@/app/actions";

function extractYouTubeTitle(url: string): string {
  try {
    const u = new URL(url);
    let videoId = "";
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1).split("/")[0];
    } else {
      videoId = u.searchParams.get("v") ?? "";
    }
    return videoId ? `YouTube — ${videoId}` : "YouTube Import";
  } catch {
    return "YouTube Import";
  }
}

const processingStages = [
  { threshold: 0, label: "Initializing pipeline...", icon: "setup" },
  { threshold: 15, label: "Transcribing audio...", icon: "audio" },
  { threshold: 35, label: "Extracting key highlights...", icon: "extract" },
  { threshold: 55, label: "Generating content variants...", icon: "generate" },
  { threshold: 80, label: "Polishing outputs...", icon: "polish" },
  { threshold: 95, label: "Finalizing...", icon: "done" },
] as const;

function getProcessingStage(progress: number) {
  for (let i = processingStages.length - 1; i >= 0; i--) {
    if (progress >= processingStages[i].threshold) return processingStages[i];
  }
  return processingStages[0];
}

export function InputCard() {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function resetState() {
    setProgress(0);
    setError(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function handleProcess(sourceType: "youtube" | "upload" | "text") {
    resetState();

    const steps = [10, 25, 40, 55, 70, 85, 95, 100];
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 350);

    const title =
      sourceType === "youtube"
        ? extractYouTubeTitle(youtubeUrl)
        : sourceType === "text"
          ? pastedText.slice(0, 60).trim() || "Text Import"
          : "File Upload";

    startTransition(async () => {
      try {
        const result = await createProjectAction({
          title,
          sourceType,
          sourceUrl: sourceType === "youtube" ? youtubeUrl : undefined,
          rawText: sourceType === "text" ? pastedText : undefined,
        });
        if (result?.error) {
          resetState();
          setError(result.error);
        }
      } catch {
        resetState();
        setError("Something went wrong. Please try again.");
      }
    });
  }

  const processing = isPending && progress > 0;
  const stage = getProcessingStage(progress);

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <CardTitle className="text-lg">New Project</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {processing ? (
          <div className="py-10 space-y-6">
            {/* Spinner + Status */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center">
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                  style={{ animation: "spin-slow 3s linear infinite" }}
                />
                {/* Spinning arc */}
                <svg
                  className="absolute inset-0 h-16 w-16"
                  style={{ animation: "spin-slow 1.5s linear infinite" }}
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="60 140"
                    className="text-primary"
                  />
                </svg>
                {/* Center percentage */}
                <span className="text-sm font-bold tabular-nums text-primary">
                  {progress}%
                </span>
              </div>

              <div className="text-center space-y-1">
                <p className="text-sm font-semibold">{stage.label}</p>
                <p className="text-xs text-muted-foreground">
                  This usually takes a few seconds
                </p>
              </div>
            </div>

            {/* Progress bar with glow */}
            <div className="relative mx-auto max-w-md">
              <Progress
                value={progress}
                className="h-2 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-muted/60 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-primary [&_[data-slot=progress-indicator]]:to-amber-400 [&_[data-slot=progress-indicator]]:transition-all [&_[data-slot=progress-indicator]]:duration-500"
              />
              {/* Glow effect under the bar */}
              <div
                className="absolute -bottom-1 left-0 h-2 rounded-full bg-primary/30 blur-md transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-5">
              <TabsTrigger value="youtube" className="gap-2">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </TabsTrigger>
              <TabsTrigger value="text" className="gap-2">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value);
                    setError(null);
                  }}
                  className="h-11"
                />
                <p className="text-[11px] text-muted-foreground/60 pl-1">
                  Supports youtube.com and youtu.be links
                </p>
              </div>
              <Button
                onClick={() => handleProcess("youtube")}
                disabled={!youtubeUrl.trim()}
                className="w-full h-11 font-medium"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
                Generate Content
              </Button>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={() => setIsDragOver(false)}
                className={`relative overflow-hidden rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
                  isDragOver
                    ? "border-primary/50 bg-primary/[0.03] scale-[1.01]"
                    : "border-border/50 hover:border-primary/30 hover:bg-accent/30"
                }`}
                style={
                  isDragOver
                    ? { animation: "border-dance 1.5s ease-in-out infinite" }
                    : undefined
                }
              >
                {/* Subtle gradient background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.145_70/0.03)_0%,transparent_70%)]" />

                <div className="relative">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isDragOver
                        ? "bg-primary/15 text-primary scale-110"
                        : "bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {isDragOver
                      ? "Drop your file here"
                      : "Drop a video, audio, or text file"}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    MP4, MP3, WAV, TXT, PDF up to 500MB
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleProcess("upload")}
                className="w-full h-11 font-medium"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload & Generate
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Paste your content here... Articles, transcripts, notes, or any text you want to repurpose."
                  rows={6}
                  value={pastedText}
                  onChange={(e) => {
                    setPastedText(e.target.value);
                    setError(null);
                  }}
                  className="resize-none"
                />
                {pastedText.length > 0 && (
                  <p className="text-[11px] text-muted-foreground/60 pl-1 tabular-nums">
                    {pastedText.length.toLocaleString()} characters
                  </p>
                )}
              </div>
              <Button
                onClick={() => handleProcess("text")}
                disabled={!pastedText.trim()}
                className="w-full h-11 font-medium"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
                Generate Content
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

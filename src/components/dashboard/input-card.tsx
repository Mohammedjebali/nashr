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

export function InputCard() {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [pastedText, setPastedText] = useState("");
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

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">New Project</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {processing ? (
          <div className="py-8 space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Processing your content...</p>
              <p className="text-xs text-muted-foreground">
                {progress < 30
                  ? "Transcribing audio..."
                  : progress < 60
                    ? "Extracting highlights..."
                    : progress < 90
                      ? "Generating content..."
                      : "Finalizing outputs..."}
              </p>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center font-mono">{progress}%</p>
          </div>
        ) : (
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="youtube">YouTube URL</TabsTrigger>
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="text">Paste Text</TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="space-y-4">
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => { setYoutubeUrl(e.target.value); setError(null); }}
              />
              <Button
                onClick={() => handleProcess("youtube")}
                disabled={!youtubeUrl.trim()}
                className="w-full"
              >
                Generate Content
              </Button>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <svg className="h-8 w-8 mx-auto text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm text-muted-foreground mb-1">
                  Drop a video, audio, or text file here
                </p>
                <p className="text-xs text-muted-foreground/60">
                  MP4, MP3, WAV, TXT, PDF up to 500MB
                </p>
              </div>
              <Button onClick={() => handleProcess("upload")} className="w-full">
                Upload & Generate
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <Textarea
                placeholder="Paste your content here... Articles, transcripts, notes, or any text you want to repurpose."
                rows={6}
                value={pastedText}
                onChange={(e) => { setPastedText(e.target.value); setError(null); }}
              />
              <Button
                onClick={() => handleProcess("text")}
                disabled={!pastedText.trim()}
                className="w-full"
              >
                Generate Content
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

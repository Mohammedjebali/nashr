"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkedInPost } from "./linkedin-post";
import { XThread } from "./x-thread";
import { BlogDraft } from "./blog-draft";
import { HooksHashtags } from "./hooks-hashtags";
import { TranscriptPanel } from "./transcript-panel";
import { HighlightCards } from "./highlight-cards";
import type { ProjectResult } from "@/types";

export function ContentWorkspace({ result }: { result: ProjectResult }) {
  return (
    <Tabs defaultValue="social">
      <TabsList className="mb-6">
        <TabsTrigger value="social">
          <svg
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Social
        </TabsTrigger>
        <TabsTrigger value="blog">
          <svg
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          Blog
        </TabsTrigger>
        <TabsTrigger value="shortform">
          <svg
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.6 19.5m-2.4-19.5-3.6 19.5"
            />
          </svg>
          Short-form
        </TabsTrigger>
        <TabsTrigger value="source">
          <svg
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
          Source
        </TabsTrigger>
      </TabsList>

      <TabsContent value="social">
        <div className="space-y-6">
          <LinkedInPost content={result.content.linkedinPost} />
          <XThread tweets={result.content.xThread} />
        </div>
      </TabsContent>

      <TabsContent value="blog">
        <BlogDraft
          outline={result.content.blogOutline}
          draft={result.content.blogDraft}
        />
      </TabsContent>

      <TabsContent value="shortform">
        <HooksHashtags
          hooks={result.content.hooks}
          hashtags={result.content.hashtags}
          captions={result.content.captions}
        />
      </TabsContent>

      <TabsContent value="source">
        <div className="space-y-6">
          <TranscriptPanel segments={result.transcript} />
          <HighlightCards highlights={result.highlights} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

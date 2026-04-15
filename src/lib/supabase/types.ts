export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: "free" | "pro" | "team";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "pro" | "team";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "pro" | "team";
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          source_type: "youtube" | "upload" | "text";
          source_url: string | null;
          status: "processing" | "completed" | "failed";
          thumbnail_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          source_type: "youtube" | "upload" | "text";
          source_url?: string | null;
          status?: "processing" | "completed" | "failed";
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          status?: "processing" | "completed" | "failed";
          thumbnail_url?: string | null;
          updated_at?: string;
        };
      };
      source_inputs: {
        Row: {
          id: string;
          project_id: string;
          input_type: "youtube" | "upload" | "text";
          raw_url: string | null;
          raw_text: string | null;
          file_path: string | null;
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          input_type: "youtube" | "upload" | "text";
          raw_url?: string | null;
          raw_text?: string | null;
          file_path?: string | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          raw_url?: string | null;
          raw_text?: string | null;
          file_path?: string | null;
          metadata?: Record<string, unknown> | null;
        };
      };
      transcripts: {
        Row: {
          id: string;
          project_id: string;
          segments: TranscriptSegmentJson[];
          language: string | null;
          duration_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          segments: TranscriptSegmentJson[];
          language?: string | null;
          duration_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          segments?: TranscriptSegmentJson[];
          language?: string | null;
          duration_seconds?: number | null;
        };
      };
      highlights: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          start_time: number;
          end_time: number;
          summary: string;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          start_time: number;
          end_time: number;
          summary: string;
          tags?: string[];
          created_at?: string;
        };
        Update: {
          title?: string;
          start_time?: number;
          end_time?: number;
          summary?: string;
          tags?: string[];
        };
      };
      generated_assets: {
        Row: {
          id: string;
          project_id: string;
          asset_type: "linkedin" | "x_thread" | "blog_outline" | "blog_draft" | "hooks" | "hashtags" | "captions" | "clip_ideas";
          content: Record<string, unknown>;
          version: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          asset_type: "linkedin" | "x_thread" | "blog_outline" | "blog_draft" | "hooks" | "hashtags" | "captions" | "clip_ideas";
          content: Record<string, unknown>;
          version?: number;
          created_at?: string;
        };
        Update: {
          content?: Record<string, unknown>;
          version?: number;
        };
      };
      usage_events: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          event_type: string;
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_id?: string | null;
          event_type: string;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          metadata?: Record<string, unknown> | null;
        };
      };
    };
  };
};

export type TranscriptSegmentJson = {
  start: number;
  end: number;
  text: string;
};

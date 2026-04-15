-- Migration 002: Live readiness fixes
-- Unique constraint on transcripts per project (enables upsert)
-- Delete policies for highlights/generated_assets (enables re-generation)

-- Unique constraint so upsert works on transcripts
CREATE UNIQUE INDEX IF NOT EXISTS idx_transcripts_project_unique
  ON public.transcripts (project_id);

-- Allow users to delete their own highlights (needed for re-generation)
DO $$ BEGIN
  CREATE POLICY "Users can delete own highlights"
    ON public.highlights FOR DELETE
    USING (EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = highlights.project_id
      AND projects.user_id = auth.uid()
    ));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow users to delete their own generated assets (needed for re-generation)
DO $$ BEGIN
  CREATE POLICY "Users can delete own generated assets"
    ON public.generated_assets FOR DELETE
    USING (EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = generated_assets.project_id
      AND projects.user_id = auth.uid()
    ));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

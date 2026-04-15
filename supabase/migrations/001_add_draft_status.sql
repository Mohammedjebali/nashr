-- Migration: add 'draft' status to projects
-- Run this if you already applied schema.sql before the draft status was added.

ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('draft', 'processing', 'completed', 'failed'));
ALTER TABLE public.projects ALTER COLUMN status SET DEFAULT 'draft';

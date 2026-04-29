-- Run this in Supabase SQL Editor to add language support
ALTER TABLE songs ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'tamil';

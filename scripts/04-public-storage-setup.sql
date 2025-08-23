-- Enable public access to storage bucket without authentication
-- This allows file uploads and downloads without requiring user accounts

-- Update the uploads bucket to allow public access
UPDATE storage.buckets 
SET public = true 
WHERE id = 'uploads';

-- Remove authentication requirements from storage policies
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own uploaded files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own uploaded files" ON storage.objects;

-- Create new public policies for storage
CREATE POLICY "Public can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'uploads'
  );

CREATE POLICY "Public can view files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'uploads'
  );

CREATE POLICY "Public can delete files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'uploads'
  );

-- Ensure the bucket is accessible
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  5242880, -- 5MB in bytes
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

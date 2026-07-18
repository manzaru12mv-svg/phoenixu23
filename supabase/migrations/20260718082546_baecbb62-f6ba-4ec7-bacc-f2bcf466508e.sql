
CREATE POLICY "Public read media" ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

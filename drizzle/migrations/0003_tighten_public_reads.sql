-- Storage: public buckets serve files by URL; restrict listing to staff
DROP POLICY IF EXISTS "media bucket public read" ON storage.objects;
CREATE POLICY "media bucket staff read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND (public.is_staff(auth.uid()) OR public.has_perm(auth.uid(),'media.upload') OR public.has_perm(auth.uid(),'media.manage') OR public.has_perm(auth.uid(),'media.delete')));
DROP POLICY IF EXISTS "Public read homepage-images objects" ON storage.objects;
CREATE POLICY "Super admins read homepage-images objects" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'homepage-images' AND public.has_role(auth.uid(),'super_admin'));

-- media_assets is admin-only (contains uploader emails)
DROP POLICY IF EXISTS "media public read" ON public.media_assets;
CREATE POLICY "media staff read" ON public.media_assets FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()) OR public.has_perm(auth.uid(),'media.upload') OR public.has_perm(auth.uid(),'media.manage') OR public.has_perm(auth.uid(),'media.delete') OR public.has_perm(auth.uid(),'sections.projects'));

-- posts: public sees only published; editors keep full access via existing ALL policy
DROP POLICY IF EXISTS "posts public read" ON public.posts;
CREATE POLICY "posts public read published" ON public.posts FOR SELECT USING (published = true);
DROP POLICY "Public reads active homepage images" ON public.homepage_images;
CREATE POLICY "Anon reads active homepage images" ON public.homepage_images FOR SELECT TO anon USING (is_active);
CREATE POLICY "Authenticated reads homepage images" ON public.homepage_images FOR SELECT TO authenticated USING (is_active OR public.has_role(auth.uid(), 'super_admin'));
DROP POLICY "Public read homepage-images objects" ON storage.objects;
CREATE POLICY "Public read homepage-images objects" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'homepage-images');
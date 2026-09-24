CREATE TABLE public.homepage_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key text NOT NULL UNIQUE,
  category_name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  storage_path text,
  file_name text,
  alt_text text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);
GRANT SELECT ON public.homepage_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_images TO authenticated;
GRANT ALL ON public.homepage_images TO service_role;
ALTER TABLE public.homepage_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active homepage images" ON public.homepage_images FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins insert homepage images" ON public.homepage_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins update homepage images" ON public.homepage_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins delete homepage images" ON public.homepage_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

CREATE OR REPLACE FUNCTION public.touch_homepage_images() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); NEW.updated_by = auth.uid(); RETURN NEW; END $$;
CREATE TRIGGER homepage_images_touch BEFORE INSERT OR UPDATE ON public.homepage_images FOR EACH ROW EXECUTE FUNCTION public.touch_homepage_images();

INSERT INTO public.homepage_images (category_key, category_name, description, alt_text, sort) VALUES
('network-cameras','Network Cameras','IP cameras for every environment.','Network Cameras',1),
('ptz-cameras','PTZ Cameras','Pan-tilt-zoom coverage for wide areas.','PTZ Cameras',2),
('nvr','NVR','Network video recorders for 24/7 recording.','NVR',3),
('solar-cameras','Solar Cameras','Off-grid surveillance powered by the sun.','Solar Cameras',4),
('access-control','Access Control','Biometric, RFID and smart access.','Access Control',5),
('networking','Networking','Switches, routers and access points.','Networking',6);

CREATE POLICY "Public read homepage-images objects" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'homepage-images');
CREATE POLICY "Super admins upload homepage-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'homepage-images' AND public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins update homepage-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'homepage-images' AND public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins delete homepage-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'homepage-images' AND public.has_role(auth.uid(), 'super_admin'));
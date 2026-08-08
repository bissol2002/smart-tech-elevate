CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','super_admin'))
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'super_admin')
$$;

CREATE TABLE public.super_admin_emails (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.super_admin_emails TO service_role;
ALTER TABLE public.super_admin_emails ENABLE ROW LEVEL SECURITY;
INSERT INTO public.super_admin_emails (email) VALUES ('bankyv15@gmail.com'), ('mctinotechdept@gmail.com');

CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL DEFAULT '',
  enabled boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.social_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_links TO authenticated;
GRANT ALL ON public.social_links TO service_role;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "social public read" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "social staff write" ON public.social_links FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER social_links_updated_at BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.whatsapp_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  number text NOT NULL,
  notify boolean NOT NULL DEFAULT true,
  show_on_site boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.whatsapp_numbers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_numbers TO authenticated;
GRANT ALL ON public.whatsapp_numbers TO service_role;
ALTER TABLE public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "whatsapp public read" ON public.whatsapp_numbers FOR SELECT USING (true);
CREATE POLICY "whatsapp staff write" ON public.whatsapp_numbers FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER whatsapp_numbers_updated_at BEFORE UPDATE ON public.whatsapp_numbers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.project_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_categories TO authenticated;
GRANT ALL ON public.project_categories TO service_role;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "project_categories public read" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "project_categories staff write" ON public.project_categories FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER project_categories_updated_at BEFORE UPDATE ON public.project_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.project_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS completion_date date,
  ADD COLUMN IF NOT EXISTS cover_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false;

CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text NOT NULL DEFAULT '',
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX project_images_project_idx ON public.project_images(project_id, sort);
GRANT SELECT ON public.project_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_images TO authenticated;
GRANT ALL ON public.project_images TO service_role;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "project_images public read" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "project_images staff write" ON public.project_images FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER project_images_updated_at BEFORE UPDATE ON public.project_images FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE,
  url text NOT NULL,
  name text NOT NULL,
  mime text NOT NULL DEFAULT '',
  size integer NOT NULL DEFAULT 0,
  folder text NOT NULL DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media public read" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "media staff write" ON public.media_assets FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER media_assets_updated_at BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "media bucket public read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media bucket staff insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_staff(auth.uid()));
CREATE POLICY "media bucket staff update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_staff(auth.uid()));
CREATE POLICY "media bucket staff delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_staff(auth.uid()));

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS maps_embed_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS maps_place_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hours_weekday text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hours_saturday text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hours_sunday text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS youtube text,
  ADD COLUMN IF NOT EXISTS tiktok text;

DROP POLICY IF EXISTS "brands admin write" ON public.brands;
CREATE POLICY "brands staff write" ON public.brands FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "faqs admin write" ON public.faqs;
CREATE POLICY "faqs staff write" ON public.faqs FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "industries admin write" ON public.industries;
CREATE POLICY "industries staff write" ON public.industries FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "posts admin write" ON public.posts;
CREATE POLICY "posts staff write" ON public.posts FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "projects admin write" ON public.projects;
CREATE POLICY "projects staff write" ON public.projects FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "site_settings admin write" ON public.site_settings;
CREATE POLICY "site_settings staff write" ON public.site_settings FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "solutions admin write" ON public.solutions;
CREATE POLICY "solutions staff write" ON public.solutions FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "team admin write" ON public.team;
CREATE POLICY "team staff write" ON public.team FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "testimonials admin write" ON public.testimonials;
CREATE POLICY "testimonials staff write" ON public.testimonials FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
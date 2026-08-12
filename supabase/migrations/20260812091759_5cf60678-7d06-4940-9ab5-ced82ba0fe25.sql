-- 1. Staff permissions
CREATE TABLE public.staff_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  permission text NOT NULL,
  granted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, permission)
);
GRANT SELECT ON public.staff_permissions TO authenticated;
GRANT ALL ON public.staff_permissions TO service_role;
ALTER TABLE public.staff_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own permissions readable" ON public.staff_permissions FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

-- Permission check: legacy admins/super admins keep full access
CREATE OR REPLACE FUNCTION public.has_perm(_user_id uuid, _perm text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_staff(_user_id)
    OR EXISTS (SELECT 1 FROM public.staff_permissions WHERE user_id = _user_id AND permission = _perm)
$$;

-- 2. Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  business_name text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit an order" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read orders" ON public.orders FOR SELECT TO authenticated USING (public.has_perm(auth.uid(), 'commerce.orders'));
CREATE POLICY "staff update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_perm(auth.uid(), 'commerce.orders')) WITH CHECK (public.has_perm(auth.uid(), 'commerce.orders'));
CREATE POLICY "staff delete orders" ON public.orders FOR DELETE TO authenticated USING (public.has_perm(auth.uid(), 'commerce.orders'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Media library metadata (non destructive)
ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS source_type text NOT NULL DEFAULT 'upload',
  ADD COLUMN IF NOT EXISTS uploaded_by uuid,
  ADD COLUMN IF NOT EXISTS uploaded_by_email text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "media staff write" ON public.media_assets;
CREATE POLICY "media insert with permission" ON public.media_assets FOR INSERT TO authenticated WITH CHECK (public.has_perm(auth.uid(), 'media.upload'));
CREATE POLICY "media update with permission" ON public.media_assets FOR UPDATE TO authenticated USING (public.has_perm(auth.uid(), 'media.manage')) WITH CHECK (public.has_perm(auth.uid(), 'media.manage'));
CREATE POLICY "media delete with permission" ON public.media_assets FOR DELETE TO authenticated USING (public.has_perm(auth.uid(), 'media.delete'));

-- Storage bucket enforcement
DROP POLICY IF EXISTS "media bucket upload" ON storage.objects;
DROP POLICY IF EXISTS "media bucket update" ON storage.objects;
DROP POLICY IF EXISTS "media bucket delete" ON storage.objects;
CREATE POLICY "media bucket upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_perm(auth.uid(), 'media.upload'));
CREATE POLICY "media bucket update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_perm(auth.uid(), 'media.manage'));
CREATE POLICY "media bucket delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_perm(auth.uid(), 'media.delete'));

-- 4. Audit log
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  actor_email text NOT NULL DEFAULT '',
  action text NOT NULL,
  target text NOT NULL DEFAULT '',
  detail jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read audit" ON public.audit_log FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));

-- 5. Content tables: permission-aware writes (admins unaffected via has_perm)
DROP POLICY IF EXISTS "projects staff write" ON public.projects;
CREATE POLICY "projects write with permission" ON public.projects FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'sections.projects')) WITH CHECK (public.has_perm(auth.uid(), 'sections.projects'));

DROP POLICY IF EXISTS "project_images staff write" ON public.project_images;
CREATE POLICY "project_images write with permission" ON public.project_images FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'sections.projects')) WITH CHECK (public.has_perm(auth.uid(), 'sections.projects'));

DROP POLICY IF EXISTS "solutions staff write" ON public.solutions;
CREATE POLICY "solutions write with permission" ON public.solutions FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'sections.solutions')) WITH CHECK (public.has_perm(auth.uid(), 'sections.solutions'));

DROP POLICY IF EXISTS "team staff write" ON public.team;
CREATE POLICY "team write with permission" ON public.team FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'sections.team')) WITH CHECK (public.has_perm(auth.uid(), 'sections.team'));

DROP POLICY IF EXISTS "testimonials staff write" ON public.testimonials;
CREATE POLICY "testimonials write with permission" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'sections.testimonials')) WITH CHECK (public.has_perm(auth.uid(), 'sections.testimonials'));

DROP POLICY IF EXISTS "posts staff write" ON public.posts;
CREATE POLICY "posts write with permission" ON public.posts FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'content.edit')) WITH CHECK (public.has_perm(auth.uid(), 'content.edit'));

DROP POLICY IF EXISTS "site_settings staff write" ON public.site_settings;
CREATE POLICY "site_settings write with permission" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_perm(auth.uid(), 'admin.settings')) WITH CHECK (public.has_perm(auth.uid(), 'admin.settings'));
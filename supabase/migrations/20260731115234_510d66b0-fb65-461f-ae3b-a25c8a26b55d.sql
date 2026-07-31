
CREATE TYPE public.app_role AS ENUM ('admin','editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name text NOT NULL, short_name text NOT NULL, tagline text NOT NULL, domain text NOT NULL,
  phone text NOT NULL, whatsapp text NOT NULL, email text NOT NULL, address text NOT NULL, hours text NOT NULL,
  facebook text, instagram text, linkedin text, twitter text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL,
  short text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', icon text NOT NULL DEFAULT 'Circle',
  features text[] NOT NULL DEFAULT '{}', sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL,
  blurb text NOT NULL DEFAULT '', icon text NOT NULL DEFAULT 'Circle',
  accent text NOT NULL DEFAULT 'from-emerald-500/20 to-emerald-500/5', sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL,
  category text NOT NULL DEFAULT '', tagline text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT '#00A651', sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL,
  category text NOT NULL DEFAULT 'CCTV', client text NOT NULL DEFAULT '', location text NOT NULL DEFAULT '',
  year integer NOT NULL DEFAULT 2025, summary text NOT NULL DEFAULT '', stats jsonb NOT NULL DEFAULT '[]'::jsonb,
  image text NOT NULL DEFAULT 'controlRoom', sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, role text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '', quote text NOT NULL DEFAULT '', rating integer NOT NULL DEFAULT 5,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, role text NOT NULL DEFAULT '',
  initials text NOT NULL DEFAULT '', sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), q text NOT NULL, a text NOT NULL DEFAULT '',
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL,
  excerpt text NOT NULL DEFAULT '', body text NOT NULL DEFAULT '', date date NOT NULL DEFAULT current_date,
  category text NOT NULL DEFAULT 'CCTV', read_time text NOT NULL DEFAULT '5 min',
  published boolean NOT NULL DEFAULT true, sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings admin write" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.solutions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solutions TO authenticated;
GRANT ALL ON public.solutions TO service_role;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "solutions public read" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "solutions admin write" ON public.solutions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER solutions_updated_at BEFORE UPDATE ON public.solutions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.industries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.industries TO authenticated;
GRANT ALL ON public.industries TO service_role;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "industries public read" ON public.industries FOR SELECT USING (true);
CREATE POLICY "industries admin write" ON public.industries FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER industries_updated_at BEFORE UPDATE ON public.industries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.brands TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.brands TO authenticated;
GRANT ALL ON public.brands TO service_role;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "brands public read" ON public.brands FOR SELECT USING (true);
CREATE POLICY "brands admin write" ON public.brands FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER brands_updated_at BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "projects admin write" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials public read" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials admin write" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.team TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team TO authenticated;
GRANT ALL ON public.team TO service_role;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
CREATE POLICY "team public read" ON public.team FOR SELECT USING (true);
CREATE POLICY "team admin write" ON public.team FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER team_updated_at BEFORE UPDATE ON public.team FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faqs public read" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "faqs admin write" ON public.faqs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts public read" ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts admin write" ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (id,name,short_name,tagline,domain,phone,whatsapp,email,address,hours,facebook,instagram,linkedin,twitter)
VALUES (1,'iSmart Digital Technology','iSmart','Securing Businesses Through Intelligent Technology','ismartdigitaltech.com','08124265051','2348124265051','info@ismartdigitaltech.com','Plot 12, Adeola Odeku Street, Victoria Island, Lagos, Nigeria','Mon – Sat: 8:00 AM – 6:00 PM','https://facebook.com/ismartdigitaltech','https://instagram.com/ismartdigitaltech','https://linkedin.com/company/ismartdigitaltech','https://twitter.com/ismartdigitech');

ALTER TABLE public.homepage_images ADD COLUMN IF NOT EXISTS section text NOT NULL DEFAULT 'equipment';
INSERT INTO public.homepage_images (section, category_key, category_name, description, alt_text, sort)
SELECT 'environments', v.k, v.n, v.d, v.n, v.s FROM (VALUES
 ('env-residential','Residential','Homes & Estates',101),
 ('env-commercial','Commercial','Offices & Buildings',102),
 ('env-education','Education','Schools & Campuses',103),
 ('env-healthcare','Healthcare','Hospitals & Clinics',104),
 ('env-industrial','Industrial','Factories & Plants',105),
 ('env-government','Government','Public Institutions',106)
) AS v(k,n,d,s)
WHERE NOT EXISTS (SELECT 1 FROM public.homepage_images h WHERE h.category_key = v.k);
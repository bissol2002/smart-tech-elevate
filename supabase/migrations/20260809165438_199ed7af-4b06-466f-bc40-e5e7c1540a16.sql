INSERT INTO public.super_admin_emails (email) VALUES ('bankyv15@gmail.com'), ('mctinotechdept@gmail.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT u.id, r.role
FROM auth.users u
CROSS JOIN (VALUES ('super_admin'::app_role), ('admin'::app_role)) AS r(role)
WHERE lower(u.email) IN ('bankyv15@gmail.com','mctinotechdept@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
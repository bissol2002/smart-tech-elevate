import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

/**
 * Called right after sign-in. Grants the super-admin role to allow-listed
 * emails, and lets the very first user claim admin while no admin exists.
 */
export const syncAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = (context.claims?.email as string | undefined)?.toLowerCase() ?? "";

    if (email) {
      const { data: allowed } = await supabaseAdmin
        .from("super_admin_emails")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (allowed) {
        await supabaseAdmin
          .from("user_roles")
          .upsert(
            [
              { user_id: context.userId, role: "super_admin" as const },
              { user_id: context.userId, role: "admin" as const },
            ],
            { onConflict: "user_id,role", ignoreDuplicates: true },
          );
        return { role: "super_admin" as const };
      }
    }

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (roles?.some((r) => r.role === "super_admin")) return { role: "super_admin" as const };
    if (roles?.some((r) => r.role === "admin")) return { role: "admin" as const };
    if (roles?.some((r) => r.role === "editor")) return { role: "editor" as const };
    return { role: null };
  });

async function assertSuperAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "super_admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: super admin only");
  return supabaseAdmin;
}

export const listUsers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const admin = await assertSuperAdmin(context.userId);
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (error) throw error;
    const { data: roles } = await admin.from("user_roles").select("user_id, role");
    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      roles: (roles ?? []).filter((r) => r.user_id === u.id).map((r) => r.role as string),
    }));
  });

const roleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["super_admin", "admin", "editor"]),
  grant: z.boolean(),
});

export const setUserRole = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => roleSchema.parse(input))
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const admin = await assertSuperAdmin(context.userId);
    if (data.grant) {
      const { error } = await admin
        .from("user_roles")
        .upsert({ user_id: data.userId, role: data.role }, { onConflict: "user_id,role", ignoreDuplicates: true });
      if (error) throw error;
    } else {
      if (data.userId === context.userId && data.role === "super_admin") {
        throw new Error("You cannot remove your own super admin role.");
      }
      const { error } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", data.role);
      if (error) throw error;
    }
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ userId: z.string().uuid() }).parse(input))
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    if (data.userId === context.userId) throw new Error("You cannot delete your own account.");
    const admin = await assertSuperAdmin(context.userId);
    const { error } = await admin.auth.admin.deleteUser(data.userId);
    if (error) throw error;
    return { ok: true };
  });

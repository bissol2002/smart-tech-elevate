import { useCallback, useEffect, useState } from "react";
import { listUsers, setUserRole, deleteUser, setUserPermission, setUserPermissionSet } from "@/lib/admin.functions";
import { permissionGroups, allPermissions } from "@/lib/permissions";
import { Loader2, Trash2, ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
  permissions: string[];
};

const ROLES = ["super_admin", "admin", "editor"] as const;

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setMsg(null);
    try {
      setUsers((await listUsers()) as AdminUser[]);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not load users.");
      setUsers([]);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function toggle(userId: string, role: (typeof ROLES)[number], grant: boolean) {
    setBusy(true); setMsg(null);
    try {
      await setUserRole({ data: { userId, role, grant } });
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Update failed.");
    }
    setBusy(false);
  }

  async function togglePerm(userId: string, permission: string, grant: boolean) {
    setBusy(true); setMsg(null);
    try {
      await setUserPermission({ data: { userId, permission, grant } });
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Permission update failed.");
    }
    setBusy(false);
  }

  async function toggleAll(userId: string, permissions: string[], grant: boolean) {
    setBusy(true); setMsg(null);
    try {
      await setUserPermissionSet({ data: { userId, permissions, grant } });
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Permission update failed.");
    }
    setBusy(false);
  }

  async function remove(userId: string, email: string) {
    if (!confirm(`Delete ${email}? This cannot be undone.`)) return;
    setBusy(true); setMsg(null);
    try {
      await deleteUser({ data: { userId } });
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Delete failed.");
    }
    setBusy(false);
  }

  if (!users) return <div className="grid place-items-center rounded-2xl border border-border bg-card p-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Staff &amp; permissions</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Super admins have unrestricted access. For everyone else, tick exactly what they may do.
      </p>
      {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}

      <ul className="mt-6 space-y-3">
        {users.map((u) => {
          const isSuper = u.roles.includes("super_admin");
          const open = expanded === u.id;
          return (
            <li key={u.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 truncate text-sm font-semibold text-ink">
                    {isSuper && <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />}
                    {u.email}
                  </div>
                  <div className="text-[11px] text-ink-soft">
                    Last sign in: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "never"}
                    {!isSuper && ` · ${u.permissions.length} permission${u.permissions.length === 1 ? "" : "s"}`}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {ROLES.map((r) => {
                    const has = u.roles.includes(r);
                    return (
                      <button
                        key={r}
                        disabled={busy}
                        onClick={() => toggle(u.id, r, !has)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${has ? "gradient-primary text-white shadow-glow" : "border border-border text-ink hover:border-primary"}`}
                      >
                        {r.replace("_", " ")}
                      </button>
                    );
                  })}
                  <button
                    disabled={busy}
                    onClick={() => setExpanded(open ? null : u.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary disabled:opacity-60"
                  >
                    {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />} Permissions
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => remove(u.id, u.email)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive hover:border-destructive disabled:opacity-60"
                    aria-label={`Delete ${u.email}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {open && (
                <div className="border-t border-border bg-surface px-5 py-5">
                  {isSuper ? (
                    <p className="text-sm text-ink-soft">
                      This account is a super admin — every permission is granted automatically and cannot be reduced here.
                    </p>
                  ) : (
                    <>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <button disabled={busy} onClick={() => toggleAll(u.id, allPermissions, true)} className="rounded-full gradient-primary px-4 py-1.5 text-xs font-semibold text-white shadow-glow disabled:opacity-60">Select all</button>
                        <button disabled={busy} onClick={() => toggleAll(u.id, allPermissions, false)} className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-ink hover:border-primary disabled:opacity-60">Clear all</button>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {permissionGroups.map((g) => (
                          <div key={g.group}>
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-xs font-bold uppercase tracking-wide text-primary">{g.group}</h3>
                              <button
                                disabled={busy}
                                onClick={() => toggleAll(u.id, g.items.map((i) => i.key), !g.items.every((i) => u.permissions.includes(i.key)))}
                                className="text-[11px] font-semibold text-ink-soft hover:text-primary disabled:opacity-60"
                              >
                                {g.items.every((i) => u.permissions.includes(i.key)) ? "Clear group" : "Select group"}
                              </button>
                            </div>
                            <ul className="space-y-2">
                              {g.items.map((p) => {
                                const has = u.permissions.includes(p.key);
                                return (
                                  <li key={p.key}>
                                    <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-border bg-card p-3 hover:border-primary">
                                      <input
                                        type="checkbox"
                                        checked={has}
                                        disabled={busy}
                                        onChange={() => togglePerm(u.id, p.key, !has)}
                                        className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                                      />
                                      <span>
                                        <span className="block text-xs font-semibold text-ink">{p.label}</span>
                                        <span className="block text-[11px] text-ink-soft">{p.hint}</span>
                                      </span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
        {users.length === 0 && <li className="rounded-2xl border border-border bg-card px-5 py-6 text-sm text-ink-soft">No users found.</li>}
      </ul>
    </div>
  );
}

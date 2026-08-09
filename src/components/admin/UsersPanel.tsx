import { useCallback, useEffect, useState } from "react";
import { listUsers, setUserRole, deleteUser } from "@/lib/admin.functions";
import { Loader2, Trash2 } from "lucide-react";

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
};

const ROLES = ["super_admin", "admin", "editor"] as const;

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
      <h1 className="font-display text-2xl font-extrabold text-ink">Users &amp; roles</h1>
      <p className="mt-1 text-sm text-ink-soft">Super admins can grant or revoke access for any account.</p>
      {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {users.map((u) => (
          <li key={u.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-ink">{u.email}</div>
              <div className="text-[11px] text-ink-soft">
                Last sign in: {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "never"}
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
                onClick={() => remove(u.id, u.email)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive hover:border-destructive disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
        {users.length === 0 && <li className="px-5 py-6 text-sm text-ink-soft">No users found.</li>}
      </ul>
    </div>
  );
}

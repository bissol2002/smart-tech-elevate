import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { syncAccess } from "@/lib/admin.functions";
import { collections, emptyRow, iconNames, type Collection, type Row } from "@/lib/admin-collections";
import { MediaLibrary, MediaPicker } from "@/components/admin/MediaLibrary";
import { Loader2, LogOut, Plus, Save, Trash2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — iSmart Digital Technology" },
      { name: "description", content: "Private content management panel." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});


function AdminPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { setEmail(null); setIsAdmin(false); setReady(true); return; }
    setEmail(data.user.email ?? "");
    const { data: role } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
    setIsAdmin(Boolean(role));
    setReady(true);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  if (!ready) return <Center><Loader2 className="h-6 w-6 animate-spin text-primary" /></Center>;
  if (!email) return <LoginCard onDone={refresh} />;
  if (!isAdmin) return <NoAccessCard email={email} onDone={refresh} />;
  return <Dashboard email={email} />;
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-surface px-4">{children}</div>;
}

function LoginCard({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const fn = mode === "in"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    const { data, error } = await fn;
    setBusy(false);
    if (error) { setMsg(error.message); return; }
    if (mode === "up" && !data.session) { setMsg("Check your email to confirm the account, then sign in."); return; }
    onDone();
  }

  return (
    <Center>
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white"><ShieldCheck className="h-5 w-5" /></div>
        <h1 className="mt-5 font-display text-xl font-extrabold text-ink">Admin access</h1>
        <p className="mt-1 text-sm text-ink-soft">{mode === "in" ? "Sign in to manage site content." : "Create the admin account."}</p>
        <input className="mt-6 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}
        <button disabled={busy} className="mt-5 w-full rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60">
          {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
        </button>
        <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="mt-3 w-full text-xs font-semibold text-ink-soft hover:text-primary">
          {mode === "in" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </Center>
  );
}

function NoAccessCard({ email, onDone }: { email: string; onDone: () => void }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <Center>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <h1 className="font-display text-xl font-extrabold text-ink">No admin access</h1>
        <p className="mt-2 text-sm text-ink-soft">Signed in as {email}, but this account has no admin role.</p>
        {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true); setMsg(null);
            try {
              const res = await syncAccess();
              if (res.role) onDone();
              else setMsg("This account has no access. Ask a super admin to grant it.");
            } catch { setMsg("Could not verify access."); }
            setBusy(false);
          }}
          className="mt-5 w-full rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          Claim admin access
        </button>
        <button onClick={async () => { await supabase.auth.signOut(); onDone(); }} className="mt-3 w-full text-xs font-semibold text-ink-soft hover:text-primary">Sign out</button>
      </div>
    </Center>
  );
}

function Dashboard({ email }: { email: string }) {
  const [active, setActive] = useState(collections[0]);
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-white"><ShieldCheck className="h-4 w-4" /></span>
            <div>
              <div className="font-display text-sm font-extrabold text-ink">Content Manager</div>
              <div className="text-[11px] text-ink-soft">{email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink hover:border-primary">View site</a>
            <button onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink hover:border-primary">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
          {collections.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c)}
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${active.key === c.key ? "gradient-primary text-white shadow-glow" : "border border-border bg-card text-ink hover:border-primary"}`}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <CollectionEditor key={active.key} collection={active} />
      </div>
    </div>
  );
}


function CollectionEditor({ collection }: { collection: Collection }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const q = supabase.from(collection.table as any).select("*");
    const { data, error } = collection.single ? await q : await q.order("sort", { ascending: true });
    if (error) { setMsg(error.message); return; }
    setRows(data ?? []);
    if (collection.single) setEditing((data ?? [])[0] ?? null);
  }, [collection]);

  useEffect(() => { void load(); }, [load]);

  async function save(row: Row) {
    setMsg(null);
    const payload: Row = {};
    for (const f of collection.fields) payload[f.name] = row[f.name];
    const res = row.id
      ? await supabase.from(collection.table as any).update(payload).eq("id", row.id)
      : await supabase.from(collection.table as any).insert(payload);
    if (res.error) { setMsg(res.error.message); return; }
    setMsg("Saved — changes are live on the site.");
    if (!collection.single) setEditing(null);
    void load();
  }

  async function remove(row: Row) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(collection.table as any).delete().eq("id", row.id);
    if (error) { setMsg(error.message); return; }
    setEditing(null);
    void load();
  }

  if (!rows) return <div className="rounded-2xl border border-border bg-card p-8 text-sm text-ink-soft">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink">{collection.label}</h1>
        {!collection.single && (
          <button onClick={() => setEditing(emptyRow(collection))} className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-5 py-2.5 text-xs font-semibold text-white shadow-glow">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        )}
      </div>
      {msg && <p className="mt-3 text-sm font-medium text-primary">{msg}</p>}

      {editing && <RowForm collection={collection} row={editing} onCancel={collection.single ? undefined : () => setEditing(null)} onSave={save} onDelete={!collection.single && editing.id ? () => remove(editing) : undefined} />}

      {!collection.single && (
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <span className="truncate text-sm text-ink">{collection.title(r)}</span>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(r)} className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:border-primary">Edit</button>
                <button onClick={() => remove(r)} className="rounded-full border border-border px-3 py-1.5 text-xs text-destructive hover:border-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </li>
          ))}
          {rows.length === 0 && <li className="px-5 py-6 text-sm text-ink-soft">Nothing here yet.</li>}
        </ul>
      )}
    </div>
  );
}

function RowForm({ collection, row, onSave, onCancel, onDelete }: { collection: Collection; row: Row; onSave: (r: Row) => void; onCancel?: () => void; onDelete?: () => void }) {
  const [draft, setDraft] = useState<Row>(row);
  useEffect(() => setDraft(row), [row]);
  const set = (k: string, v: unknown) => setDraft((d) => ({ ...d, [k]: v }));
  const input = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none";

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave({ ...draft, id: row.id }); }}
      className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-2"
    >
      {collection.fields.map((f) => (
        <div key={f.name} className={f.type === "textarea" || f.type === "list" || f.type === "json" ? "md:col-span-2" : ""}>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-soft">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea rows={4} className={input} value={draft[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.type === "list" ? (
            <textarea rows={4} className={input} value={(draft[f.name] ?? []).join("\n")} onChange={(e) => set(f.name, e.target.value.split("\n").filter(Boolean))} />
          ) : f.type === "json" ? (
            <textarea rows={4} className={input} value={JSON.stringify(draft[f.name] ?? [], null, 2)} onChange={(e) => { try { set(f.name, JSON.parse(e.target.value)); } catch { /* keep last valid */ } }} />
          ) : f.type === "bool" ? (
            <div className="mt-2"><input type="checkbox" className="h-4 w-4 accent-primary" checked={Boolean(draft[f.name])} onChange={(e) => set(f.name, e.target.checked)} /></div>
          ) : f.type === "number" ? (
            <input type="number" className={input} value={draft[f.name] ?? 0} onChange={(e) => set(f.name, Number(e.target.value))} />
          ) : f.type === "icon" ? (
            <select className={input} value={draft[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
              {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          ) : (
            <input className={input} value={draft[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
          )}
        </div>
      ))}
      <div className="md:col-span-2 flex flex-wrap gap-2 pt-2">
        <button className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-6 py-2.5 text-xs font-semibold text-white shadow-glow"><Save className="h-3.5 w-3.5" /> Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="rounded-full border border-border px-6 py-2.5 text-xs font-semibold hover:border-primary">Cancel</button>}
        {onDelete && <button type="button" onClick={onDelete} className="rounded-full border border-border px-6 py-2.5 text-xs font-semibold text-destructive hover:border-destructive">Delete</button>}
      </div>
    </form>
  );
}

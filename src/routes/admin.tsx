import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { syncAccess } from "@/lib/admin.functions";
import { collections, emptyRow, iconNames, type Collection, type Field, type Row } from "@/lib/admin-collections";
import { MediaLibrary, MediaPicker } from "@/components/admin/MediaLibrary";
import { UsersPanel } from "@/components/admin/UsersPanel";
import { ProjectGallery } from "@/components/admin/ProjectGallery";
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
  const [isSuper, setIsSuper] = useState(false);

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { setEmail(null); setIsAdmin(false); setIsSuper(false); setReady(true); return; }
    setEmail(data.user.email ?? "");
    try {
      const res = await syncAccess();
      setIsAdmin(Boolean(res.role));
      setIsSuper(res.role === "super_admin");
    } catch {
      const { data: role } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
      const { data: sup } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "super_admin" });
      setIsAdmin(Boolean(role) || Boolean(sup));
      setIsSuper(Boolean(sup));
    }
    setReady(true);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  if (!ready) return <Center><Loader2 className="h-6 w-6 animate-spin text-primary" /></Center>;
  if (!email) return <LoginCard onDone={refresh} />;
  if (!isAdmin) return <NoAccessCard email={email} onDone={refresh} />;
  return <Dashboard email={email} isSuper={isSuper} />;
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
        <button
          type="button"
          onClick={async () => {
            setMsg(null);
            const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });
            if (result.error) { setMsg("Google sign-in failed. Please try again."); return; }
            if (result.redirected) return;
            onDone();
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-ink hover:border-primary"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.4v3.1A12 12 0 0 0 12 24Z" />
            <path fill="#FBBC05" d="M5.4 14.3a7.1 7.1 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
            <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
          </svg>
          Continue with Google
        </button>
        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-ink-soft">
          <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
        </div>
        <input className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

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

function Dashboard({ email, isSuper }: { email: string; isSuper: boolean }) {
  const [active, setActive] = useState<Collection | "media" | "users">(collections[0]);
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
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${typeof active !== "string" && active.key === c.key ? "gradient-primary text-white shadow-glow" : "border border-border bg-card text-ink hover:border-primary"}`}
            >
              {c.label}
            </button>
          ))}
          <button
            onClick={() => setActive("media")}
            className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${active === "media" ? "gradient-primary text-white shadow-glow" : "border border-border bg-card text-ink hover:border-primary"}`}
          >
            Media library
          </button>
          {isSuper && (
            <button
              onClick={() => setActive("users")}
              className={`rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${active === "users" ? "gradient-primary text-white shadow-glow" : "border border-border bg-card text-ink hover:border-primary"}`}
            >
              Users &amp; roles
            </button>
          )}
        </nav>
        {active === "media"
          ? <MediaLibrary />
          : active === "users"
            ? <UsersPanel />
            : <CollectionEditor key={active.key} collection={active} />}
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

      {collection.key === "projects" && editing?.id && <ProjectGallery projectId={editing.id as string} />}

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

function RefSelect({ field, value, onChange, className }: { field: Field; value: string | null; onChange: (v: string | null) => void; className: string }) {
  const [opts, setOpts] = useState<Row[]>([]);
  useEffect(() => {
    let alive = true;
    void (async () => {
      const { data } = await supabase.from(field.refTable as any).select("*");
      if (alive) setOpts((data ?? []) as Row[]);
    })();
    return () => { alive = false; };
  }, [field.refTable]);
  return (
    <select className={className} value={value ?? ""} onChange={(e) => onChange(e.target.value || null)}>
      <option value="">— none —</option>
      {opts.map((o) => <option key={o.id} value={o.id}>{o[field.refLabel ?? "name"]}</option>)}
    </select>
  );
}

function ImageField({ value, onChange, className }: { value: string; onChange: (v: string) => void; className: string }) {
  const [picking, setPicking] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? <img src={value} alt="Selected" className="mt-1.5 h-14 w-20 rounded-lg object-cover" /> : null}
        <input className={className} placeholder="Image URL" value={value} onChange={(e) => onChange(e.target.value)} />
        <button type="button" onClick={() => setPicking(true)} className="mt-1.5 shrink-0 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary">Choose</button>
      </div>
      {picking && <MediaPicker onPick={onChange} onClose={() => setPicking(false)} />}
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
        <div key={f.name} className={f.type === "textarea" || f.type === "list" || f.type === "json" || f.type === "image" ? "md:col-span-2" : ""}>
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
          ) : f.type === "date" ? (
            <input type="date" className={input} value={draft[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value || null)} />
          ) : f.type === "select" ? (
            <select className={input} value={draft[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
              {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === "ref" ? (
            <RefSelect field={f} value={draft[f.name] ?? null} onChange={(v) => set(f.name, v)} className={input} />
          ) : f.type === "image" ? (
            <ImageField value={draft[f.name] ?? ""} onChange={(v) => set(f.name, v)} className={input} />
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

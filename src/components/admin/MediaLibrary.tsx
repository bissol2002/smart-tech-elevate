import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image as ImageIcon, Loader2, Trash2, Upload, Copy, Check, Link2, Pencil, X } from "lucide-react";

export type MediaAsset = {
  id: string;
  path: string;
  url: string;
  name: string;
  mime: string;
  size: number;
  folder: string;
  title?: string;
  description?: string;
  category?: string;
  media_type?: string;
  source_type?: string;
  is_active?: boolean;
};

export const mediaCategories = [
  "general",
  "projects",
  "products",
  "blog",
  "team",
  "brands",
  "certificates",
  "documents",
] as const;

export function useMedia() {
  const [assets, setAssets] = useState<MediaAsset[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setAssets((data ?? []) as MediaAsset[]);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const upload = useCallback(async (files: FileList | File[], category = "general") => {
    setError(null);
    const { data: auth } = await supabase.auth.getUser();
    for (const file of Array.from(files)) {
      const safe = file.name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
      const path = `${category}/${Date.now()}-${safe}`;
      const up = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
      if (up.error) { setError(up.error.message); continue; }
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      const ins = await supabase.from("media_assets").insert({
        path,
        url: pub.publicUrl,
        name: file.name,
        mime: file.type,
        size: file.size,
        folder: category,
        category,
        title: file.name.replace(/\.[^.]+$/, ""),
        media_type: file.type.startsWith("image/") ? "image" : "document",
        source_type: "upload",
        uploaded_by: auth.user?.id ?? null,
        uploaded_by_email: auth.user?.email ?? "",
      });
      if (ins.error) setError(ins.error.message);
    }
    await load();
  }, [load]);

  const addExternal = useCallback(async (input: { url: string; title: string; category: string; description: string }) => {
    setError(null);
    const { data: auth } = await supabase.auth.getUser();
    const ins = await supabase.from("media_assets").insert({
      path: "",
      url: input.url,
      name: input.title || input.url.split("/").pop() || "External media",
      mime: "",
      size: 0,
      folder: input.category,
      category: input.category,
      title: input.title,
      description: input.description,
      media_type: "image",
      source_type: "external",
      uploaded_by: auth.user?.id ?? null,
      uploaded_by_email: auth.user?.email ?? "",
    });
    if (ins.error) { setError(ins.error.message); return false; }
    await load();
    return true;
  }, [load]);

  const update = useCallback(async (id: string, patch: Partial<MediaAsset>) => {
    const { error } = await supabase.from("media_assets").update(patch).eq("id", id);
    if (error) setError(error.message);
    await load();
  }, [load]);

  const remove = useCallback(async (asset: MediaAsset) => {
    if (asset.path) await supabase.storage.from("media").remove([asset.path]);
    const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);
    if (error) setError(error.message);
    await load();
  }, [load]);

  return { assets, error, load, upload, addExternal, update, remove };
}

export function MediaGrid({
  assets, onPick, onDelete, onEdit,
}: {
  assets: MediaAsset[];
  onPick?: (a: MediaAsset) => void;
  onDelete?: (a: MediaAsset) => void;
  onEdit?: (a: MediaAsset) => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  if (assets.length === 0) {
    return <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-ink-soft">No media here yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {assets.map((a) => (
        <div key={a.id} className="group overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => onPick?.(a)}
            className="relative block aspect-[4/3] w-full bg-muted"
            aria-label={onPick ? `Select ${a.title || a.name}` : a.title || a.name}
          >
            {(a.media_type ?? "image") === "image"
              ? <img src={a.url} alt={a.title || a.name} loading="lazy" className="h-full w-full object-cover" />
              : <span className="grid h-full w-full place-items-center text-ink-soft"><ImageIcon className="h-6 w-6" /></span>}
            {a.source_type === "external" && (
              <span className="absolute left-2 top-2 rounded-full bg-night/70 px-2 py-0.5 text-[9px] font-bold uppercase text-white">Link</span>
            )}
          </button>
          <div className="px-3 py-2">
            <div className="truncate text-[11px] font-semibold text-ink" title={a.title || a.name}>{a.title || a.name}</div>
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <span className="truncate text-[10px] uppercase tracking-wide text-ink-soft">{a.category ?? a.folder}</span>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  aria-label="Copy URL"
                  onClick={() => { void navigator.clipboard.writeText(a.url); setCopied(a.id); setTimeout(() => setCopied(null), 1500); }}
                  className="rounded-md p-1 text-ink-soft hover:text-primary"
                >
                  {copied === a.id ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                {onEdit && (
                  <button type="button" aria-label="Edit details" onClick={() => onEdit(a)} className="rounded-md p-1 text-ink-soft hover:text-primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}
                {onDelete && (
                  <button type="button" aria-label="Delete" onClick={() => { if (confirm(`Delete ${a.title || a.name}?`)) void onDelete(a); }} className="rounded-md p-1 text-destructive/70 hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function UploadButton({ onFiles, category = "general", label = "Upload files" }: { onFiles: (f: FileList) => Promise<void>; category?: string; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full gradient-primary px-5 py-2.5 text-xs font-semibold text-white shadow-glow">
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
      {busy ? "Uploading…" : label}
      <input
        type="file"
        multiple
        accept="image/*,application/pdf"
        className="hidden"
        data-category={category}
        onChange={async (e) => {
          if (!e.target.files?.length) return;
          setBusy(true);
          await onFiles(e.target.files);
          setBusy(false);
          e.target.value = "";
        }}
      />
    </label>
  );
}

function ExternalDialog({ category, onAdd, onClose }: { category: string; onAdd: (i: { url: string; title: string; category: string; description: string }) => Promise<boolean>; onClose: () => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState(category === "all" ? "general" : category);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="fixed inset-0 z-[130] grid place-items-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-label="Add media from URL">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Add from URL</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-ink-soft hover:text-ink"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 space-y-3">
          <input className="input-base" placeholder="https://example.com/image.jpg" value={url} onChange={(e) => setUrl(e.target.value)} maxLength={800} />
          <input className="input-base" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          <textarea className="input-base" rows={2} placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} />
          <select className="input-base" value={cat} onChange={(e) => setCat(e.target.value)}>
            {mediaCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <button
          disabled={busy}
          onClick={async () => {
            if (!/^https?:\/\/.+/i.test(url.trim())) { setErr("Enter a valid http(s) URL."); return; }
            setBusy(true); setErr(null);
            const ok = await onAdd({ url: url.trim(), title: title.trim(), category: cat, description: description.trim() });
            setBusy(false);
            if (ok) onClose(); else setErr("Could not save this link.");
          }}
          className="mt-5 w-full rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {busy ? "Saving…" : "Add to library"}
        </button>
      </div>
    </div>
  );
}

function EditDialog({ asset, onSave, onClose }: { asset: MediaAsset; onSave: (patch: Partial<MediaAsset>) => Promise<void>; onClose: () => void }) {
  const [title, setTitle] = useState(asset.title ?? asset.name);
  const [description, setDescription] = useState(asset.description ?? "");
  const [category, setCategory] = useState(asset.category ?? "general");
  const [busy, setBusy] = useState(false);
  return (
    <div className="fixed inset-0 z-[130] grid place-items-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-label="Edit media details">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Edit details</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-ink-soft hover:text-ink"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 space-y-3">
          <input className="input-base" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="Title" />
          <textarea className="input-base" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} placeholder="Description / alt text" />
          <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)}>
            {mediaCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          disabled={busy}
          onClick={async () => { setBusy(true); await onSave({ title, description, category, folder: category }); setBusy(false); onClose(); }}
          className="mt-5 w-full rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function CategoryTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["all", ...mediaCategories].map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${value === c ? "gradient-primary text-white shadow-glow" : "border border-border bg-card text-ink hover:border-primary"}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export function MediaLibrary() {
  const { assets, error, upload, addExternal, update, remove } = useMedia();
  const [category, setCategory] = useState("all");
  const [external, setExternal] = useState(false);
  const [editing, setEditing] = useState<MediaAsset | null>(null);

  const filtered = useMemo(
    () => (assets ?? []).filter((a) => category === "all" || (a.category ?? a.folder) === category),
    [assets, category],
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Media library</h1>
          <p className="mt-1 text-sm text-ink-soft">Upload from your device or link an external image — reuse it anywhere on the site.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setExternal(true)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-ink hover:border-primary">
            <Link2 className="h-3.5 w-3.5" /> Add from URL
          </button>
          <UploadButton onFiles={(f) => upload(f, category === "all" ? "general" : category)} category={category} />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-5"><CategoryTabs value={category} onChange={setCategory} /></div>

      <div className="mt-6">
        {assets ? <MediaGrid assets={filtered} onDelete={remove} onEdit={setEditing} /> : <p className="text-sm text-ink-soft">Loading…</p>}
      </div>

      {external && <ExternalDialog category={category} onAdd={addExternal} onClose={() => setExternal(false)} />}
      {editing && <EditDialog asset={editing} onSave={(p) => update(editing.id, p)} onClose={() => setEditing(null)} />}
    </div>
  );
}

export function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const { assets, upload, addExternal, error } = useMedia();
  const [category, setCategory] = useState("all");
  const [external, setExternal] = useState(false);
  const filtered = (assets ?? []).filter((a) => category === "all" || (a.category ?? a.folder) === category);
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-label="Choose media">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-ink">Choose an image</h2>
          <div className="flex gap-2">
            <button onClick={() => setExternal(true)} className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink hover:border-primary">From URL</button>
            <UploadButton onFiles={(f) => upload(f, category === "all" ? "general" : category)} label="Upload" />
            <button onClick={onClose} className="rounded-full border border-border px-4 py-2 text-xs font-semibold">Close</button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-4"><CategoryTabs value={category} onChange={setCategory} /></div>
        <div className="mt-5">
          {assets ? <MediaGrid assets={filtered} onPick={(a) => { onPick(a.url); onClose(); }} /> : <p className="text-sm text-ink-soft">Loading…</p>}
        </div>
        {external && <ExternalDialog category={category} onAdd={addExternal} onClose={() => setExternal(false)} />}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image as ImageIcon, Loader2, Trash2, Upload, Copy, Check } from "lucide-react";

export type MediaAsset = { id: string; path: string; url: string; name: string; mime: string; size: number; folder: string };

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

  const upload = useCallback(async (files: FileList | File[], folder = "general") => {
    setError(null);
    for (const file of Array.from(files)) {
      const safe = file.name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
      const path = `${folder}/${Date.now()}-${safe}`;
      const up = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
      if (up.error) { setError(up.error.message); continue; }
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      const ins = await supabase.from("media_assets").insert({
        path, url: pub.publicUrl, name: file.name, mime: file.type, size: file.size, folder,
      });
      if (ins.error) setError(ins.error.message);
    }
    await load();
  }, [load]);

  const remove = useCallback(async (asset: MediaAsset) => {
    await supabase.storage.from("media").remove([asset.path]);
    const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);
    if (error) setError(error.message);
    await load();
  }, [load]);

  return { assets, error, load, upload, remove };
}

export function MediaGrid({
  assets, onPick, onDelete,
}: { assets: MediaAsset[]; onPick?: (a: MediaAsset) => void; onDelete?: (a: MediaAsset) => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  if (assets.length === 0) {
    return <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-ink-soft">No media uploaded yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {assets.map((a) => (
        <div key={a.id} className="group overflow-hidden rounded-xl border border-border bg-card">
          <button
            type="button"
            onClick={() => onPick?.(a)}
            className="block aspect-[4/3] w-full bg-muted"
            aria-label={onPick ? `Select ${a.name}` : a.name}
          >
            {a.mime.startsWith("image/")
              ? <img src={a.url} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
              : <span className="grid h-full w-full place-items-center text-ink-soft"><ImageIcon className="h-6 w-6" /></span>}
          </button>
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <span className="truncate text-[11px] text-ink-soft" title={a.name}>{a.name}</span>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Copy URL"
                onClick={() => { void navigator.clipboard.writeText(a.url); setCopied(a.id); setTimeout(() => setCopied(null), 1500); }}
                className="rounded-md p-1 text-ink-soft hover:text-primary"
              >
                {copied === a.id ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              {onDelete && (
                <button type="button" aria-label="Delete" onClick={() => { if (confirm(`Delete ${a.name}?`)) void onDelete(a); }} className="rounded-md p-1 text-destructive/70 hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function UploadButton({ onFiles, folder = "general", label = "Upload files" }: { onFiles: (f: FileList) => Promise<void>; folder?: string; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full gradient-primary px-5 py-2.5 text-xs font-semibold text-white shadow-glow">
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
      {busy ? "Uploading…" : label}
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        data-folder={folder}
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

export function MediaLibrary() {
  const { assets, error, upload, remove } = useMedia();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Media library</h1>
          <p className="mt-1 text-sm text-ink-soft">Upload once, reuse anywhere — covers, galleries and blog images.</p>
        </div>
        <UploadButton onFiles={(f) => upload(f, "general")} />
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <div className="mt-6">
        {assets ? <MediaGrid assets={assets} onDelete={remove} /> : <p className="text-sm text-ink-soft">Loading…</p>}
      </div>
    </div>
  );
}

export function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const { assets, upload, error } = useMedia();
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-label="Choose media">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Choose an image</h2>
          <div className="flex gap-2">
            <UploadButton onFiles={(f) => upload(f, "general")} label="Upload" />
            <button onClick={onClose} className="rounded-full border border-border px-4 py-2 text-xs font-semibold">Close</button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-5">
          {assets ? <MediaGrid assets={assets} onPick={(a) => { onPick(a.url); onClose(); }} /> : <p className="text-sm text-ink-soft">Loading…</p>}
        </div>
      </div>
    </div>
  );
}

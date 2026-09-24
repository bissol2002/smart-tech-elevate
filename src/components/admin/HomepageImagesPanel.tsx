import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Item = {
  id: string;
  category_key: string;
  category_name: string;
  description: string;
  image_url: string | null;
  storage_path: string | null;
  file_name: string | null;
  alt_text: string;
  is_active: boolean;
  sort: number;
  updated_at: string;
};

const BUCKET = "homepage-images";
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_WIDTH = 1200;

/** Resize to max 1200px wide and re-encode as WebP (falls back to original if unsupported). */
async function optimize(file: File): Promise<{ blob: Blob; ext: string; type: string }> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bmp.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.82));
    if (blob && blob.type === "image/webp") return { blob, ext: "webp", type: "image/webp" };
  } catch { /* fall through */ }
  return { blob: file, ext: file.name.split(".").pop() ?? "jpg", type: file.type };
}

export function HomepageImagesPanel() {
  const [items, setItems] = useState<Item[] | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("homepage_images").select("*").order("sort");
    if (error) { toast.error(error.message); return; }
    setItems(data as Item[]);
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function addCategory() {
    const name = prompt("New category name (e.g. Intercoms)")?.trim();
    if (!name) return;
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("homepage_images").insert({
      category_key: key, category_name: name, alt_text: name, sort: (items?.length ?? 0) + 1,
    });
    if (error) toast.error(error.message); else { toast.success("Category added"); void load(); }
  }

  if (!items) return <div className="rounded-2xl border border-border bg-card p-8 text-sm text-ink-soft">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Homepage Images</h1>
          <p className="mt-1 text-sm text-ink-soft">Images shown under “Professional-grade equipment”. Super Admins only.</p>
        </div>
        <button onClick={addCategory} className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-5 py-2.5 text-xs font-semibold text-white shadow-glow">
          <Plus className="h-3.5 w-3.5" /> Add category
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => <ImageCard key={it.id} item={it} onChanged={load} />)}
      </div>
    </div>
  );
}

function ImageCard({ item, onChanged }: { item: Item; onChanged: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState(item.category_name);
  const [desc, setDesc] = useState(item.description);
  const [alt, setAlt] = useState(item.alt_text);
  const [active, setActive] = useState(item.is_active);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function pick(f: File | undefined) {
    if (!f) return;
    if (!ALLOWED.includes(f.type)) { toast.error("Only JPG, PNG or WebP images are allowed."); return; }
    if (f.size > MAX_BYTES) { toast.error("Image is too large (max 5 MB)."); return; }
    setPending(f);
    setPreview(URL.createObjectURL(f));
  }

  async function save() {
    if (pending && item.image_url && !confirm(`Replace the current ${item.category_name} image?`)) return;
    setBusy(true);
    try {
      const patch: Record<string, unknown> = { category_name: name, description: desc, alt_text: alt, is_active: active };
      if (pending) {
        const { blob, ext, type } = await optimize(pending);
        const path = `${item.category_key}/${Date.now()}.${ext}`;
        const up = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: type, cacheControl: "31536000", upsert: false });
        if (up.error) throw up.error;
        patch.image_url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        patch.storage_path = path;
        patch.file_name = pending.name;
      }
      const { error } = await supabase.from("homepage_images").update(patch).eq("id", item.id);
      if (error) throw error;
      if (pending && item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
      setPending(null); setPreview(null);
      toast.success("Saved — the homepage now shows this image.");
      onChanged();
    } catch (e) {
      toast.error((e as Error).message || "Upload failed");
    }
    setBusy(false);
  }

  async function removeImage() {
    if (!confirm(`Remove the ${item.category_name} image? The default artwork will be shown instead.`)) return;
    setBusy(true);
    const { error } = await supabase.from("homepage_images").update({ image_url: null, storage_path: null, file_name: null }).eq("id", item.id);
    if (!error && item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
    setBusy(false);
    if (error) toast.error(error.message); else { toast.success("Image removed"); onChanged(); }
  }

  const input = "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none";
  const shown = preview ?? item.image_url;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="aspect-4/3 overflow-hidden rounded-lg bg-muted">
        {shown ? <img src={shown} alt={alt} className="h-full w-full object-cover" /> : (
          <div className="grid h-full place-items-center text-xs text-ink-soft">Using default artwork</div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-soft">
        <span className="truncate">{pending ? `New: ${pending.name}` : item.file_name ?? "No uploaded file"}</span>
        <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 font-semibold ${active ? "bg-primary/10 text-primary" : "bg-muted"}`}>{active ? "Active" : "Hidden"}</span>
      </div>
      <div className="text-[11px] text-ink-soft">Updated {new Date(item.updated_at).toLocaleString()}</div>

      <label className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ink-soft">Category name</label>
      <input className={input} value={name} onChange={(e) => setName(e.target.value)} />
      <label className="mt-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">Description</label>
      <input className={input} value={desc} onChange={(e) => setDesc(e.target.value)} />
      <label className="mt-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">Alt text</label>
      <input className={input} value={alt} onChange={(e) => setAlt(e.target.value)} />
      <label className="mt-2 flex items-center gap-2 text-xs text-ink"><input type="checkbox" className="accent-primary" checked={active} onChange={(e) => setActive(e.target.checked)} /> Show on homepage</label>

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary">
          <Upload className="h-3.5 w-3.5" /> {item.image_url ? "Replace image" : "Upload image"}
        </button>
        {item.image_url && (
          <button type="button" disabled={busy} onClick={removeImage} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs text-destructive hover:border-destructive">
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        )}
        <button type="button" disabled={busy} onClick={save} className="ml-auto inline-flex items-center gap-1.5 rounded-full gradient-primary px-5 py-2 text-xs font-semibold text-white shadow-glow disabled:opacity-60">
          {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save
        </button>
      </div>
    </div>
  );
}

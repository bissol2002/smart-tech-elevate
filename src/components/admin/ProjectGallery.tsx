import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MediaPicker, UploadButton, useMedia } from "./MediaLibrary";
import { Trash2, ImagePlus, ArrowUp, ArrowDown } from "lucide-react";

type GalleryImage = { id: string; project_id: string; url: string; alt: string; sort: number };

export function ProjectGallery({ projectId }: { projectId: string }) {
  const [images, setImages] = useState<GalleryImage[] | null>(null);
  const [picking, setPicking] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const { upload } = useMedia();

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort", { ascending: true });
    if (error) setMsg(error.message);
    setImages((data ?? []) as GalleryImage[]);
  }, [projectId]);

  useEffect(() => { void load(); }, [load]);

  async function add(url: string) {
    const sort = (images?.length ?? 0) + 1;
    const { error } = await supabase.from("project_images").insert({ project_id: projectId, url, alt: "", sort });
    if (error) setMsg(error.message);
    await load();
  }

  async function patch(id: string, values: Partial<GalleryImage>) {
    const { error } = await supabase.from("project_images").update(values).eq("id", id);
    if (error) setMsg(error.message);
    await load();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("project_images").delete().eq("id", id);
    if (error) setMsg(error.message);
    await load();
  }

  async function move(index: number, dir: -1 | 1) {
    if (!images) return;
    const target = images[index + dir];
    const current = images[index];
    if (!target || !current) return;
    await patch(current.id, { sort: target.sort });
    await patch(target.id, { sort: current.sort });
  }

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">Project gallery</h2>
          <p className="mt-1 text-sm text-ink-soft">Images shown in the lightbox on the Projects page.</p>
        </div>
        <div className="flex gap-2">
          <UploadButton
            label="Upload images"
            onFiles={async (files) => {
              await upload(files, "projects");
              const { data } = await supabase
                .from("media_assets")
                .select("url")
                .eq("folder", "projects")
                .order("created_at", { ascending: false })
                .limit(files.length);
              for (const a of (data ?? []).reverse()) await add(a.url as string);
            }}
          />
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-ink hover:border-primary"
          >
            <ImagePlus className="h-3.5 w-3.5" /> From library
          </button>
        </div>
      </div>

      {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}

      <ul className="mt-5 grid gap-3">
        {(images ?? []).map((img, i) => (
          <li key={img.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <img src={img.url} alt={img.alt || "Project image"} loading="lazy" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
            <input
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Alt text (describe the image)"
              defaultValue={img.alt}
              onBlur={(e) => { if (e.target.value !== img.alt) void patch(img.id, { alt: e.target.value }); }}
            />
            <div className="flex shrink-0 gap-1">
              <button type="button" disabled={i === 0} onClick={() => void move(i, -1)} className="rounded-full border border-border p-2 disabled:opacity-40"><ArrowUp className="h-3.5 w-3.5" /></button>
              <button type="button" disabled={i === (images?.length ?? 0) - 1} onClick={() => void move(i, 1)} className="rounded-full border border-border p-2 disabled:opacity-40"><ArrowDown className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => void remove(img.id)} className="rounded-full border border-border p-2 text-destructive hover:border-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </li>
        ))}
        {images && images.length === 0 && <li className="text-sm text-ink-soft">No gallery images yet.</li>}
      </ul>

      {picking && <MediaPicker onPick={(url) => void add(url)} onClose={() => setPicking(false)} />}
    </div>
  );
}

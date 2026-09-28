import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { useCms } from "@/lib/cms";
import type { ProjectRow } from "@/lib/cms-types";
import { MapPin, X, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import controlRoom from "@/assets/control-room.webp";
import productCctv from "@/assets/product-cctv.webp";
import productNetwork from "@/assets/product-network.webp";
import accessControl from "@/assets/access-control.webp";
import fiber from "@/assets/fiber-optic.webp";
import dataCentre from "@/assets/data-centre.webp";

const imageMap: Record<string, string> = { controlRoom, productCctv, productNetwork, accessControl, fiber, dataCentre };

function coverOf(p: ProjectRow) {
  return p.cover_url || p.images[0]?.url || imageMap[p.image] || controlRoom;
}
function galleryOf(p: ProjectRow) {
  const urls = p.images.map((i) => ({ url: i.url, alt: i.alt || p.title }));
  return urls.length > 0 ? urls : [{ url: coverOf(p), alt: p.title }];
}

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Gallery — CCTV, Networking & Data Centre Installations | iSmart" },
      { name: "description", content: "Browse recent and completed iSmart Digital Technology installations: enterprise CCTV, networking, access control and data centres across Nigeria." },
      { property: "og:title", content: "Project Gallery | iSmart Digital Technology" },
      { property: "og:description", content: "Recent installation photos from hotels, banks, hospitals, factories and government." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, projectCategories } = useCms();
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState<{ project: ProjectRow; index: number } | null>(null);

  const cats = useMemo(
    () => [{ id: "all", slug: "all", name: "All", sort: -1 }, ...projectCategories],
    [projectCategories],
  );
  const list = useMemo(
    () => (cat === "all" ? projects : projects.filter((p) => p.category_id === cat || p.category === cat)),
    [projects, cat],
  );

  return (
    <>
      <PageHero
        eyebrow="Project gallery"
        title="Proven execution at every scale."
        subtitle="A living gallery of ongoing and completed installations — updated as our engineers deliver across Nigeria."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {cats.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c.id ? "gradient-primary text-white shadow-glow" : "bg-muted text-ink-soft hover:bg-accent"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => {
              const gallery = galleryOf(p);
              return (
                <article
                  key={p.id}
                  className="group animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-card hover-lift"
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox({ project: p, index: 0 })}
                    aria-label={`View photos of ${p.title}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-muted"
                  >
                    <img src={coverOf(p)} alt={p.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{p.category}</span>
                    {gallery.length > 1 && (
                      <span className="absolute top-4 right-4 rounded-full glass px-2.5 py-1 text-[10px] font-bold text-white">{gallery.length} photos</span>
                    )}
                    <span className="absolute bottom-4 left-4 right-4 flex items-center gap-1 text-[11px] text-white/85">
                      <MapPin className="h-3 w-3" />{p.location}{p.year ? ` · ${p.year}` : ""}
                    </span>
                  </button>
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">{p.client}</div>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.summary || p.description}</p>
                    {p.completion_date && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-soft">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" />
                        Completed {new Date(p.completion_date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                      </div>
                    )}
                    {p.stats.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-lg bg-muted/50">
                        {p.stats.map((s) => (
                          <div key={s.label} className="px-2 py-2.5 text-center">
                            <div className="font-display text-sm font-extrabold text-primary">{s.value}</div>
                            <div className="text-[10px] uppercase tracking-wider text-ink-soft">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {list.length === 0 && (
            <p className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-ink-soft">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={galleryOf(lightbox.project)}
          index={lightbox.index}
          title={lightbox.project.title}
          onIndex={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      )}

      <CTASection title="Want to be our next case study?" subtitle="Tell us about your project. We'll help scope, budget and deliver — on time and to spec." />
    </>
  );
}

function Lightbox({
  images, index, title, onIndex, onClose,
}: {
  images: { url: string; alt: string }[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const prev = () => onIndex((index - 1 + images.length) % images.length);
  const next = () => onIndex((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <div role="dialog" aria-modal="true" aria-label={`${title} photos`} className="fixed inset-0 z-[100] flex flex-col bg-night/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <div className="text-sm font-semibold">{title} <span className="text-white/50">· {index + 1}/{images.length}</span></div>
        <button onClick={onClose} aria-label="Close gallery" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8">
        {images.length > 1 && (
          <button onClick={prev} aria-label="Previous photo" className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <img src={images[index].url} alt={images[index].alt} className="max-h-full max-w-full rounded-xl object-contain" />
        {images.length > 1 && (
          <button onClick={next} aria-label="Next photo" className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

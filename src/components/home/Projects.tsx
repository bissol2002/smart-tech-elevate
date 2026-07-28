import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/content/projects";
import controlRoom from "@/assets/control-room.jpg";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import fiber from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";

const imageMap: Record<string, string> = {
  controlRoom, productCctv, productNetwork, accessControl, fiber, dataCentre,
};

const categories = ["All", "CCTV", "Networking", "Access Control", "Fiber", "Data Centre"] as const;

export function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Featured projects</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
              Trusted execution at scale
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                cat === c ? "gradient-primary text-white shadow-glow" : "bg-muted text-ink-soft hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover-lift">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={imageMap[p.image]}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex rounded-full glass px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {p.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-white/80">
                    <MapPin className="h-3 w-3" /> {p.location} · {p.year}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-ink line-clamp-2">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2 leading-relaxed">{p.summary}</p>
                <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-lg bg-muted/50">
                  {p.stats.map((s) => (
                    <div key={s.label} className="px-2 py-2.5 text-center">
                      <div className="font-display text-sm font-extrabold text-primary">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

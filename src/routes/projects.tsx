import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { useCms } from "@/lib/cms";
import { MapPin } from "lucide-react";
import controlRoom from "@/assets/control-room.jpg";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import fiber from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";

const imageMap: Record<string,string> = { controlRoom, productCctv, productNetwork, accessControl, fiber, dataCentre };
const categories = ["All","CCTV","Networking","Access Control","Fiber","Data Centre"] as const;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Featured Projects — CCTV, Networking & Data Centre Case Studies | iSmart" },
      { name: "description", content: "Explore iSmart Digital Technology's featured projects: enterprise CCTV, multi-branch networks, data centres and access control across Nigeria." },
      { property: "og:title", content: "Featured Projects | iSmart Digital Technology" },
      { property: "og:description", content: "Case studies from hotels, banks, hospitals, factories and government." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = useCms();
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat==="All"?projects:projects.filter(p=>p.category===cat);
  return (
    <>
      <PageHero
        eyebrow="Featured projects"
        title="Proven execution at every scale."
        subtitle="From 5-star hotels to nationwide bank networks, our engineers have delivered on projects that keep Nigeria's most demanding enterprises running."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat===c?"gradient-primary text-white shadow-glow":"bg-muted text-ink-soft hover:bg-accent"}`}>{c}</button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map(p=>(
              <article key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={imageMap[p.image]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent"/>
                  <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">{p.category}</span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-[11px] text-white/80"><MapPin className="h-3 w-3"/>{p.location} · {p.year}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-semibold uppercase tracking-widest">{p.client}</div>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{p.summary}</p>
                  <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-lg bg-muted/50">
                    {p.stats.map(s=>(
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

      <CTASection title="Want to be our next case study?" subtitle="Tell us about your project. We'll help scope, budget and deliver — on time and to spec." />
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCms } from "@/lib/cms";
import controlRoom from "@/assets/control-room.webp";
import dataCentre from "@/assets/data-centre.webp";
import fiberOptic from "@/assets/fiber-optic.webp";
import productCctv from "@/assets/product-cctv.webp";
import productNetwork from "@/assets/product-network.webp";
import accessControl from "@/assets/access-control.webp";

// Existing site artwork keyed by the project's legacy image key.
const keyed: Record<string, string> = { controlRoom, dataCentre, fiber: fiberOptic, productCctv, productNetwork, accessControl };
const isUrl = (v?: string | null) => !!v && /^(https?:)?\/\//.test(v);

const fallbackImages = [controlRoom, dataCentre, fiberOptic];

export function ProjectsBand() {
  const { projects } = useCms();
  const items = projects.slice(0, 3);
  if (!items.length) return null;

  return (
    <section aria-labelledby="projects-heading" className="pb-14 md:pb-20">
      <div className="container-x">
        <div className="grid gap-8 bg-night p-6 text-white md:p-9 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 id="projects-heading" className="font-display text-2xl md:text-3xl font-extrabold uppercase leading-tight tracking-tight">
              Real projects.
              <br />
              Real <span className="text-lime">impact</span>.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Security and networking systems delivered across different industries and
              environments.
            </p>
            <Link
              to="/projects"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-lime hover:gap-3 transition-all"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <li key={p.slug ?? i}>
                <Link
                  to="/projects"
                  className="group relative block h-52 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  <img
                    src={(isUrl(p.cover_url) && p.cover_url) || p.images?.[0]?.url || (isUrl(p.image) ? p.image : keyed[p.image]) || fallbackImages[i % fallbackImages.length]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" aria-hidden />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    {p.category && (
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-lime">
                        {p.category}
                      </span>
                    )}
                    <span className="mt-1 block font-display text-sm font-bold leading-snug">{p.title}</span>
                    {p.location && <span className="mt-1 block text-[11px] text-white/70">{p.location}</span>}
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
                      View case study <ArrowRight className="h-3 w-3" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

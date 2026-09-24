import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import controlRoom from "@/assets/control-room.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";

import { useCms } from "@/lib/cms";

// Fallback artwork used only until a Super Admin uploads an image for a category.
const fallbackImages: Record<string, string> = {
  "network-cameras": productCctv,
  "ptz-cameras": controlRoom,
  nvr: dataCentre,
  "solar-cameras": fiberOptic,
  "access-control": accessControl,
  networking: productNetwork,
};

export function Equipment() {
  const { homepageImages } = useCms();
  const categories = homepageImages.map((h) => ({
    key: h.category_key,
    title: h.category_name,
    body: h.description,
    alt: h.alt_text || h.category_name,
    image: h.image_url || fallbackImages[h.category_key] || productCctv,
  }));
  return (
    <section aria-labelledby="equipment-heading" className="pb-14 md:pb-20">
      <div className="container-x">
        <div className="text-center">
          <h2
            id="equipment-heading"
            className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-ink"
          >
            Professional-grade <span className="text-primary">equipment</span>
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-lime" aria-hidden />
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((c) => (
            <li key={c.title}>
              <Link
                to="/products"
                className="group flex h-full flex-col border border-border bg-card transition hover:border-primary/60 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="aspect-4/3 overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-bold text-ink">{c.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-soft">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

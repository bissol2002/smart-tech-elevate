import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCms } from "@/lib/cms";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import fiber from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import controlRoom from "@/assets/control-room.jpg";

const brandImages: Record<string, string> = {
  tiandy: productCctv,
  cisco: productNetwork,
  ubiquiti: fiber,
  bosch: controlRoom,
  mikrotik: productNetwork,
  hikvision: productCctv,
  dahua: accessControl,
  zkteco: dataCentre,
};

export function Brands() {
  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Major brands</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
              The best of global technology
            </h2>
          </div>
          <p className="max-w-md text-ink-soft">
            We are authorised distributors and certified partners for the industry's leading manufacturers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((b) => (
            <article key={b.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover-lift">
              <div className="relative aspect-[5/3] overflow-hidden">
                <img src={brandImages[b.slug]} alt={b.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">{b.category}</div>
                  <div className="font-display text-2xl font-extrabold text-white" style={{ color: "white" }}>
                    {b.name}
                  </div>
                </div>
                <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: b.color }}>
                  {b.tagline}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-ink-soft leading-relaxed line-clamp-3">{b.description}</p>
                <Link to="/brands" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

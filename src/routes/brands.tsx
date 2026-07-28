import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { brands } from "@/content/brands";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import fiber from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import controlRoom from "@/assets/control-room.jpg";
import { ArrowRight } from "lucide-react";

const brandImages: Record<string, string> = {
  tiandy: productCctv, cisco: productNetwork, ubiquiti: fiber, bosch: controlRoom,
  mikrotik: productNetwork, hikvision: productCctv, dahua: accessControl, zkteco: dataCentre,
};

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — Tiandy, Cisco, Ubiquiti, Bosch, Mikrotik | iSmart Nigeria" },
      { name: "description", content: "iSmart Digital Technology is Nigeria's authorised distributor and certified partner for Tiandy, Cisco, Ubiquiti, Bosch, Mikrotik, Hikvision, Dahua and ZKTeco." },
      { property: "og:title", content: "Global Brands | iSmart Digital Technology" },
      { property: "og:description", content: "Authorised distributor and certified partner for the world's leading security & networking brands." },
      { property: "og:url", content: "/brands" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Major brands"
        title="The best of global technology."
        subtitle="We partner directly with the world's leading manufacturers — so you get genuine hardware, factory warranties and engineering that's certified end-to-end."
        crumbs={[{ label: "Brands" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-8">
          {brands.map((b, i)=>(
            <article key={b.slug} className={`grid gap-8 md:grid-cols-2 items-center rounded-3xl border border-border bg-card shadow-card overflow-hidden ${i%2===1?"md:[&>div:first-child]:order-2":""}`}>
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] overflow-hidden">
                <img src={brandImages[b.slug]} alt={b.name} loading="lazy" className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"/>
                <span className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold" style={{color: b.color}}>{b.tagline}</span>
              </div>
              <div className="p-8 md:p-12">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{b.category}</div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-extrabold" style={{color: b.color}}>{b.name}</h2>
                <p className="mt-4 text-ink-soft leading-relaxed">{b.description}</p>
                <a href="/contact" className="mt-6 inline-flex items-center gap-1.5 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover-lift">
                  Enquire about {b.name} <ArrowRight className="h-4 w-4"/>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Looking for a brand not listed?" subtitle="We source and integrate hardware from most global manufacturers on request. Ask our sourcing team." />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { useCms } from "@/lib/cms";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import controlRoom from "@/assets/control-room.jpg";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import fiber from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import accessControl from "@/assets/access-control.jpg";

const covers = [controlRoom, productNetwork, accessControl, fiber, dataCentre, productCctv];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Security, Networking & Infrastructure Insights | iSmart" },
      { name: "description", content: "Practical insights on CCTV, enterprise networking, access control and data centre infrastructure from iSmart's engineering team." },
      { property: "og:title", content: "Blog | iSmart Digital Technology" },
      { property: "og:description", content: "Insights from Nigeria's leading security & connectivity engineers." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = useCms();
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights from the field."
        subtitle="Practical, engineer-written guides on CCTV, networking, access control and infrastructure — informed by hundreds of Nigerian deployments."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          {/* Featured */}
          <article className="group grid gap-8 md:grid-cols-2 items-center rounded-3xl border border-border bg-card overflow-hidden shadow-card hover-lift">
            <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
              <img src={covers[0]} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <span className="absolute top-4 left-4 rounded-full gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow">Featured</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 text-xs text-ink-soft">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary uppercase tracking-widest">{featured.category}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3"/>{new Date(featured.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3"/>{featured.read_time}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-extrabold text-ink leading-tight">{featured.title}</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{featured.excerpt}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4"/>
              </a>
            </div>
          </article>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i)=>(
              <article key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={covers[(i+1)%covers.length]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-soft">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary uppercase tracking-widest">{p.category}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3"/>{p.read_time}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink line-clamp-2">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-3">{p.excerpt}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="h-3.5 w-3.5"/>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection/>
    </>
  );
}

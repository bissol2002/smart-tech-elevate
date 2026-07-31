import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { useCms } from "@/lib/cms";
import { getIcon } from "@/lib/icon-map";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Hotels, Banks, Hospitals, Government | iSmart" },
      { name: "description", content: "iSmart delivers tailored CCTV, networking and access control across hotels, banks, hospitals, government, schools, factories, retail, churches, estates and offices." },
      { property: "og:title", content: "Industries We Serve | iSmart Digital Technology" },
      { property: "og:description", content: "Purpose-built security and connectivity for every sector we serve." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { industries } = useCms();
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Purpose-built for every sector."
        subtitle="Every industry has unique security, compliance and connectivity needs. Our engineers tailor deployments to yours — with vertical-specific expertise built over hundreds of projects."
        crumbs={[{ label: "Industries" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map(i=>{
            const Icon = getIcon(i.icon);
            return (
              <article key={i.slug} className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover-lift shadow-card`}>
                <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${i.accent}`}/>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6"/>
                </div>
                <h3 className="relative mt-6 font-display text-xl font-bold text-ink">{i.title}</h3>
                <p className="relative mt-2 text-sm text-ink-soft leading-relaxed">{i.blurb}</p>
                <a href="/quote" className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Get a quote <ArrowRight className="h-4 w-4"/>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection title="Your industry not listed?" subtitle="We work across every sector where security, safety and connectivity matter. Tell us what you need." />
    </>
  );
}

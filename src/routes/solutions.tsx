import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { solutions } from "@/content/solutions";
import { Check } from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — CCTV, Networking, Access Control & More | iSmart" },
      { name: "description", content: "Explore iSmart's full portfolio: AI CCTV, enterprise networking, access control, fiber optics, wireless bridges, data centres and 24/7 maintenance across Nigeria." },
      { property: "og:title", content: "Solutions | iSmart Digital Technology" },
      { property: "og:description", content: "End-to-end security and connectivity solutions for Nigerian enterprises." },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="End-to-end security & connectivity."
        subtitle="From single-camera installs to enterprise-wide surveillance, from structured cabling to full data centres — we design, deploy and maintain systems built for the real world."
        crumbs={[{ label: "Solutions" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(s=>{
            const Icon = s.icon;
            return (
              <article key={s.slug} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover-lift shadow-card">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/8 blur-3xl group-hover:bg-primary/20 transition"/>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-white shadow-glow">
                  <Icon className="h-6 w-6"/>
                </div>
                <h2 className="relative mt-6 font-display text-xl font-bold text-ink">{s.title}</h2>
                <p className="relative mt-2 text-sm text-ink-soft leading-relaxed">{s.description}</p>
                <ul className="relative mt-5 space-y-2">
                  {s.features.map(f=>(
                    <li key={f} className="flex items-center gap-2 text-sm text-ink">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3"/>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection title="Not sure which solution fits?" subtitle="Book a free discovery call with our senior engineers. We'll help you scope, budget and plan the right stack for your business."/>
    </>
  );
}

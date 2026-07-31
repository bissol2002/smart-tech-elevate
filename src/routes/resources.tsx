import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { useCms } from "@/lib/cms";
import { Download, FileText, Play, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Datasheets, Guides & FAQs | iSmart Digital Technology" },
      { name: "description", content: "Downloadable datasheets, deployment guides, product brochures and FAQs from iSmart's engineering team." },
      { property: "og:title", content: "Resources | iSmart Digital Technology" },
      { property: "og:description", content: "Datasheets, guides and FAQs from our engineering team." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const downloads = [
  { title: "Tiandy AI CCTV Product Catalogue 2026", type: "PDF · 8.4 MB", icon: FileText },
  { title: "Cisco Meraki Design Guide — Multi-Branch", type: "PDF · 3.1 MB", icon: FileText },
  { title: "Structured Cabling Standards Checklist", type: "PDF · 1.2 MB", icon: FileText },
  { title: "Access Control Deployment Handbook", type: "PDF · 4.6 MB", icon: FileText },
  { title: "Data Centre Cooling Sizing Worksheet", type: "XLSX · 240 KB", icon: FileText },
  { title: "Video: How AI CCTV works in real-world Nigerian sites", type: "Video · 4:12", icon: Play },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={()=>setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="font-display text-base md:text-lg font-semibold text-ink">{q}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${open?"gradient-primary text-white":"bg-muted text-ink-soft"}`}>
          {open ? <Minus className="h-4 w-4"/> : <Plus className="h-4 w-4"/>}
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open?"grid-rows-[1fr] opacity-100 pb-5":"grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="text-ink-soft leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function ResourcesPage() {
  const { faqs } = useCms();
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides, datasheets & FAQs."
        subtitle="Practical resources from our engineering team — designed to help you plan, scope and specify infrastructure with confidence."
        crumbs={[{ label: "Resources" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Downloads</h2>
            <p className="mt-2 text-ink-soft">Datasheets, guides and specification worksheets.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {downloads.map(d=>(
              <a key={d.title} href="#" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover-lift shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <d.icon className="h-5 w-5"/>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink truncate">{d.title}</div>
                  <div className="text-xs text-ink-soft">{d.type}</div>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-muted group-hover:gradient-primary group-hover:text-white transition">
                  <Download className="h-4 w-4"/>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">FAQ</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-ink">Frequently asked questions</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card px-6 md:px-10 shadow-card">
            {faqs.map(f=>(<AccordionItem key={f.q} {...f}/>))}
          </div>
        </div>
      </section>

      <CTASection/>
    </>
  );
}

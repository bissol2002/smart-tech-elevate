import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { Counter } from "@/components/site/Counter";
import { useCms } from "@/lib/cms";
import { Target, Eye, Sparkles, Users, ShieldCheck, Award } from "lucide-react";
import dataCentre from "@/assets/data-centre.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About iSmart Digital Technology — A decade of engineering excellence in Nigeria" },
      { name: "description", content: "Meet the iSmart Digital Technology team. Over a decade delivering CCTV, networking and smart infrastructure to Nigeria's most demanding enterprises." },
      { property: "og:title", content: "About iSmart Digital Technology" },
      { property: "og:description", content: "A decade of engineering excellence — meet the team behind Nigeria's trusted security & connectivity partner." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { team } = useCms();
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A decade of engineering excellence."
        subtitle="iSmart Digital Technology is Nigeria's trusted partner for CCTV surveillance, enterprise networking and smart infrastructure — designing, deploying and maintaining mission-critical systems since 2015."
        crumbs={[{ label: "About" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our story</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-ink">
              Built by engineers, for enterprises that can't afford downtime.
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              Founded in Lagos in 2015, iSmart Digital Technology started as a small team of Cisco-certified network engineers with a simple obsession: install it right the first time. A decade later, we've grown into one of Nigeria's most respected system integrators — trusted by hotels, banks, hospitals, factories and government to deliver security and connectivity that just works.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Today we are the <strong className="text-ink">major distributor for Tiandy in Nigeria</strong>, certified partners for Cisco, Ubiquiti, Mikrotik and Bosch — and the go-to team for enterprises who value quality over shortcuts.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[{v:500,s:"+",l:"Clients"},{v:1000,s:"+",l:"Projects"},{v:10,s:"+",l:"Years"}].map(x=>(
                <div key={x.l} className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-display text-3xl font-extrabold text-gradient"><Counter to={x.v} suffix={x.s}/></div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-ink-soft">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 gradient-primary rounded-3xl opacity-30 blur-2xl" />
            <img src={dataCentre} alt="Modern data centre" className="relative rounded-3xl shadow-elevated" loading="lazy" decoding="async" width={1280} height={800} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", body: "To make world-class security and connectivity infrastructure accessible to every Nigerian enterprise — deployed by engineers who genuinely care." },
            { icon: Eye, title: "Our Vision", body: "To become the most trusted technology integrator in West Africa by 2030, known for engineering rigour and lifetime customer support." },
            { icon: Sparkles, title: "Our Values", body: "Integrity in every quote. Precision in every install. Availability when it matters most. Continuous learning, always." },
          ].map((c)=>(
            <div key={c.title} className="rounded-2xl bg-card border border-border p-8 hover-lift shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white shadow-glow">
                <c.icon className="h-5 w-5"/>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Leadership</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-ink">The team behind iSmart</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(m=>(
              <div key={m.name} className="group rounded-2xl border border-border bg-card p-6 flex items-center gap-5 hover-lift shadow-card">
                <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary text-white text-lg font-bold shadow-glow shrink-0">
                  {m.initials}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-ink">{m.name}</div>
                  <div className="text-sm text-ink-soft">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night text-white py-20">
        <div className="container-x grid gap-8 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Certifications", body: "Cisco CCNA/CCNP, Tiandy Certified Installer, ONVIF Professional, Fluke Cat6 Certifier." },
            { icon: Users, title: "Engineering strength", body: "38 in-house engineers, 12 field technicians, 24/7 NOC and nationwide field coverage." },
            { icon: Award, title: "Recognition", body: "Tiandy Distributor of the Year 2024 · Cisco Regional Partner Awards finalist 2023 & 2025." },
          ].map(c=>(
            <div key={c.title} className="rounded-2xl glass p-8">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white shadow-glow">
                <c.icon className="h-5 w-5"/>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection/>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — iSmart Digital Technology" },
      { name: "description", content: "Get a free, tailored quote for CCTV, networking, access control or any of our solutions — usually within 24 hours." },
      { property: "og:title", content: "Request a Quote | iSmart Digital Technology" },
      { property: "og:description", content: "Free consultation and tailored quote within 24 hours." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us about your project."
        subtitle="Fill in a few details and our engineering team will come back with a scoped quote and next-steps — typically within one business day."
        crumbs={[{ label: "Request a Quote" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card">
            {sent ? (
              <div className="text-center py-10">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-primary text-white shadow-glow">
                  <CheckCircle2 className="h-7 w-7"/>
                </div>
                <h2 className="mt-6 font-display text-2xl font-extrabold text-ink">Request received</h2>
                <p className="mt-2 text-ink-soft">Our team will be in touch shortly. For urgent requests, WhatsApp us any time.</p>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" name="name" required/>
                  <Field label="Company / Organisation" name="company"/>
                  <Field label="Email" name="email" type="email" required/>
                  <Field label="Phone / WhatsApp" name="phone" type="tel" required/>
                </div>

                <div>
                  <label className="text-sm font-semibold text-ink">Solutions of interest</label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {solutions.slice(0, 9).map(s=>(
                      <label key={s.slug} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary cursor-pointer">
                        <input type="checkbox" name="solutions" value={s.slug} className="h-4 w-4 rounded accent-primary"/>
                        {s.title}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-ink">Industry</label>
                    <select name="industry" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Select…</option>
                      {industries.map(i=><option key={i.slug} value={i.slug}>{i.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink">Approx. budget (NGN)</label>
                    <select name="budget" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Select…</option>
                      <option>Under 2M</option>
                      <option>2M – 10M</option>
                      <option>10M – 50M</option>
                      <option>50M – 200M</option>
                      <option>200M+</option>
                    </select>
                  </div>
                </div>

                <Field label="Site location" name="location" placeholder="City / State"/>

                <div>
                  <label className="text-sm font-semibold text-ink">Project details</label>
                  <textarea name="details" rows={5} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Number of cameras, buildings, users, deadlines…"/>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-white shadow-glow hover-lift w-fit">
                  Submit request <Send className="h-4 w-4"/>
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl gradient-dark p-8 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl"/>
              <h3 className="font-display text-lg font-bold relative">What happens next</h3>
              <ol className="relative mt-4 space-y-4">
                {[
                  { t: "Review", b: "Our team reviews your request within 4 hours." },
                  { t: "Consultation call", b: "A senior engineer schedules a 20-min discovery call." },
                  { t: "Scoped quote", b: "You receive a fixed-price quote and project plan within 24-48h." },
                  { t: "Kick-off", b: "Approved projects begin site survey within one week." },
                ].map((s,i)=>(
                  <li key={s.t} className="flex gap-4">
                    <span className="grid h-7 w-7 place-items-center rounded-full gradient-primary text-white text-xs font-bold shrink-0">{i+1}</span>
                    <div><div className="font-semibold text-white">{s.t}</div><div className="text-sm text-white/70">{s.b}</div></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Need it faster?</div>
              <p className="mt-2 text-sm text-ink-soft">For urgent requests, call or WhatsApp us directly. Our on-call desk answers 24/7 for existing clients.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <input {...props} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"/>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/content/site";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact iSmart Digital Technology — Lagos, Nigeria" },
      { name: "description", content: "Talk to iSmart Digital Technology. Call, email, WhatsApp or visit our Lagos HQ. 24/7 support for existing clients." },
      { property: "og:title", content: "Contact iSmart Digital Technology" },
      { property: "og:description", content: "Get in touch — Lagos HQ, nationwide coverage." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something reliable."
        subtitle="Get a free consultation with our senior engineers — typically within 24 hours. We serve enterprises across Nigeria from our Lagos HQ."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Send us a message</h2>
            <p className="mt-2 text-ink-soft">Fill in the form and our team will respond within one business day.</p>
            <form
              className="mt-8 grid gap-4"
              onSubmit={(e)=>{ e.preventDefault(); setSent(true); }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required/>
                <Field label="Email" name="email" type="email" required/>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel"/>
                <Field label="Company" name="company"/>
              </div>
              <Field label="Subject" name="subject"/>
              <div>
                <label className="text-sm font-semibold text-ink">Message</label>
                <textarea name="message" rows={5} required className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"/>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover-lift w-fit">
                Send message <Send className="h-4 w-4"/>
              </button>
              {sent && <p className="text-sm text-primary font-medium">Thanks — we'll be in touch shortly.</p>}
            </form>
          </div>

          <aside className="rounded-3xl gradient-dark text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/25 blur-3xl"/>
            <h3 className="font-display text-xl font-bold">Reach us directly</h3>
            <div className="relative mt-8 space-y-6">
              <ContactItem icon={MapPin} label="Head Office" value={site.address}/>
              <ContactItem icon={Phone} label="Call" value={site.phone} href={site.phoneLink}/>
              <ContactItem icon={MessageCircle} label="WhatsApp" value="Chat with us now" href={site.whatsappLink}/>
              <ContactItem icon={Mail} label="Email" value={site.email} href={site.emailLink}/>
              <ContactItem icon={Clock} label="Hours" value={site.hours}/>
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

function ContactItem({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-foreground shrink-0"><Icon className="h-4 w-4"/></span>
      <div><div className="text-[11px] font-bold uppercase tracking-widest text-white/60">{label}</div><div className="text-sm text-white/90">{value}</div></div>
    </div>
  );
  return href ? <a href={href} className="block hover:text-primary transition">{inner}</a> : inner;
}

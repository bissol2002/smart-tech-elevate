import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useSite, useSocialLinks, useWhatsAppNumbers } from "@/lib/cms";
import { SocialIcons } from "@/components/site/SocialIcons";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact iSmart Digital Technology — Port Harcourt, Nigeria" },
      { name: "description", content: "Talk to iSmart Digital Technology. Call, email, WhatsApp or visit our Rumuola, Port Harcourt office. Opening hours, map and direct sales lines." },
      { property: "og:title", content: "Contact iSmart Digital Technology" },
      { property: "og:description", content: "Get in touch — Port Harcourt office, nationwide coverage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const site = useSite();
  const socials = useSocialLinks();
  const whatsapps = useWhatsAppNumbers().filter((w) => w.show_on_site);
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something reliable."
        subtitle="Get a free consultation with our senior engineers — typically within 24 hours. Visit us in Rumuola, Port Harcourt or reach us on WhatsApp."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Send us a message</h2>
            <p className="mt-2 text-ink-soft">Fill in the form and our team will respond within one business day.</p>
            <form className="mt-8 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required maxLength={100} />
                <Field label="Email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" maxLength={30} />
                <Field label="Company" name="company" maxLength={120} />
              </div>
              <Field label="Subject" name="subject" maxLength={150} />
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-ink">Message</label>
                <textarea id="message" name="message" rows={5} required maxLength={2000} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover-lift w-fit">
                Send message <Send className="h-4 w-4" />
              </button>
              {sent && <p className="text-sm text-primary font-medium">Thanks — we'll be in touch shortly.</p>}
            </form>
          </div>

          <aside className="rounded-3xl gradient-dark text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
            <h3 className="font-display text-xl font-bold">Reach us directly</h3>
            <div className="relative mt-8 space-y-6">
              <ContactItem icon={MapPin} label="Head Office" value={site.address} href={site.mapsPlaceUrl || undefined} />
              <ContactItem icon={Phone} label="Call" value={site.phone} href={site.phoneLink} />
              {whatsapps.map((w) => (
                <ContactItem
                  key={w.id}
                  icon={MessageCircle}
                  label={w.label || "WhatsApp"}
                  value={w.number}
                  href={`https://wa.me/${w.number.replace(/[^0-9]/g, "")}`}
                />
              ))}
              <ContactItem icon={Mail} label="Email" value={site.email} href={site.emailLink} />
              <ContactItem
                icon={Clock}
                label="Business hours"
                value={[site.hoursWeekday, site.hoursSaturday, site.hoursSunday].filter(Boolean).join(" · ") || site.hours}
              />
            </div>
            <div className="relative mt-8 border-t border-white/10 pt-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/60">Follow us</div>
              <SocialIcons className="mt-3" links={socials} whatsappLink={site.whatsappLink} variant="dark" />
            </div>
          </aside>
        </div>
      </section>

      {site.mapsEmbedUrl && (
        <section className="pb-20 md:pb-28">
          <div className="container-x">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                title={`Map to ${site.name}`}
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 md:h-[460px]"
              />
            </div>
            {site.mapsPlaceUrl && (
              <a href={site.mapsPlaceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">{label}</label>
      <input id={name} name={name} {...props} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-foreground shrink-0"><Icon className="h-4 w-4" /></span>
      <div><div className="text-[11px] font-bold uppercase tracking-widest text-white/60">{label}</div><div className="text-sm text-white/90">{value}</div></div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" className="block hover:text-primary transition">{inner}</a> : inner;
}

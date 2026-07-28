import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ShieldCheck, Send } from "lucide-react";
import { site, nav } from "@/content/site";
import { solutions } from "@/content/solutions";
import { brands } from "@/content/brands";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "var(--gradient-mesh)" }}
        aria-hidden
      />
      <div className="container-x relative pt-20 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-lg gradient-primary shadow-glow">
                <ShieldCheck className="h-5 w-5 text-white" />
              </span>
              <div className="leading-none">
                <div className="font-display text-lg font-extrabold">iSmart</div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-white/60">Digital Technology</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-white/70 max-w-sm leading-relaxed">
              Professional CCTV surveillance, enterprise networking, access control and smart infrastructure — trusted across Nigeria.
            </p>
            <form
              className="mt-6 flex items-center gap-2 rounded-full glass p-1.5 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Get updates in your inbox"
                className="flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-white hover:scale-105 transition-transform">
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: site.socials.facebook, icon: Facebook },
                { href: site.socials.instagram, icon: Instagram },
                { href: site.socials.linkedin, icon: Linkedin },
                { href: site.socials.twitter, icon: Twitter },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-primary hover:text-white hover:border-primary transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <FooterCol title="Company" items={nav.slice(0, 6).map(n => ({ label: n.label, to: n.to }))} />
          <FooterCol title="Solutions" items={solutions.slice(0, 8).map(s => ({ label: s.title, to: "/solutions" }))} />
          <FooterCol title="Brands" items={brands.slice(0, 6).map(b => ({ label: b.name, to: "/brands" }))} />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 border-y border-white/10 py-6">
          <ContactRow icon={MapPin} label="Head Office" value={site.address} />
          <ContactRow icon={Phone} label="Call us" value={site.phone} href={site.phoneLink} />
          <ContactRow icon={Mail} label="Email" value={site.email} href={site.emailLink} />
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} iSmart Digital Technology Ltd. All rights reserved.</p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold tracking-wider uppercase text-white/90">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-sm text-white/60 hover:text-primary transition-colors">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</div>
        <div className="text-sm text-white/85 leading-snug">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="hover:text-white transition-colors">{inner}</a> : inner;
}

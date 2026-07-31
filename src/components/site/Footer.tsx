import { Link } from "@tanstack/react-router";
import {
  Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Clock, Send, ShieldCheck, MessageCircle,
} from "lucide-react";
import { useSite } from "@/lib/cms";

const company = [
  { label: "About Us", to: "/about" },
  { label: "Why Choose Us", to: "/industries" },
  { label: "Careers", to: "/contact" },
  { label: "Blog", to: "/blog" },
];

const solutionLinks = [
  "CCTV Surveillance", "Access Control", "Networking", "Time Attendance", "Structured Cabling", "Technical Support",
];

const brandLinks = ["Tiandy", "Ubiquiti", "Mikrotik", "Cisco", "Bosch"];

export function Footer() {
  const site = useSite();
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" aria-hidden />
      <div className="container-x relative pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.7fr_1.1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-start gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg gradient-primary shadow-glow">
                <ShieldCheck className="h-5 w-5 text-white" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-extrabold">
                  i<span className="text-primary">Smart</span>
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wide text-primary">
                  Digital Technology
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/60">
              Smart Security. Intelligent Networking. Reliable Solutions.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { href: site.socials.facebook, icon: Facebook },
                { href: site.socials.instagram, icon: Instagram },
                { href: site.socials.linkedin, icon: Linkedin },
                { href: site.whatsappLink, icon: MessageCircle },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white/70 hover:bg-primary hover:text-white transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company">
            {company.map((c) => (
              <li key={c.label}>
                <Link to={c.to} className="text-xs text-white/60 hover:text-primary transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Solutions">
            {solutionLinks.map((s) => (
              <li key={s}>
                <Link to="/solutions" className="text-xs text-white/60 hover:text-primary transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Brands">
            {brandLinks.map((b) => (
              <li key={b}>
                <Link to="/brands" className="text-xs text-white/60 hover:text-primary transition-colors">
                  {b}
                </Link>
              </li>
            ))}
          </FooterCol>

          <div>
            <h3 className="font-display text-sm font-bold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <ContactRow icon={Phone} value={site.phone} href={site.phoneLink} />
              <ContactRow icon={Mail} value={site.email} href={site.emailLink} />
              <ContactRow icon={MapPin} value="Nigeria" />
              <ContactRow icon={Clock} value={site.hours} />
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white">Newsletter</h3>
            <p className="mt-2 text-xs text-white/60">Subscribe for updates and latest offers.</p>
            <form className="mt-4 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-md bg-white/8 px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md gradient-primary text-white hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>


        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/45 md:flex-row md:pr-24">
          <p>© {new Date().getFullYear()} iSmart Digital Technology. All Rights Reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/resources" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to="/resources" className="hover:text-white transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function ContactRow({ icon: Icon, value, href }: { icon: typeof Mail; value: string; href?: string }) {
  const inner = (
    <span className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="text-xs leading-snug text-white/65">{value}</span>
    </span>
  );
  return <li>{href ? <a href={href} className="hover:text-white transition-colors">{inner}</a> : inner}</li>;
}

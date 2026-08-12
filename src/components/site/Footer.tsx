import { Link } from "@tanstack/react-router";
import {
  Mail, MapPin, Phone, Clock, Send, MessageCircle,
} from "lucide-react";
import { useSite, useSocialLinks, useWhatsAppNumbers } from "@/lib/cms";
import { SocialIcons } from "@/components/site/SocialIcons";
import logoUrl from "@/assets/ismart-logo.png";


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
  const socials = useSocialLinks();
  const whatsapps = useWhatsAppNumbers().filter((w) => w.show_on_site);
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" aria-hidden />
      <div className="container-x relative pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.7fr_1.1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-glow" aria-label="iSmart Digital Tech — home">
              <img
                src={logoUrl}
                alt="iSmart Digital Tech Ltd — Smart Solutions, Digital Future"
                width={180}
                height={58}
                loading="lazy"
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/60">
              Smart Security. Intelligent Networking. Reliable Solutions.
            </p>
            <SocialIcons className="mt-6" links={socials} whatsappLink={site.whatsappLink} variant="dark" />
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
              {whatsapps.map((w) => (
                <ContactRow
                  key={w.id}
                  icon={MessageCircle}
                  value={w.number}
                  href={`https://wa.me/${w.number.replace(/[^0-9]/g, "")}`}
                />
              ))}
              <ContactRow icon={Mail} value={site.email} href={site.emailLink} />
              <ContactRow icon={MapPin} value={site.address} href={site.mapsPlaceUrl || undefined} />
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

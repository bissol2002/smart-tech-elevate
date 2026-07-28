import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import dataCentre from "@/assets/data-centre.jpg";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to secure your business?",
  subtitle = "Get a free consultation and tailored quote from our engineering team — usually within 24 hours.",
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white py-20 md:py-28">
      <img src={dataCentre} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 gradient-dark opacity-90" aria-hidden />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full gradient-primary opacity-20 blur-3xl" aria-hidden />

      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-3xl font-display text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/75">{subtitle}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover-lift"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneLink}
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15"
          >
            <Phone className="h-4 w-4" /> Call {site.phone}
          </a>
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-white hover-lift"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

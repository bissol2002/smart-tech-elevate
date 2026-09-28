import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import productCctv from "@/assets/product-cctv.webp";
import productNetwork from "@/assets/product-network.webp";
import accessControl from "@/assets/access-control.webp";
import fiberOptic from "@/assets/fiber-optic.webp";
import controlRoom from "@/assets/control-room.webp";
import dataCentre from "@/assets/data-centre.webp";

const cards = [
  { title: "CCTV Surveillance", body: "High-definition IP cameras for complete security monitoring.", image: productCctv },
  { title: "Access Control", body: "Biometric, card & facial recognition access control systems.", image: accessControl },
  { title: "Time Attendance", body: "Smart attendance systems with advanced reporting features.", image: dataCentre },
  { title: "Networking", body: "Reliable networking solutions for businesses of all sizes.", image: productNetwork },
  { title: "Structured Cabling", body: "Professional data cabling for optimal performance.", image: fiberOptic },
  { title: "Technical Support", body: "Maintenance, troubleshooting & dedicated support services.", image: controlRoom },
];

export function Solutions() {
  return (
    <section className="bg-background pb-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-ink">Our Solutions</h2>
            <p className="mt-2 text-sm text-ink-soft">Comprehensive technology solutions tailored to your business needs.</p>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
          >
            View All Solutions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cards.map((c) => (
            <Link
              key={c.title}
              to="/solutions"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card hover-lift"
            >
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-sm font-bold text-ink">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-soft">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

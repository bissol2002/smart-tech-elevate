import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import controlRoom from "@/assets/control-room.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import productCctv from "@/assets/product-cctv.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";
import dataCentre from "@/assets/data-centre.jpg";

const items = [
  { title: "Corporate CCTV Installation", image: controlRoom },
  { title: "Enterprise Network Setup", image: productNetwork },
  { title: "School Access Control", image: accessControl },
  { title: "Office Infrastructure", image: fiberOptic },
  { title: "Industrial Surveillance", image: productCctv },
  { title: "Data Center Cabling", image: dataCentre },
];

export function Projects() {
  return (
    <section className="bg-background pb-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-ink">Featured Projects</h2>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
          >
            View All Projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((p) => (
            <Link
              key={p.title}
              to="/projects"
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card hover-lift"
            >
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-3 text-center text-[11px] font-semibold text-ink group-hover:text-primary transition-colors">
                {p.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import controlRoom from "@/assets/control-room.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import accessControl from "@/assets/access-control.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";

const industries = [
  { title: "Residential", sub: "Homes & Estates", image: productCctv },
  { title: "Commercial", sub: "Offices & Buildings", image: dataCentre },
  { title: "Education", sub: "Schools & Campuses", image: accessControl },
  { title: "Healthcare", sub: "Hospitals & Clinics", image: controlRoom },
  { title: "Industrial", sub: "Factories & Plants", image: fiberOptic },
  { title: "Government", sub: "Public Institutions", image: productNetwork },
];

export function IndustriesRow() {
  return (
    <section aria-labelledby="industries-heading" className="pb-14 md:pb-20">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-center">
        <div className="min-w-0">
          <h2 id="industries-heading" className="font-display text-2xl md:text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink">
            Solutions designed for
            <br />
            <span className="text-primary">every environment</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            From homes to enterprises, we provide tailored solutions that fit your
            environment, needs and budget.
          </p>
          <Link
            to="/industries"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:gap-3 transition-all"
          >
            Explore all industries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {industries.map((i) => (
            <li key={i.title} className="w-40 shrink-0 snap-start lg:w-auto">
              <Link
                to="/industries"
                className="group relative block h-56 overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <img
                  src={i.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent transition group-hover:from-night" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block font-display text-sm font-bold text-white">{i.title}</span>
                  <span className="mt-0.5 block text-[11px] text-white/75">{i.sub}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-lime opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

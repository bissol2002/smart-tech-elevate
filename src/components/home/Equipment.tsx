import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import productCctv from "@/assets/product-cctv.jpg";
import productNetwork from "@/assets/product-network.jpg";
import accessControl from "@/assets/access-control.jpg";
import controlRoom from "@/assets/control-room.jpg";
import dataCentre from "@/assets/data-centre.jpg";
import fiberOptic from "@/assets/fiber-optic.jpg";

const categories = [
  { title: "Network Cameras", body: "IP cameras for every environment.", image: productCctv, q: "camera" },
  { title: "PTZ Cameras", body: "Pan-tilt-zoom coverage for wide areas.", image: controlRoom, q: "ptz" },
  { title: "NVR", body: "Network video recorders for 24/7 recording.", image: dataCentre, q: "nvr" },
  { title: "Solar Cameras", body: "Off-grid surveillance powered by the sun.", image: fiberOptic, q: "solar" },
  { title: "Access Control", body: "Biometric, RFID and smart access.", image: accessControl, q: "access" },
  { title: "Networking", body: "Switches, routers and access points.", image: productNetwork, q: "network" },
];

export function Equipment() {
  return (
    <section aria-labelledby="equipment-heading" className="pb-14 md:pb-20">
      <div className="container-x">
        <div className="text-center">
          <h2
            id="equipment-heading"
            className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-ink"
          >
            Professional-grade <span className="text-primary">equipment</span>
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-lime" aria-hidden />
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((c) => (
            <li key={c.title}>
              <Link
                to="/products"
                search={{ q: c.q } as never}
                className="group flex h-full flex-col border border-border bg-card transition hover:border-primary/60 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

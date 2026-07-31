import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCms } from "@/lib/cms";
import { getIcon } from "@/lib/icon-map";

export function Industries() {
  const { industries } = useCms();
  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Industries we serve</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
            Purpose-built for every sector
          </h2>
          <p className="mt-4 text-ink-soft">
            Every industry has unique security, compliance and connectivity needs. We tailor deployments to yours.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((i) => {
            const Icon = i.icon;
            return (
              <Link
                key={i.slug}
                to="/industries"
                className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover-lift shadow-card"
              >
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${i.accent}`} />
                <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 font-display text-base font-bold text-ink">{i.title}</h3>
                <p className="relative mt-1.5 text-sm text-ink-soft leading-relaxed line-clamp-2">{i.blurb}</p>
                <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

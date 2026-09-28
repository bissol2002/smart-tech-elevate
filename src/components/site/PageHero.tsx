import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import bgAbstract from "@/assets/bg-abstract.webp";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
}

export function PageHero({ eyebrow, title, subtitle, crumbs = [] }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white pt-28 pb-16 md:pt-40 md:pb-24">
      <img
        src={bgAbstract}
        alt=""
        aria-hidden
        decoding="async"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 gradient-dark opacity-90" aria-hidden />
      <div className="absolute inset-0 gradient-mesh opacity-70" aria-hidden />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-white/60 mb-6">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {c.to ? (
                <Link to={c.to} className="hover:text-primary">{c.label}</Link>
              ) : (
                <span className="text-white/85">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

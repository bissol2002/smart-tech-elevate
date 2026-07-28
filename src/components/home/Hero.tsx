import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Star, Users, MousePointer2 } from "lucide-react";
import teamHero from "@/assets/team-hero.png.asset.json";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-night text-white pt-24 md:pt-28">
      {/* Team background */}
      <img
        src={teamHero.url}
        alt="The iSmart Digital Technology team showcasing Tiandy CCTV and network video recorder products"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Diagonal green overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.20 0.03 155 / 0.92) 0%, oklch(0.20 0.03 155 / 0.78) 40%, oklch(0.52 0.16 152 / 0.35) 70%, oklch(0.20 0.03 155 / 0.55) 100%)",
        }}
        aria-hidden
      />
      {/* Mesh accents */}
      <div className="absolute inset-0 gradient-mesh opacity-70" aria-hidden />
      {/* Geometric shapes */}
      <div className="absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-slow" aria-hidden />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-primary-dark/25 blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }} aria-hidden />

      {/* Grid pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="container-x relative flex min-h-[calc(100svh-6rem)] flex-col justify-center py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 animate-fade-up">
            <Award className="h-3.5 w-3.5 text-primary" />
            Major Tiandy Distributor · Nigeria
          </div>

          <h1
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Securing Businesses
            <br />
            Through{" "}
            <span className="relative">
              <span className="text-gradient">Intelligent</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" fill="none">
                <path d="M2 8 Q 75 2, 150 5 T 298 4" stroke="url(#u)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <defs>
                  <linearGradient id="u" x1="0" x2="1">
                    <stop stopColor="oklch(0.66 0.18 148)" />
                    <stop offset="1" stopColor="oklch(0.52 0.16 152)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            Technology
          </h1>

          <p
            className="mt-6 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Professional CCTV surveillance, enterprise networking, access control, time attendance,
            structured cabling and smart infrastructure solutions — engineered for Nigerian enterprises.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover-lift"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["EO", "AB", "TA", "CN"].map((i) => (
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-[11px] font-bold ring-2 ring-night">
                    {i}
                  </span>
                ))}
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-1 font-semibold text-white">4.9</span>
                </div>
                <div className="text-white/60">From 200+ clients</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Users className="h-4 w-4 text-primary" />
              <span><span className="font-semibold text-white">500+</span> happy customers across Nigeria</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <MousePointer2 className="h-4 w-4 animate-scroll-bounce" />
      </div>
    </section>
  );
}

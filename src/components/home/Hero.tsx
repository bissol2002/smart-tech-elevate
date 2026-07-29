import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, BadgeCheck } from "lucide-react";
import teamHero from "@/assets/team-hero.png.asset.json";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {/* Team photo — anchored right */}
      <img
        src={teamHero.url}
        alt="The iSmart Digital Technology team showcasing Tiandy CCTV and network video recorder products"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />

      {/* Green wash + left fade so the copy stays readable */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, oklch(0.22 0.05 155 / 0.97) 0%, oklch(0.24 0.07 152 / 0.94) 32%, oklch(0.30 0.09 152 / 0.60) 52%, oklch(0.30 0.09 152 / 0.12) 72%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
      {/* Diagonal accent shard */}
      <div
        className="absolute -left-24 top-0 h-full w-[55%] opacity-25"
        aria-hidden
        style={{
          background: "linear-gradient(115deg, transparent 40%, oklch(0.66 0.18 148 / 0.55) 100%)",
          clipPath: "polygon(0 0, 100% 0, 62% 100%, 0% 100%)",
        }}
      />

      <div className="container-x relative pt-28 pb-28 md:pt-36 md:pb-40 lg:pb-48">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.06] tracking-tight animate-fade-up">
            Securing Businesses
            <br />
            Through Intelligent
            <br />
            <span className="text-primary">Technology</span>
          </h1>

          <p
            className="mt-6 max-w-lg text-sm md:text-base text-white/80 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Professional CCTV Surveillance, Access Control, Networking, Time Attendance,
            Structured Cabling and IT Infrastructure Solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 rounded-md gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover-lift"
            >
              Explore Solutions <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex -space-x-2">
              {["EO", "AB", "TA", "CN"].map((i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-[10px] font-bold ring-2 ring-white/70"
                >
                  {i}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="text-xs font-medium text-white/80">Trusted by 500+ Clients</div>
            </div>
          </div>
        </div>

        {/* Tiandy distributor badge */}
        <div className="hidden lg:block absolute right-6 bottom-28 rounded-xl bg-background px-6 py-4 text-center shadow-elevated">
          <div className="font-display text-xl font-extrabold text-primary">Tiandy</div>
          <div className="mt-0.5 text-xs font-semibold text-ink">Major</div>
          <div className="flex items-center justify-center gap-1 text-xs font-semibold text-ink">
            Distributor <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

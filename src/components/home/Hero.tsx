import { Link } from "@tanstack/react-router";
import { ArrowRight, Cctv, Fingerprint, Network, Headset, BadgeCheck } from "lucide-react";
import teamHero from "@/assets/team-hero.png.asset.json";

const capabilities = [
  { icon: Cctv, label: "CCTV &\nSurveillance" },
  { icon: Fingerprint, label: "Access\nControl" },
  { icon: Network, label: "Networking\nSolutions" },
  { icon: Headset, label: "Technical\nSupport" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <img
        src={teamHero.url}
        alt="The iSmart Digital Tech team holding Tiandy cameras and network video recorders"
        fetchPriority="high"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] opacity-90 md:opacity-100"
      />

      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, oklch(0.18 0.03 150 / 0.98) 0%, oklch(0.20 0.05 150 / 0.94) 34%, oklch(0.24 0.07 150 / 0.62) 54%, oklch(0.24 0.07 150 / 0.14) 74%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[62%] opacity-30"
        aria-hidden
        style={{
          background: "linear-gradient(115deg, transparent 45%, var(--lime) 140%)",
          clipPath: "polygon(0 0, 100% 0, 58% 100%, 0% 100%)",
        }}
      />

      <div className="container-x relative pt-28 pb-24 md:pt-36 md:pb-36 lg:pb-44">
        <div className="max-w-2xl">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-lime animate-fade-up"
          >
            iSmart Digital Tech Ltd
          </p>

          <h1 className="mt-4 font-display text-[2.1rem] leading-[1.05] font-extrabold uppercase tracking-tight sm:text-5xl lg:text-[3.6rem] animate-fade-up">
            Smart Solutions.
            <br />
            <span className="text-lime">Secure</span> Future.
          </h1>

          <p
            className="mt-5 max-w-lg text-sm md:text-base leading-relaxed text-white/80 animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            We design, supply, install and maintain intelligent security and networking
            solutions that protect people, property and performance.
          </p>

          <ul
            className="mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            {capabilities.map(({ icon: Icon, label }) => (
              <li key={label} className="min-w-0">
                <Icon className="h-6 w-6 text-lime" aria-hidden />
                <span className="mt-2 block whitespace-pre-line text-[11px] font-semibold uppercase tracking-wide text-white/85">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Link to="/quote" className="btn-lime justify-center px-6 py-3.5 text-xs uppercase sm:text-[13px]">
              Request a Security Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/solutions"
              className="btn-outline-light justify-center px-6 py-3.5 text-xs uppercase sm:text-[13px]"
            >
              Explore Solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-6 bottom-24 items-center gap-3 rounded-lg bg-background/95 px-5 py-3 shadow-elevated backdrop-blur">
          <BadgeCheck className="h-5 w-5 text-primary" aria-hidden />
          <div className="leading-tight">
            <div className="font-display text-sm font-extrabold text-ink">Tiandy Major Distributor</div>
            <div className="text-[11px] text-ink-soft">Authorised partner in Nigeria</div>
          </div>
        </div>
      </div>
    </section>
  );
}

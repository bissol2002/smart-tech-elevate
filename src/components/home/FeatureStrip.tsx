import { Link } from "@tanstack/react-router";
import { UserCheck, ShieldCheck, Zap, Clock, Headphones, ArrowRight } from "lucide-react";

const items = [
  { icon: UserCheck, title: "Certified Professionals", body: "Trained &\nExperienced Team" },
  { icon: ShieldCheck, title: "Quality Products", body: "Genuine &\nReliable Brands" },
  { icon: Zap, title: "Fast Installation", body: "On-time &\nEfficient" },
  { icon: Clock, title: "24/7 Support", body: "Always Here\nTo Help" },
];

export function FeatureStrip() {
  return (
    <section className="relative z-10 -mt-16 md:-mt-20">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-2xl bg-card shadow-elevated md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.35fr]">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-3 border-b border-border p-6 lg:border-b-0 lg:border-r">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-ink">{f.title}</div>
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </div>
            );
          })}

          <div className="relative flex flex-col justify-between gap-4 gradient-primary p-6 text-white">
            <div className="flex items-start gap-3">
              <Headphones className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="font-display text-sm font-bold">Need Help Choosing?</div>
                <p className="mt-1 text-xs leading-relaxed text-white/85">
                  Our experts are ready to help you find the right solution.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-between gap-3 rounded-full bg-night px-5 py-2.5 text-xs font-semibold text-white hover:bg-night-2 transition"
            >
              Contact Us Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to Secure Your Business?",
  subtitle = "Get in touch with our experts today for a free consultation.",
}: CTASectionProps) {
  return (
    <section className="pb-16">
      <div className="container-x">
        <div
          className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl px-8 py-9 text-white md:flex-row md:justify-between"
          style={{ background: "linear-gradient(100deg, oklch(0.24 0.06 155) 0%, oklch(0.32 0.10 152) 100%)" }}
        >
          <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden />
          <div className="relative flex items-center gap-4 text-center md:text-left">
            <span className="hidden sm:grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-tight">{title}</h2>
              <p className="mt-1 text-sm text-white/80">{subtitle}</p>
            </div>
          </div>
          <Link
            to="/quote"
            className="relative inline-flex items-center gap-2 rounded-md gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover-lift"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

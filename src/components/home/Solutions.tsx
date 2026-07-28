import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/solutions";

export function Solutions() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">What we do</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
              End-to-end security &<br />connectivity solutions
            </h2>
          </div>
          <p className="max-w-md text-ink-soft leading-relaxed">
            From single-camera installs to enterprise-wide surveillance and multi-site networks — we design, deploy and maintain systems that just work.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((s, idx) => {
            const Icon = s.icon;
            const featured = idx === 0;
            return (
              <Link
                key={s.slug}
                to="/solutions"
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover-lift shadow-card ${
                  featured ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/8 blur-2xl group-hover:bg-primary/20 transition-colors" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                </div>
                <h3 className={`relative mt-6 font-display font-bold text-ink ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {s.title}
                </h3>
                <p className={`relative mt-2 text-ink-soft leading-relaxed ${featured ? "text-base" : "text-sm"}`}>
                  {featured ? s.description : s.short}
                </p>
                {featured && (
                  <ul className="relative mt-4 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <li key={f} className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

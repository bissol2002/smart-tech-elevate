import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useCms } from "@/lib/cms";

export function Testimonials() {
  const { testimonials } = useCms();
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const total = testimonials.length;
  const prev = () => setI((v) => (v - 1 + total) % total);
  const next = () => setI((v) => (v + 1) % total);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Client testimonials</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
            Trusted by leaders across Nigeria
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card p-8 md:p-12">
            <Quote className="absolute top-6 right-6 h-24 w-24 text-primary/8" />
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-xl md:text-3xl font-semibold leading-snug text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-white font-bold shadow-glow">
                {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-semibold text-ink">{t.name}</div>
                <div className="text-sm text-ink-soft">{t.role} · {t.company}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Go to testimonial ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-4 bg-border"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={prev} className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-accent">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button aria-label="Next" onClick={next} className="grid h-11 w-11 place-items-center rounded-full gradient-primary text-white shadow-glow hover-lift">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

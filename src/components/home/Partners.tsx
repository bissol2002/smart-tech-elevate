import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCms } from "@/lib/cms";

export function Partners() {
  const { brands } = useCms();
  return (
    <section className="bg-background py-16">
      <div className="container-x">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-primary" />
          <h2 className="font-display text-xl md:text-2xl font-bold text-ink">Our Technology Partners</h2>
          <span className="h-px w-8 bg-primary" />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            aria-label="Previous partners"
            className="hidden md:grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-ink-soft hover:border-primary hover:text-primary transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-4">
              {[...brands, ...brands].map((b, i) => (
                <div
                  key={`${b.slug}-${i}`}
                  className="grid h-20 w-[190px] place-items-center rounded-xl border border-border bg-card shadow-soft"
                >
                  <span className="font-display text-lg font-extrabold tracking-tight" style={{ color: b.color }}>
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            aria-label="Next partners"
            className="hidden md:grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-ink-soft hover:border-primary hover:text-primary transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { useCms } from "@/lib/cms";

export function BrandStrip() {
  const { brands } = useCms();
  const list = brands.length ? brands : [];

  return (
    <section aria-labelledby="trusted-brands" className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-x">
        <div className="rounded-lg border border-border bg-card px-5 py-6 shadow-elevated">
          <h2
            id="trusted-brands"
            className="text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft"
          >
            Trusted by Leading Brands
          </h2>
          <div className="mt-5 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-10 md:gap-14">
              {[...list, ...list].map((b, i) => (
                <span
                  key={`${b.slug}-${i}`}
                  className="font-display text-lg md:text-xl font-extrabold uppercase tracking-tight whitespace-nowrap opacity-80 transition hover:opacity-100"
                  style={{ color: b.color }}
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

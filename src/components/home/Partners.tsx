import { brands } from "@/content/brands";

export function Partners() {
  const row = [...brands, ...brands]; // duplicate for seamless marquee
  return (
    <section className="relative border-y border-border bg-surface py-12">
      <div className="container-x">
        <div className="text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Technology Partners</div>
          <p className="mt-1.5 text-sm text-ink-soft">Certified and authorised across global enterprise brands</p>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-12 px-6">
          {row.map((b, i) => (
            <div
              key={`${b.slug}-${i}`}
              className="group flex items-center justify-center min-w-[160px] h-16 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
            >
              <span
                className="font-display text-2xl font-extrabold tracking-tight transition-colors"
                style={{ color: b.color }}
              >
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

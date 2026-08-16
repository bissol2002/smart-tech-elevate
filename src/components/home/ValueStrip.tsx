import { ShieldCheck, Award, LifeBuoy, MapPin, Layers } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Genuine Products", body: "Original and reliable equipment." },
  { icon: Award, title: "Certified Experts", body: "Professional technical expertise." },
  { icon: LifeBuoy, title: "Reliable Support", body: "Technical support you can depend on." },
  { icon: MapPin, title: "Nationwide Coverage", body: "Serving clients across Nigeria." },
  { icon: Layers, title: "Complete Solutions", body: "End-to-end security and networking." },
];

export function ValueStrip() {
  return (
    <section aria-label="Why work with iSmart" className="py-10 md:py-14">
      <div className="container-x">
        <ul className="grid divide-y divide-white/10 rounded-lg bg-night text-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
          {items.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex min-w-0 items-start gap-3 border-white/10 p-5 sm:border-b lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden />
              <div className="min-w-0">
                <div className="font-display text-[13px] font-bold uppercase tracking-wide">{title}</div>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Users, ClipboardCheck, Award, Headphones } from "lucide-react";
import { Counter } from "@/components/site/Counter";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: ClipboardCheck, value: 1000, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 10, suffix: "+", label: "Years Experience" },
  { icon: Headphones, value: 24, suffix: "/7", label: "Technical Support", static: "24/7" },
];

export function StatsBand() {
  return (
    <section className="pb-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl gradient-primary px-6 py-10 text-white shadow-glow">
          <div className="absolute inset-0 gradient-mesh opacity-40" aria-hidden />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/20">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center justify-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="font-display text-3xl font-extrabold leading-none">
                      {s.static ?? <Counter to={s.value} suffix={s.suffix} />}
                    </div>
                    <div className="mt-1.5 text-xs font-medium text-white/85">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

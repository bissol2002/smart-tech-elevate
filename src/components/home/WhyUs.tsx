import { BadgeCheck, Award, ShieldCheck, Zap, Headphones, Wallet } from "lucide-react";
import { Counter } from "@/components/site/Counter";
import controlRoom from "@/assets/control-room.jpg";

const stats = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 1000, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Technical Support" },
];

const features = [
  { icon: BadgeCheck, title: "Certified Engineers", body: "Cisco, Tiandy and manufacturer-certified installers on every project." },
  { icon: Award, title: "Premium Products", body: "Only genuine, warrantied hardware from trusted global brands." },
  { icon: ShieldCheck, title: "Extended Warranty", body: "Manufacturer plus 12-month iSmart workmanship guarantee." },
  { icon: Zap, title: "Fast Installation", body: "Small deployments live in days, enterprise rollouts in weeks." },
  { icon: Headphones, title: "After-Sales Support", body: "Priority helpdesk and on-site SLAs, nationwide." },
  { icon: Wallet, title: "Competitive Pricing", body: "Transparent quotes and payment plans for large deployments." },
];

export function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white py-24 md:py-32">
      <img src={controlRoom} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 gradient-dark opacity-90" aria-hidden />
      <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why choose iSmart</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            A decade of engineering excellence
          </h2>
          <p className="mt-4 text-white/70">
            Numbers matter — but so does the promise behind them. Here's what a partnership with iSmart delivers.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="relative overflow-hidden rounded-2xl glass p-6 text-center">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/70">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl glass p-6 hover:bg-white/10 transition">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

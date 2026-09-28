import { BadgeCheck, Award, ShieldCheck, Zap, Headphones, Wallet } from "lucide-react";
import controlRoom from "@/assets/control-room.webp";

const features = [
  { icon: BadgeCheck, title: "Professional Engineering", body: "Systems designed and installed by trained technical staff." },
  { icon: Award, title: "Premium Products", body: "Only genuine, warrantied hardware from trusted global brands." },
  { icon: ShieldCheck, title: "Tailored Solutions", body: "Designs matched to your environment, risk profile and budget." },
  { icon: Zap, title: "End-to-End Delivery", body: "Assessment, design, supply, installation and configuration." },
  { icon: Headphones, title: "Reliable Support", body: "Ongoing maintenance and technical support you can depend on." },
  { icon: Wallet, title: "Customer-Focused Service", body: "Transparent quotes and clear communication at every stage." },
];

export function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white py-20 md:py-28">
      <img src={controlRoom} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 gradient-dark opacity-90" aria-hidden />
      <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why choose iSmart</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Engineering that earns trust
          </h2>
          <p className="mt-4 text-white/70">
            What a partnership with iSmart Digital Tech delivers, from first assessment to long-term support.
          </p>
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

import {
  GraduationCap, Hotel, HeartPulse, Landmark, Building2, Church,
  Factory, ShoppingBag, Home, Briefcase, type LucideIcon,
} from "lucide-react";

export interface Industry {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  accent: string; // tailwind class fragment
}

export const industries: Industry[] = [
  { slug: "schools", title: "Schools", blurb: "Campus-wide safety, attendance and network coverage.", icon: GraduationCap, accent: "from-emerald-500/20 to-emerald-500/5" },
  { slug: "hotels", title: "Hotels", blurb: "Guest safety, keycard access and hospitality-grade Wi-Fi.", icon: Hotel, accent: "from-amber-500/20 to-amber-500/5" },
  { slug: "hospitals", title: "Hospitals", blurb: "Ward monitoring, staff tracking and secure networks.", icon: HeartPulse, accent: "from-rose-500/20 to-rose-500/5" },
  { slug: "banks", title: "Banks", blurb: "ATM surveillance, vault control and PCI-DSS aligned networks.", icon: Landmark, accent: "from-blue-500/20 to-blue-500/5" },
  { slug: "government", title: "Government", blurb: "Multi-site perimeter, ANPR and command-centre integration.", icon: Building2, accent: "from-indigo-500/20 to-indigo-500/5" },
  { slug: "churches", title: "Churches", blurb: "Congregation coverage, live-stream and offering security.", icon: Church, accent: "from-violet-500/20 to-violet-500/5" },
  { slug: "factories", title: "Factories", blurb: "Perimeter, production-line and hazard-zone monitoring.", icon: Factory, accent: "from-orange-500/20 to-orange-500/5" },
  { slug: "retail", title: "Retail", blurb: "Loss prevention, people counting and heat mapping.", icon: ShoppingBag, accent: "from-pink-500/20 to-pink-500/5" },
  { slug: "estates", title: "Residential Estates", blurb: "Gatehouse control, ANPR and estate-wide surveillance.", icon: Home, accent: "from-teal-500/20 to-teal-500/5" },
  { slug: "offices", title: "Corporate Offices", blurb: "Access control, meeting-room AV and secure networking.", icon: Briefcase, accent: "from-cyan-500/20 to-cyan-500/5" },
];

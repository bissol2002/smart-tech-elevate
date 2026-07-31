import {
  Camera, Network, Fingerprint, Clock, Cable, Radio, Wifi, Video, Volume2, Server,
  Database, Wrench, Headphones, GraduationCap, Hotel, HeartPulse, Landmark, Building2,
  Church, Factory, ShoppingBag, Home, Briefcase, Shield, Lock, Cpu, Cloud, Monitor,
  Truck, Users, Zap, Circle, type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Camera, Network, Fingerprint, Clock, Cable, Radio, Wifi, Video, Volume2, Server,
  Database, Wrench, Headphones, GraduationCap, Hotel, HeartPulse, Landmark, Building2,
  Church, Factory, ShoppingBag, Home, Briefcase, Shield, Lock, Cpu, Cloud, Monitor,
  Truck, Users, Zap, Circle,
  // lucide display-name aliases used by seeded content
  FingerprintPattern: Fingerprint,
};

export const iconNames = Object.keys(iconMap).filter((n) => n !== "FingerprintPattern").sort();

export function getIcon(name: string | undefined | null): LucideIcon {
  return (name && iconMap[name]) || Circle;
}

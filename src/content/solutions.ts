import {
  Camera, Network, Fingerprint, Clock, Cable, Radio, Wifi,
  Video, Volume2, Server, Database, Wrench, Headphones,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const solutions: Solution[] = [
  {
    slug: "cctv-surveillance",
    title: "CCTV Surveillance",
    short: "AI cameras with 4K clarity, night vision and smart analytics.",
    description:
      "Deploy enterprise-grade Tiandy AI cameras with facial recognition, license-plate capture, perimeter intrusion and cloud-managed NVRs — engineered for reliability across every site.",
    icon: Camera,
    features: ["AI analytics", "4K resolution", "24/7 monitoring", "Cloud NVR"],
  },
  {
    slug: "networking",
    title: "Enterprise Networking",
    short: "Cisco, Mikrotik and Ubiquiti networks built for uptime.",
    description:
      "Design, deploy and manage LAN, WAN and campus networks with layered security, QoS and observability — from single-office to multi-branch enterprises.",
    icon: Network,
    features: ["Cisco certified", "SD-WAN ready", "Zero-trust", "99.99% uptime"],
  },
  {
    slug: "access-control",
    title: "Access Control",
    short: "Biometric, RFID and mobile access with full audit trail.",
    description:
      "Multi-factor entry systems for offices, data centres and residential estates — integrated with visitor management, HR and CCTV for complete situational awareness.",
    icon: Fingerprint,
    features: ["Biometric + RFID", "Mobile credentials", "Anti-passback", "HR sync"],
  },
  {
    slug: "time-attendance",
    title: "Time & Attendance",
    short: "Automated staff tracking with payroll integration.",
    description:
      "Cloud-based attendance with fingerprint, face and mobile check-in — plug directly into your payroll and HR platform for accurate, tamper-proof reporting.",
    icon: Clock,
    features: ["Face + fingerprint", "Payroll ready", "Shift scheduling", "Live reports"],
  },
  {
    slug: "structured-cabling",
    title: "Structured Cabling",
    short: "Certified Cat6/6A copper and MPO trunk cabling.",
    description:
      "TIA/EIA-standard cabling infrastructure with full certification reports, labeled patch panels and lifetime warranty on select components.",
    icon: Cable,
    features: ["Cat6 / Cat6A", "Certified & tested", "Neat cable management", "Lifetime warranty"],
  },
  {
    slug: "fiber-optics",
    title: "Fiber Optics",
    short: "Single-mode & multi-mode fiber for campuses and industry.",
    description:
      "OSP and ISP fiber design, fusion splicing, OTDR testing and commissioning for high-speed backbone links up to 100 Gbps.",
    icon: Radio,
    features: ["Fusion splicing", "OTDR certified", "OSP + ISP", "Up to 100 Gbps"],
  },
  {
    slug: "wireless-bridges",
    title: "Wireless Bridges",
    short: "Long-range PtP and PtMP links up to 20+ km.",
    description:
      "Licensed and unlicensed radio links to extend connectivity across sites, remote camps and hard-to-cable locations with carrier-grade throughput.",
    icon: Wifi,
    features: ["PtP + PtMP", "Up to 20 km", "5 GHz / 60 GHz", "Weatherproof"],
  },
  {
    slug: "video-intercom",
    title: "Video Intercom",
    short: "Two-way video door entry for homes and offices.",
    description:
      "IP video door stations with mobile answering, cloud recording and integration with access control and lift-call systems.",
    icon: Video,
    features: ["Mobile answering", "Cloud recording", "Lift integration", "Wide-angle HD"],
  },
  {
    slug: "pa-systems",
    title: "PA & Audio Systems",
    short: "Zoned public address for schools, malls and factories.",
    description:
      "IP paging, background music and emergency evacuation announcement systems with priority routing and battery backup.",
    icon: Volume2,
    features: ["IP paging", "Zoned audio", "Emergency EVAC", "Battery backup"],
  },
  {
    slug: "server-installation",
    title: "Server Installation",
    short: "Physical & virtual server deployment and hardening.",
    description:
      "Rack-and-stack, hypervisor deployment (VMware, Proxmox, Hyper-V), backup and disaster-recovery configuration for on-prem workloads.",
    icon: Server,
    features: ["Bare-metal + virtual", "Backup ready", "DR configured", "Hardened OS"],
  },
  {
    slug: "data-centre",
    title: "Data Centre Solutions",
    short: "End-to-end small & medium data centre build-out.",
    description:
      "Cooling, UPS, PDU, containment, environmental monitoring and structured cabling — designed to Uptime Institute Tier II/III principles.",
    icon: Database,
    features: ["Cooling + UPS", "Containment", "Env. monitoring", "Tier II / III"],
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    short: "Scheduled preventive maintenance that keeps systems live.",
    description:
      "Quarterly and annual SLAs with on-site engineers, spares management and monthly health reports for every deployed system.",
    icon: Wrench,
    features: ["Quarterly SLA", "On-site engineers", "Spares stocked", "Health reports"],
  },
  {
    slug: "technical-support",
    title: "24/7 Technical Support",
    short: "Round-the-clock helpdesk with rapid response.",
    description:
      "Priority ticketing, remote diagnostics and guaranteed on-site response for mission-critical clients — anywhere in Nigeria.",
    icon: Headphones,
    features: ["24 / 7 helpdesk", "Remote diagnostics", "On-site SLA", "Nationwide"],
  },
];

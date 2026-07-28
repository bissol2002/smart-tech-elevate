export interface Project {
  slug: string;
  title: string;
  category: "CCTV" | "Networking" | "Access Control" | "Fiber" | "Data Centre";
  client: string;
  location: string;
  year: number;
  summary: string;
  stats: { label: string; value: string }[];
  image: string; // asset key
}

// image keys reference imports handled in the component
export const projects: Project[] = [
  {
    slug: "hospitality-group-lagos",
    title: "5-Star Hotel — Enterprise CCTV & Network",
    category: "CCTV",
    client: "Hospitality Group",
    location: "Lagos, Nigeria",
    year: 2025,
    summary: "220 Tiandy AI cameras, redundant NVR cluster and full-property Wi-Fi 6 with guest portal and PMS integration.",
    stats: [{ label: "Cameras", value: "220" }, { label: "Access points", value: "180" }, { label: "Uptime", value: "99.99%" }],
    image: "controlRoom",
  },
  {
    slug: "manufacturing-plant-ogun",
    title: "Manufacturing Plant — Perimeter & Production Surveillance",
    category: "CCTV",
    client: "FMCG Manufacturer",
    location: "Agbara, Ogun State",
    year: 2024,
    summary: "180-camera deployment with thermal perimeter cameras, ANPR at all gates and integrated fire-panel escalation.",
    stats: [{ label: "Cameras", value: "180" }, { label: "Gates", value: "6" }, { label: "Hectares", value: "12" }],
    image: "productCctv",
  },
  {
    slug: "commercial-bank-nationwide",
    title: "Commercial Bank — Multi-Branch Network Upgrade",
    category: "Networking",
    client: "Tier-1 Commercial Bank",
    location: "42 branches nationwide",
    year: 2024,
    summary: "Cisco Meraki SD-WAN rollout across 42 branches, dual-carrier failover and centralised monitoring.",
    stats: [{ label: "Branches", value: "42" }, { label: "Devices", value: "560" }, { label: "MTTR", value: "< 15 min" }],
    image: "productNetwork",
  },
  {
    slug: "hospital-abuja",
    title: "Tertiary Hospital — Access Control & Attendance",
    category: "Access Control",
    client: "Federal Hospital",
    location: "Abuja",
    year: 2025,
    summary: "Biometric access for 38 restricted zones, integrated with staff attendance and HR payroll across 1,400 staff.",
    stats: [{ label: "Zones", value: "38" }, { label: "Staff", value: "1,400" }, { label: "Terminals", value: "62" }],
    image: "accessControl",
  },
  {
    slug: "campus-fiber-vi",
    title: "Corporate Campus — Fiber Backbone",
    category: "Fiber",
    client: "Financial Services HQ",
    location: "Victoria Island, Lagos",
    year: 2024,
    summary: "48-strand single-mode fiber backbone across 6 buildings with fully certified OTDR reports and redundant paths.",
    stats: [{ label: "Fiber strands", value: "48" }, { label: "Buildings", value: "6" }, { label: "Throughput", value: "40 Gbps" }],
    image: "fiber",
  },
  {
    slug: "data-centre-ph",
    title: "Regional Data Centre Build-Out",
    category: "Data Centre",
    client: "Cloud Services Provider",
    location: "Port Harcourt",
    year: 2023,
    summary: "Tier-III aligned 60-rack facility with N+1 cooling, dual UPS, containment and environmental monitoring.",
    stats: [{ label: "Racks", value: "60" }, { label: "Cooling", value: "N+1" }, { label: "PUE", value: "1.5" }],
    image: "dataCentre",
  },
];

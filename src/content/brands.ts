export interface Brand {
  slug: string;
  name: string;
  category: string;
  description: string;
  tagline: string;
  color: string; // hex for accent
}

export const brands: Brand[] = [
  {
    slug: "tiandy",
    name: "Tiandy",
    category: "AI CCTV & Surveillance",
    tagline: "Major distributor in Nigeria",
    description:
      "Global top-5 AI video surveillance manufacturer. iSmart is Tiandy's major distributor for Nigeria — full range from smart dome cameras to enterprise NVRs and VMS platforms.",
    color: "#00A651",
  },
  {
    slug: "cisco",
    name: "Cisco",
    category: "Enterprise Networking",
    tagline: "Certified partner",
    description:
      "Cisco Catalyst switches, Meraki cloud networking, ISR routers and enterprise firewalls — designed, procured and commissioned by certified engineers.",
    color: "#049fd9",
  },
  {
    slug: "ubiquiti",
    name: "Ubiquiti",
    category: "Wireless & UniFi",
    tagline: "Authorized reseller",
    description:
      "UniFi WiFi, UISP fixed-wireless, EdgeMAX routers and airFiber long-range links for scalable, controller-managed networks.",
    color: "#0559C9",
  },
  {
    slug: "bosch",
    name: "Bosch",
    category: "Fire, PA & Security",
    tagline: "Systems integrator",
    description:
      "Bosch fire detection, professional PA/EVAC and premium IP video — engineered for hotels, malls, factories and public buildings.",
    color: "#E20015",
  },
  {
    slug: "mikrotik",
    name: "Mikrotik",
    category: "Routing & ISP",
    tagline: "Consultant certified",
    description:
      "RouterOS switching, hotspot billing, MPLS and BGP for ISPs, campuses and multi-branch enterprises across Nigeria.",
    color: "#293239",
  },
  {
    slug: "hikvision",
    name: "Hikvision",
    category: "CCTV Alternative",
    tagline: "Value tier",
    description:
      "Cost-effective surveillance for residential and small-business deployments — supplied and installed with full manufacturer warranty.",
    color: "#CC0000",
  },
  {
    slug: "dahua",
    name: "Dahua",
    category: "CCTV & Intercom",
    tagline: "Integration partner",
    description:
      "Dahua IP cameras, video intercom and access control — integrated into unified surveillance platforms.",
    color: "#DA251C",
  },
  {
    slug: "zkteco",
    name: "ZKTeco",
    category: "Biometrics",
    tagline: "Authorised supplier",
    description:
      "Biometric attendance and access-control terminals — the go-to for HR-integrated time-tracking systems.",
    color: "#0066B3",
  },
];

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    slug: "ai-cctv-2026-nigeria",
    title: "Why AI CCTV is now the baseline for Nigerian enterprises in 2026",
    excerpt: "Traditional analog and non-AI IP surveillance is finally being retired. Here's what modern AI cameras deliver that changes the security equation.",
    date: "2026-06-14",
    category: "CCTV",
    readTime: "6 min",
  },
  {
    slug: "picking-network-switch",
    title: "Picking the right enterprise network switch: Cisco vs Mikrotik vs Ubiquiti",
    excerpt: "A pragmatic buyer's guide for IT leaders comparing the three most-deployed switch families in Nigeria.",
    date: "2026-05-02",
    category: "Networking",
    readTime: "9 min",
  },
  {
    slug: "access-control-tips",
    title: "5 access-control mistakes we still see in Lagos office buildings",
    excerpt: "From badge-sharing to unpatched controllers, these are the most common — and most fixable — access issues we find on audits.",
    date: "2026-03-21",
    category: "Access Control",
    readTime: "5 min",
  },
  {
    slug: "fiber-vs-wireless",
    title: "Fiber vs long-range wireless: how to choose for multi-site campuses",
    excerpt: "When your buildings are 500m or 5km apart, the answer isn't always the same. A cost-and-reliability breakdown.",
    date: "2026-02-08",
    category: "Fiber",
    readTime: "7 min",
  },
  {
    slug: "data-centre-checklist",
    title: "A practical build-checklist for your first on-prem data centre",
    excerpt: "Cooling, power, containment, monitoring — the non-negotiables for keeping your servers alive.",
    date: "2026-01-12",
    category: "Data Centre",
    readTime: "8 min",
  },
];

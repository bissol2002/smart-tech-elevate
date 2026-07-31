export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  phone: string;
  phoneLink: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  emailLink: string;
  address: string;
  hours: string;
  socials: { facebook: string; instagram: string; linkedin: string; twitter: string };
}

export interface SolutionRow {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  features: string[];
  sort: number;
}

export interface IndustryRow {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  icon: string;
  accent: string;
  sort: number;
}

export interface BrandRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  color: string;
  sort: number;
}

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: number;
  summary: string;
  stats: { label: string; value: string }[];
  image: string;
  sort: number;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  sort: number;
}

export interface TeamRow {
  id: string;
  name: string;
  role: string;
  initials: string;
  sort: number;
}

export interface FaqRow {
  id: string;
  q: string;
  a: string;
  sort: number;
}

export interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  category: string;
  read_time: string;
  published: boolean;
  sort: number;
}

export interface CmsContent {
  site: SiteSettings;
  solutions: SolutionRow[];
  industries: IndustryRow[];
  brands: BrandRow[];
  projects: ProjectRow[];
  testimonials: TestimonialRow[];
  team: TeamRow[];
  faqs: FaqRow[];
  posts: PostRow[];
}

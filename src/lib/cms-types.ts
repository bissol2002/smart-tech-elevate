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
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  mapsEmbedUrl: string;
  mapsPlaceUrl: string;
  socials: { facebook: string; instagram: string; linkedin: string; twitter: string };
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "whatsapp";

export interface SocialLinkRow {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
  sort: number;
}

export interface WhatsAppNumberRow {
  id: string;
  label: string;
  number: string;
  notify: boolean;
  show_on_site: boolean;
  sort: number;
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

export interface ProjectCategoryRow {
  id: string;
  slug: string;
  name: string;
  sort: number;
}

export interface ProjectImageRow {
  id: string;
  project_id: string;
  url: string;
  alt: string;
  sort: number;
}

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_id: string | null;
  client: string;
  location: string;
  year: number;
  summary: string;
  description: string;
  completion_date: string | null;
  cover_url: string;
  archived: boolean;
  stats: { label: string; value: string }[];
  image: string;
  sort: number;
  images: ProjectImageRow[];
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

export interface HomepageImageRow {
  id: string;
  category_key: string;
  category_name: string;
  description: string;
  image_url: string | null;
  alt_text: string;
  sort: number;
}

export interface CmsContent {
  site: SiteSettings;
  socialLinks: SocialLinkRow[];
  whatsappNumbers: WhatsAppNumberRow[];
  solutions: SolutionRow[];
  industries: IndustryRow[];
  brands: BrandRow[];
  projectCategories: ProjectCategoryRow[];
  projects: ProjectRow[];
  testimonials: TestimonialRow[];
  team: TeamRow[];
  faqs: FaqRow[];
  posts: PostRow[];
  homepageImages: HomepageImageRow[];
}

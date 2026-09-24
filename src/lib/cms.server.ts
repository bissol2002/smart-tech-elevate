import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CmsContent, ProjectImageRow, SiteSettings } from "./cms-types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const fallbackSite: SiteSettings = {
  name: "iSmart Digital Technology",
  shortName: "iSmart",
  tagline: "Securing Businesses Through Intelligent Technology",
  domain: "ismartdigitaltech.com",
  phone: "+234 812 426 5051",
  phoneLink: "tel:+2348124265051",
  whatsapp: "+2347048693693",
  whatsappLink: "https://wa.me/2347048693693",
  email: "ismartdigitaltech@gmail.com",
  emailLink: "mailto:ismartdigitaltech@gmail.com",
  address: "18 Rumuodalu, beside Chicken Republic, Rumuola, Port Harcourt, Nigeria",
  hours: "Mon – Fri: 8:00 – 17:30 · Sat: 9:00 – 14:00",
  hoursWeekday: "Monday – Friday: 8:00 – 17:30",
  hoursSaturday: "Saturday: 9:00 – 14:00",
  hoursSunday: "Sunday: Closed",
  mapsEmbedUrl: "",
  mapsPlaceUrl: "",
  socials: { facebook: "", instagram: "", linkedin: "", twitter: "" },
};

export async function loadCmsContent(): Promise<CmsContent> {
  const sb = publicClient();
  const [
    settings, socialLinks, whatsappNumbers, solutions, industries, brands,
    projectCategories, projects, projectImages, testimonials, team, faqs, posts, homepageImages,
  ] = await Promise.all([
    sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    sb.from("social_links").select("*").order("sort"),
    sb.from("whatsapp_numbers").select("*").order("sort"),
    sb.from("solutions").select("*").order("sort"),
    sb.from("industries").select("*").order("sort"),
    sb.from("brands").select("*").order("sort"),
    sb.from("project_categories").select("*").order("sort"),
    sb.from("projects").select("*").eq("archived", false).order("sort"),
    sb.from("project_images").select("*").order("sort"),
    sb.from("testimonials").select("*").order("sort"),
    sb.from("team").select("*").order("sort"),
    sb.from("faqs").select("*").order("sort"),
    sb.from("posts").select("*").eq("published", true).order("sort"),
    sb.from("homepage_images").select("id,category_key,category_name,description,image_url,alt_text,sort").eq("is_active", true).order("sort"),
  ]);

  const s = settings.data;
  const digits = (v: string) => v.replace(/[^0-9+]/g, "");
  const images = (projectImages.data ?? []) as ProjectImageRow[];

  return {
    site: s
      ? {
          name: s.name,
          shortName: s.short_name,
          tagline: s.tagline,
          domain: s.domain,
          phone: s.phone,
          phoneLink: `tel:${digits(s.phone)}`,
          whatsapp: s.whatsapp,
          whatsappLink: `https://wa.me/${digits(s.whatsapp).replace("+", "")}`,
          email: s.email,
          emailLink: `mailto:${s.email}`,
          address: s.address,
          hours: s.hours,
          hoursWeekday: s.hours_weekday ?? "",
          hoursSaturday: s.hours_saturday ?? "",
          hoursSunday: s.hours_sunday ?? "",
          mapsEmbedUrl: s.maps_embed_url ?? "",
          mapsPlaceUrl: s.maps_place_url ?? "",
          socials: {
            facebook: s.facebook ?? "",
            instagram: s.instagram ?? "",
            linkedin: s.linkedin ?? "",
            twitter: s.twitter ?? "",
          },
        }
      : fallbackSite,
    socialLinks: (socialLinks.data ?? []) as CmsContent["socialLinks"],
    whatsappNumbers: (whatsappNumbers.data ?? []) as CmsContent["whatsappNumbers"],
    solutions: (solutions.data ?? []) as CmsContent["solutions"],
    industries: (industries.data ?? []) as CmsContent["industries"],
    brands: (brands.data ?? []) as CmsContent["brands"],
    projectCategories: (projectCategories.data ?? []) as CmsContent["projectCategories"],
    projects: ((projects.data ?? []) as unknown as CmsContent["projects"]).map((p) => ({
      ...p,
      images: images.filter((i) => i.project_id === p.id),
    })),
    testimonials: (testimonials.data ?? []) as CmsContent["testimonials"],
    team: (team.data ?? []) as CmsContent["team"],
    faqs: (faqs.data ?? []) as CmsContent["faqs"],
    posts: (posts.data ?? []) as CmsContent["posts"],
    homepageImages: (homepageImages.data ?? []) as CmsContent["homepageImages"],
  };
}

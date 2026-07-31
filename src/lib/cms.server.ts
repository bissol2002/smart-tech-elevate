import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CmsContent, SiteSettings } from "./cms-types";

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
  phone: "08124265051",
  phoneLink: "tel:+2348124265051",
  whatsapp: "2348124265051",
  whatsappLink: "https://wa.me/2348124265051",
  email: "info@ismartdigitaltech.com",
  emailLink: "mailto:info@ismartdigitaltech.com",
  address: "Lagos, Nigeria",
  hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  socials: { facebook: "", instagram: "", linkedin: "", twitter: "" },
};

export async function loadCmsContent(): Promise<CmsContent> {
  const sb = publicClient();
  const [settings, solutions, industries, brands, projects, testimonials, team, faqs, posts] =
    await Promise.all([
      sb.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      sb.from("solutions").select("*").order("sort"),
      sb.from("industries").select("*").order("sort"),
      sb.from("brands").select("*").order("sort"),
      sb.from("projects").select("*").order("sort"),
      sb.from("testimonials").select("*").order("sort"),
      sb.from("team").select("*").order("sort"),
      sb.from("faqs").select("*").order("sort"),
      sb.from("posts").select("*").eq("published", true).order("sort"),
    ]);

  const s = settings.data;
  const digits = (v: string) => v.replace(/[^0-9+]/g, "");

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
          whatsappLink: `https://wa.me/${digits(s.whatsapp)}`,
          email: s.email,
          emailLink: `mailto:${s.email}`,
          address: s.address,
          hours: s.hours,
          socials: {
            facebook: s.facebook ?? "",
            instagram: s.instagram ?? "",
            linkedin: s.linkedin ?? "",
            twitter: s.twitter ?? "",
          },
        }
      : fallbackSite,
    solutions: (solutions.data ?? []) as CmsContent["solutions"],
    industries: (industries.data ?? []) as CmsContent["industries"],
    brands: (brands.data ?? []) as CmsContent["brands"],
    projects: (projects.data ?? []) as unknown as CmsContent["projects"],
    testimonials: (testimonials.data ?? []) as CmsContent["testimonials"],
    team: (team.data ?? []) as CmsContent["team"],
    faqs: (faqs.data ?? []) as CmsContent["faqs"],
    posts: (posts.data ?? []) as CmsContent["posts"],
  };
}

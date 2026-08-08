import { iconNames } from "@/lib/icon-map";

export type FieldType =
  | "text" | "textarea" | "number" | "bool" | "list" | "json" | "icon" | "image" | "date" | "select" | "ref";
export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  options?: string[];
  refTable?: string;
  refLabel?: string;
};
export type Row = Record<string, any>;
export type Collection = {
  key: string;
  table: string;
  label: string;
  group: "Content" | "Business" | "System";
  single?: boolean;
  fields: Field[];
  title: (r: Row) => string;
};

export { iconNames };

export const collections: Collection[] = [
  {
    key: "site", table: "site_settings", label: "Business info", group: "Business", single: true,
    title: () => "Site settings",
    fields: [
      { name: "name", label: "Company name" },
      { name: "short_name", label: "Short name" },
      { name: "tagline", label: "Tagline" },
      { name: "domain", label: "Domain" },
      { name: "phone", label: "Primary phone" },
      { name: "whatsapp", label: "Primary WhatsApp" },
      { name: "email", label: "Email" },
      { name: "address", label: "Office address", type: "textarea" },
      { name: "hours", label: "Hours (summary line)" },
      { name: "hours_weekday", label: "Hours — Mon to Fri" },
      { name: "hours_saturday", label: "Hours — Saturday" },
      { name: "hours_sunday", label: "Hours — Sunday" },
      { name: "maps_embed_url", label: "Google Maps embed URL (iframe src)", type: "textarea" },
      { name: "maps_place_url", label: "Google Maps link (open in Maps)", type: "textarea" },
    ],
  },
  {
    key: "socials", table: "social_links", label: "Social media", group: "Business",
    title: (r) => `${r.platform}${r.enabled ? "" : " (hidden)"}`,
    fields: [
      { name: "platform", label: "Platform", type: "select", options: ["facebook", "instagram", "x", "linkedin", "youtube", "tiktok", "whatsapp"] },
      { name: "url", label: "Profile URL" },
      { name: "enabled", label: "Show on site", type: "bool" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "whatsapp", table: "whatsapp_numbers", label: "WhatsApp numbers", group: "Business",
    title: (r) => `${r.label || "WhatsApp"} — ${r.number}`,
    fields: [
      { name: "label", label: "Label (e.g. Sales)" },
      { name: "number", label: "Number with country code" },
      { name: "notify", label: "Receive order notifications", type: "bool" },
      { name: "show_on_site", label: "Show on site", type: "bool" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "project_categories", table: "project_categories", label: "Project categories", group: "Content",
    title: (r) => r.name,
    fields: [
      { name: "name", label: "Name" }, { name: "slug", label: "Slug" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "projects", table: "projects", label: "Projects", group: "Content", title: (r) => r.title,
    fields: [
      { name: "title", label: "Title" }, { name: "slug", label: "Slug" },
      { name: "category_id", label: "Category", type: "ref", refTable: "project_categories", refLabel: "name" },
      { name: "category", label: "Category label (shown on card)" },
      { name: "client", label: "Client" },
      { name: "location", label: "Location" }, { name: "year", label: "Year", type: "number" },
      { name: "completion_date", label: "Completion date", type: "date" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "description", label: "Full description", type: "textarea" },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "stats", label: 'Stats JSON e.g. [{"label":"Cameras","value":"240"}]', type: "json" },
      { name: "image", label: "Fallback image key" },
      { name: "archived", label: "Archived (hidden from site)", type: "bool" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "solutions", table: "solutions", label: "Solutions", group: "Content", title: (r) => r.title,
    fields: [
      { name: "title", label: "Title" }, { name: "slug", label: "Slug" },
      { name: "short", label: "Short line" }, { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "features", label: "Features (one per line)", type: "list" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "industries", table: "industries", label: "Industries", group: "Content", title: (r) => r.title,
    fields: [
      { name: "title", label: "Title" }, { name: "slug", label: "Slug" },
      { name: "blurb", label: "Blurb", type: "textarea" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "accent", label: "Accent classes" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "brands", table: "brands", label: "Brands", group: "Content", title: (r) => r.name,
    fields: [
      { name: "name", label: "Name" }, { name: "slug", label: "Slug" },
      { name: "category", label: "Category" }, { name: "tagline", label: "Tagline" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "color", label: "Brand colour (hex)" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "testimonials", table: "testimonials", label: "Testimonials", group: "Content",
    title: (r) => `${r.name} — ${r.company}`,
    fields: [
      { name: "name", label: "Name" }, { name: "role", label: "Role" },
      { name: "company", label: "Company" }, { name: "quote", label: "Quote", type: "textarea" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "team", table: "team", label: "Team", group: "Content", title: (r) => r.name,
    fields: [
      { name: "name", label: "Name" }, { name: "role", label: "Role" },
      { name: "initials", label: "Initials" }, { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "faqs", table: "faqs", label: "FAQs", group: "Content", title: (r) => r.q,
    fields: [
      { name: "q", label: "Question" }, { name: "a", label: "Answer", type: "textarea" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
  {
    key: "posts", table: "posts", label: "Blog posts", group: "Content", title: (r) => r.title,
    fields: [
      { name: "title", label: "Title" }, { name: "slug", label: "Slug" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "date", label: "Date", type: "date" }, { name: "category", label: "Category" },
      { name: "read_time", label: "Read time" },
      { name: "published", label: "Published", type: "bool" },
      { name: "sort", label: "Sort order", type: "number" },
    ],
  },
];

export function emptyRow(c: Collection): Row {
  const r: Row = {};
  for (const f of c.fields) {
    r[f.name] =
      f.type === "number" ? 0
        : f.type === "bool" ? f.name === "archived" ? false : true
        : f.type === "list" || f.type === "json" ? []
        : f.type === "ref" ? null
        : "";
  }
  return r;
}

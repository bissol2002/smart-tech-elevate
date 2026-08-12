export type PermissionKey =
  | "media.upload"
  | "media.manage"
  | "media.delete"
  | "content.edit"
  | "sections.projects"
  | "sections.solutions"
  | "sections.team"
  | "sections.testimonials"
  | "commerce.orders"
  | "commerce.products"
  | "admin.settings"
  | "admin.users"
  | "admin.audit";

export const permissionGroups: { group: string; items: { key: PermissionKey; label: string; hint: string }[] }[] = [
  {
    group: "Media",
    items: [
      { key: "media.upload", label: "Upload media", hint: "Add images and documents to the library" },
      { key: "media.manage", label: "Edit media details", hint: "Rename, categorise and re-organise assets" },
      { key: "media.delete", label: "Delete media", hint: "Permanently remove assets" },
    ],
  },
  {
    group: "Content",
    items: [
      { key: "content.edit", label: "Edit pages & blog", hint: "Blog posts and general page content" },
      { key: "sections.projects", label: "Manage projects", hint: "Projects, categories and galleries" },
      { key: "sections.solutions", label: "Manage solutions", hint: "Solutions and services" },
      { key: "sections.team", label: "Manage team", hint: "Team member profiles" },
      { key: "sections.testimonials", label: "Manage testimonials", hint: "Client reviews and quotes" },
    ],
  },
  {
    group: "Commerce",
    items: [
      { key: "commerce.orders", label: "View & manage orders", hint: "Customer orders and enquiries" },
      { key: "commerce.products", label: "Manage products", hint: "Store catalogue and pricing" },
    ],
  },
  {
    group: "Administration",
    items: [
      { key: "admin.settings", label: "Business settings", hint: "Contact details, hours, socials" },
      { key: "admin.users", label: "Manage staff", hint: "Invite staff and change permissions" },
      { key: "admin.audit", label: "View activity log", hint: "See who changed what" },
    ],
  },
];

export const allPermissions: PermissionKey[] = permissionGroups.flatMap((g) => g.items.map((i) => i.key));

/** Permission required to open each admin collection/tab. */
export const collectionPermission: Record<string, PermissionKey> = {
  site: "admin.settings",
  socials: "admin.settings",
  whatsapp: "admin.settings",
  project_categories: "sections.projects",
  projects: "sections.projects",
  solutions: "sections.solutions",
  industries: "content.edit",
  brands: "content.edit",
  testimonials: "sections.testimonials",
  team: "sections.team",
  faqs: "content.edit",
  posts: "content.edit",
};

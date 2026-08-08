import { Facebook, Instagram, Linkedin, MessageCircle, Youtube, type LucideIcon } from "lucide-react";
import type { SocialLinkRow } from "@/lib/cms-types";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.5 3a5.6 5.6 0 0 0 4.5 4.4v3a8.6 8.6 0 0 1-4.5-1.3v6.2a6.3 6.3 0 1 1-6.3-6.3c.3 0 .6 0 .9.1v3.1a3.2 3.2 0 1 0 2.3 3V3z" />
    </svg>
  );
}

type IconLike = LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => React.ReactElement);

export const socialMeta: Record<string, { label: string; Icon: IconLike }> = {
  facebook: { label: "Facebook", Icon: Facebook },
  instagram: { label: "Instagram", Icon: Instagram },
  x: { label: "X (Twitter)", Icon: XIcon },
  twitter: { label: "X (Twitter)", Icon: XIcon },
  linkedin: { label: "LinkedIn", Icon: Linkedin },
  youtube: { label: "YouTube", Icon: Youtube },
  tiktok: { label: "TikTok", Icon: TikTokIcon },
  whatsapp: { label: "WhatsApp", Icon: MessageCircle },
};

export function SocialIcons({
  links,
  whatsappLink,
  variant = "dark",
  className = "",
}: {
  links: SocialLinkRow[];
  whatsappLink?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const active = links.filter((l) => l.enabled && l.url.trim() !== "");
  const items = [
    ...active.map((l) => ({ key: l.id, platform: l.platform, url: l.url })),
    ...(whatsappLink ? [{ key: "whatsapp", platform: "whatsapp", url: whatsappLink }] : []),
  ];
  if (items.length === 0) return null;

  const base =
    variant === "dark"
      ? "bg-white/8 text-white/70 hover:bg-primary hover:text-white"
      : "bg-muted text-ink-soft hover:bg-primary hover:text-primary-foreground";

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((item) => {
        const meta = socialMeta[item.platform] ?? socialMeta.whatsapp;
        const Icon = meta.Icon;
        return (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={meta.label}
            title={meta.label}
            className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${base}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import teamHero from "@/assets/team-hero.webp.asset.json";
import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { ValueStrip } from "@/components/home/ValueStrip";
import { IndustriesRow } from "@/components/home/IndustriesRow";
import { Equipment } from "@/components/home/Equipment";
import { ProjectsBand } from "@/components/home/ProjectsBand";
import { WhyUs } from "@/components/home/WhyUs";
import { CTASection } from "@/components/site/CTASection";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iSmart Digital Tech — Security, CCTV & Networking Solutions in Nigeria" },
      { name: "description", content: "iSmart Digital Tech designs, supplies, installs and maintains CCTV surveillance, access control, networking and fiber solutions for homes and businesses across Nigeria." },
      { property: "og:title", content: "iSmart Digital Tech — Smart Solutions. Secure Future." },
      { property: "og:description", content: "Intelligent security and networking solutions that protect people, property and performance." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: teamHero.url, fetchPriority: "high" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <ValueStrip />
      <IndustriesRow />
      <Equipment />
      <ProjectsBand />
      <WhyUs />
      <CTASection />
    </>
  );
}


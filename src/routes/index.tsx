import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Solutions } from "@/components/home/Solutions";
import { Industries } from "@/components/home/Industries";
import { Projects } from "@/components/home/Projects";
import { WhyUs } from "@/components/home/WhyUs";
import { Brands } from "@/components/home/Brands";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iSmart Digital Technology — CCTV, Networking & Smart Infrastructure in Nigeria" },
      { name: "description", content: "Nigeria's trusted partner for AI CCTV, enterprise networking, access control, fiber optics and smart infrastructure. Major Tiandy distributor. Cisco, Ubiquiti and Bosch certified." },
      { property: "og:title", content: "iSmart Digital Technology — Securing Businesses Through Intelligent Technology" },
      { property: "og:description", content: "Professional CCTV surveillance, enterprise networking and smart infrastructure across Nigeria." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <Solutions />
      <Industries />
      <Projects />
      <WhyUs />
      <Brands />
      <Testimonials />
      <CTASection />
    </>
  );
}

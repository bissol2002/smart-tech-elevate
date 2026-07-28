export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: 5;
}

export const testimonials: Testimonial[] = [
  {
    name: "Adebola Okunola",
    role: "Head of Facilities",
    company: "Radisson Hospitality Group",
    quote:
      "iSmart delivered a hotel-wide CCTV and network upgrade with zero downtime. Their engineers are meticulous — every cable labelled, every camera named, every report signed off.",
    rating: 5,
  },
  {
    name: "Chinedu Eze",
    role: "IT Director",
    company: "Zenith Manufacturing",
    quote:
      "180 AI cameras across a 12-hectare site, delivered on time and under budget. The Tiandy ANPR at the gates has transformed how we manage vendor traffic.",
    rating: 5,
  },
  {
    name: "Fatima Musa",
    role: "Chief Security Officer",
    company: "GTBank",
    quote:
      "We standardised on iSmart for our branch network upgrades. Response times are excellent and their Cisco expertise is genuinely deep.",
    rating: 5,
  },
  {
    name: "Rev. Samuel Adegoke",
    role: "Church Administrator",
    company: "House on the Rock",
    quote:
      "From live-stream to congregation-wide coverage, iSmart understood our unique needs and delivered a solution that just works — every service.",
    rating: 5,
  },
  {
    name: "Ngozi Aluko",
    role: "Operations Manager",
    company: "Federal Medical Centre",
    quote:
      "Access control across 38 zones, integrated with our HR system. Onboarding a new staff member now takes minutes instead of a full day.",
    rating: 5,
  },
];

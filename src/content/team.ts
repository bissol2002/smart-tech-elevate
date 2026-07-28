export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export const team: TeamMember[] = [
  { name: "Emeka Okoli", role: "Managing Director", initials: "EO" },
  { name: "Aisha Bello", role: "Head of Engineering", initials: "AB" },
  { name: "Tunde Adeyemi", role: "Head of Networking", initials: "TA" },
  { name: "Chiamaka Nwosu", role: "Head of Operations", initials: "CN" },
  { name: "Ibrahim Sani", role: "Lead CCTV Engineer", initials: "IS" },
  { name: "Grace Okafor", role: "Client Success Lead", initials: "GO" },
];

import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-elevated hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-25" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}

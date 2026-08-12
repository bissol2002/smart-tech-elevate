import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWhatsAppNumbers, useSite } from "@/lib/cms";
import { formatMoney } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ArrowRight, X } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  email: z.string().trim().max(255).email("Please enter a valid email").or(z.literal("")),
  business_name: z.string().trim().max(120),
  address: z.string().trim().min(5, "Please enter a delivery address").max(400),
  note: z.string().trim().max(1000),
});

export function CheckoutForm({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const items = useCartStore((s) => s.items);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const numbers = useWhatsAppNumbers();
  const site = useSite();
  const [form, setForm] = useState({ customer_name: "", phone: "", email: "", business_name: "", address: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const currency = items[0]?.price.currencyCode ?? "NGN";
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    setMsg(null);

    const lines = items.map((i) => ({
      title: i.product.node.title,
      variant: i.variantTitle,
      quantity: i.quantity,
      price: i.price.amount,
    }));

    const { error } = await supabase.from("orders").insert({
      ...parsed.data,
      items: lines,
      total,
      currency,
    });

    if (error) {
      setBusy(false);
      setMsg("We could not save your details. Please try again.");
      return;
    }

    // Notify the sales team on WhatsApp with the full order breakdown.
    const notifyNumber = numbers.find((n) => n.notify)?.number ?? site.whatsapp.replace(/\D/g, "");
    const text = [
      `*New order — ${site.shortName}*`,
      `Name: ${parsed.data.customer_name}`,
      `Phone: ${parsed.data.phone}`,
      parsed.data.email ? `Email: ${parsed.data.email}` : "",
      parsed.data.business_name ? `Business: ${parsed.data.business_name}` : "",
      `Address: ${parsed.data.address}`,
      parsed.data.note ? `Note: ${parsed.data.note}` : "",
      "",
      ...lines.map((l) => `• ${l.title} (${l.variant}) x${l.quantity}`),
      "",
      `Total: ${formatMoney(total, currency)}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (notifyNumber) {
      window.open(`https://wa.me/${notifyNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }

    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank", "noopener");
    setBusy(false);
    onDone();
  }

  return (
    <div className="fixed inset-0 z-[140] grid place-items-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-label="Customer details">
      <form onSubmit={submit} className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-extrabold text-ink">Your details</h2>
            <p className="mt-1 text-sm text-ink-soft">We need these to confirm delivery and contact you about your order.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-ink-soft hover:text-ink"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-5 space-y-3">
          <Field label="Full name" error={errors.customer_name}>
            <input value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} maxLength={100} className="input-base" placeholder="e.g. Adaeze Okafor" />
          </Field>
          <Field label="Phone number" error={errors.phone}>
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={30} className="input-base" placeholder="e.g. 0812 426 5051" />
          </Field>
          <Field label="Email (optional)" error={errors.email}>
            <input value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} className="input-base" placeholder="you@company.com" />
          </Field>
          <Field label="Business name (optional)" error={errors.business_name}>
            <input value={form.business_name} onChange={(e) => set("business_name", e.target.value)} maxLength={120} className="input-base" placeholder="Company or organisation" />
          </Field>
          <Field label="Delivery address" error={errors.address}>
            <textarea value={form.address} onChange={(e) => set("address", e.target.value)} maxLength={400} rows={2} className="input-base" placeholder="Street, city, state" />
          </Field>
          <Field label="Order note (optional)" error={errors.note}>
            <textarea value={form.note} onChange={(e) => set("note", e.target.value)} maxLength={1000} rows={2} className="input-base" placeholder="Anything we should know?" />
          </Field>
        </div>

        {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}

        <div className="mt-5 flex items-center justify-between rounded-xl bg-surface px-4 py-3">
          <span className="text-sm font-semibold text-ink-soft">Order total</span>
          <span className="font-display text-lg font-extrabold text-ink">{formatMoney(total, currency)}</span>
        </div>

        <button
          disabled={busy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue to secure payment <ArrowRight className="h-4 w-4" /></>}
        </button>
        <p className="mt-2 text-center text-[11px] text-ink-soft">Payment is completed on our secure Shopify checkout.</p>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

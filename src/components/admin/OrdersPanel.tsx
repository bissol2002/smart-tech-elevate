import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Phone, MapPin, Building2 } from "lucide-react";

type OrderItem = { title: string; variant: string; quantity: number; price: string };
type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email: string;
  business_name: string;
  address: string;
  note: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "fulfilled", "cancelled"] as const;

export function OrdersPanel() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) setMsg(error.message);
    setOrders((data ?? []) as unknown as Order[]);
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { setMsg(error.message); return; }
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this order?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) { setMsg(error.message); return; }
    await load();
  }

  if (!orders) return <div className="grid place-items-center rounded-2xl border border-border bg-card p-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Orders</h1>
      <p className="mt-1 text-sm text-ink-soft">Customer details captured at checkout, newest first.</p>
      {msg && <p className="mt-3 text-sm text-destructive">{msg}</p>}

      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-display text-base font-bold text-ink">{o.customer_name}</div>
                <div className="mt-1 space-y-0.5 text-xs text-ink-soft">
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {o.phone}{o.email ? ` · ${o.email}` : ""}</div>
                  {o.business_name && <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {o.business_name}</div>}
                  <div className="flex items-start gap-1.5"><MapPin className="mt-0.5 h-3 w-3 shrink-0" /> {o.address}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg font-extrabold text-primary">
                  {o.currency} {Number(o.total).toLocaleString()}
                </div>
                <div className="text-[11px] text-ink-soft">{new Date(o.created_at).toLocaleString()}</div>
              </div>
            </div>

            <ul className="mt-3 space-y-1 rounded-xl bg-surface px-4 py-3 text-xs text-ink">
              {(o.items ?? []).map((it, i) => (
                <li key={i} className="flex justify-between gap-3">
                  <span className="truncate">{it.title} <span className="text-ink-soft">({it.variant})</span></span>
                  <span className="shrink-0 font-semibold">x{it.quantity}</span>
                </li>
              ))}
            </ul>
            {o.note && <p className="mt-2 text-xs italic text-ink-soft">“{o.note}”</p>}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(o.id, s)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold capitalize transition ${o.status === s ? "gradient-primary text-white shadow-glow" : "border border-border text-ink hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
              <button onClick={() => remove(o.id)} aria-label="Delete order" className="ml-auto rounded-full border border-border px-3 py-1.5 text-destructive hover:border-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        ))}
        {orders.length === 0 && <li className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-ink-soft">No orders yet.</li>}
      </ul>
    </div>
  );
}

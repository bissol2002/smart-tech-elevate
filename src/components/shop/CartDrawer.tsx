import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "NGN";
  const totalPrice = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);

  useEffect(() => { if (isOpen) void syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button aria-label="Open cart" className="relative grid h-10 w-10 place-items-center rounded-md text-ink hover:bg-muted">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full gradient-primary px-1 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="shrink-0">
          <SheetTitle className="font-display">Your cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-ink-soft" />
                <p className="text-sm text-ink-soft">Nothing here yet — browse our products.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 rounded-xl border border-border p-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.images.edges[0].node.altText ?? item.product.node.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-ink">{item.product.node.title}</h4>
                      <p className="text-xs text-ink-soft">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>
                      <p className="mt-1 text-sm font-bold text-primary">{formatMoney(item.price.amount, item.price.currencyCode)}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <button aria-label="Remove item" onClick={() => void removeItem(item.variantId)} className="rounded-full p-1.5 text-destructive hover:bg-muted">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button aria-label="Decrease quantity" onClick={() => void updateQuantity(item.variantId, item.quantity - 1)} className="grid h-6 w-6 place-items-center rounded-full border border-border">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm">{item.quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => void updateQuantity(item.variantId, item.quantity + 1)} className="grid h-6 w-6 place-items-center rounded-full border border-border">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 space-y-4 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-soft">Subtotal</span>
                  <span className="font-display text-xl font-extrabold text-ink">{formatMoney(totalPrice, currency)}</span>
                </div>
                <p className="text-[11px] text-ink-soft">Taxes and delivery are calculated at checkout.</p>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
                >
                  {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="h-4 w-4" /> Checkout securely</>}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

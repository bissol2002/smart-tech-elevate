import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader2, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { fetchProductByHandle, formatMoney } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const name = params.handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      meta: [
        { title: `${name} | iSmart Digital Technology Store` },
        {
          name: "description",
          content: `Buy ${name} from iSmart Digital Technology — genuine stock, expert installation support and secure online checkout.`,
        },
        { property: "og:title", content: `${name} | iSmart Digital Technology Store` },
        { property: "og:description", content: `Genuine ${name} with warranty, expert support and secure checkout.` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoadingCart = useCartStore((s) => s.isLoading);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 60_000,
  });

  const variants = useMemo(() => product?.node.variants.edges.map((e) => e.node) ?? [], [product]);
  const selected = variants.find((v) => v.id === variantId) ?? variants[0];
  const images = product?.node.images.edges ?? [];

  const handleAdd = async () => {
    if (!product || !selected) return;
    await addItem({
      product,
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity,
      selectedOptions: selected.selectedOptions,
    });
    toast.success("Added to cart", { description: `${product.node.title} × ${quantity}` });
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[70vh] place-items-center pt-28">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-x grid min-h-[70vh] place-items-center pt-28 text-center">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Product not found</h1>
          <p className="mt-2 text-sm text-ink-soft">This item may no longer be available.</p>
          <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const p = product.node;

  return (
    <>
      <section className="pt-28 md:pt-36">
        <div className="container-x">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                {images[activeImage]?.node ? (
                  <img
                    src={images[activeImage].node.url}
                    alt={images[activeImage].node.altText ?? p.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-ink-soft">No image</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={img.node.url}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${i === activeImage ? "border-primary" : "border-border"}`}
                    >
                      <img src={img.node.url} alt={img.node.altText ?? ""} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{p.title}</h1>
              {selected && (
                <p className="mt-3 font-display text-3xl font-extrabold text-primary">
                  {formatMoney(selected.price.amount, selected.price.currencyCode)}
                </p>
              )}
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{p.description}</p>

              {variants.length > 1 && (
                <div className="mt-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">Options</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVariantId(v.id)}
                        disabled={!v.availableForSale}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${
                          selected?.id === v.id ? "border-primary bg-accent text-primary" : "border-border hover:border-primary"
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1.5">
                  <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => void handleAdd()}
                  disabled={!selected?.availableForSale || isLoadingCart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover-lift disabled:opacity-60"
                >
                  {isLoadingCart ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                  {selected?.availableForSale ? "Add to cart" : "Sold out"}
                </button>
              </div>

              <ul className="mt-8 grid gap-3 border-t border-border pt-6 text-sm text-ink-soft sm:grid-cols-3">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Genuine warranty</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Nationwide delivery</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Expert installation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <CTASection title="Need help specifying the right system?" subtitle="Our engineers will size and quote a complete solution for your site." />
      </div>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const image = p.images?.edges?.[0]?.node;
  const price = p.priceRange.minVariantPrice;
  const available = p.variants.edges.some((v) => v.node.availableForSale);

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            loading="lazy"
            decoding="async"
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-ink-soft">No image</div>
        )}
        {!available && (
          <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display text-sm font-bold text-ink group-hover:text-primary">{p.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{p.description}</p>
        <div className="mt-auto pt-3 text-base font-extrabold text-primary">
          {formatMoney(price.amount, price.currencyCode)}
        </div>
      </div>
    </Link>
  );
}

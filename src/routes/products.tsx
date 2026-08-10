import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetchProducts } from "@/lib/shopify";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Security Products | iSmart Digital Technology" },
      {
        name: "description",
        content:
          "Buy Tiandy CCTV cameras, PTZ units, NVRs and networking hardware online from iSmart Digital Technology with secure checkout and nationwide delivery.",
      },
      { property: "og:title", content: "Shop Security Products | iSmart Digital Technology" },
      {
        property: "og:description",
        content: "Browse genuine Tiandy CCTV, PTZ and networking products with secure online checkout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [search, setSearch] = useState("");
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(100),
    staleTime: 60_000,
  });

  const filtered = useMemo(() => {
    const list = products ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) => p.node.title.toLowerCase().includes(q) || p.node.description.toLowerCase().includes(q),
    );
  }, [products, search]);

  return (
    <>
      <PageHero
        eyebrow="Online Store"
        title="Shop genuine security & networking products"
        subtitle="Authentic Tiandy CCTV, PTZ cameras, recorders and networking hardware — supplied and supported by certified engineers."
        crumbs={[{ label: "Products" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">
              {isLoading ? "Loading products…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} available`}
            </p>
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid place-items-center py-20 text-ink-soft">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : isError ? (
            <p className="py-20 text-center text-sm text-ink-soft">
              Products are temporarily unavailable. Please try again shortly or contact our sales team.
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-sm text-ink-soft">No products match your search.</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}

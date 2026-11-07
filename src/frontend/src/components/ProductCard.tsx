import { Availability, type Product } from "@/backend";
import { Link } from "@tanstack/react-router";
import { ImageOff } from "lucide-react";

const AVAILABILITY_LABEL: Record<Availability, string> = {
  [Availability.inStock]: "In Stock",
  [Availability.outOfStock]: "Out of Stock",
  [Availability.madeToOrder]: "Made to Order",
};

function formatPrice(price: bigint): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

type ProductCardProps = {
  product: Product;
  index?: number;
};

/** Ledger-entry product card used by every product listing. */
export function ProductCard({ product, index }: ProductCardProps) {
  const image = [...product.images].sort((a, b) =>
    Number(a.order - b.order),
  )[0];
  const imageUrl = image?.blob?.getDirectURL?.();

  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id.toString() }}
      data-ocid={
        index !== undefined ? `product.card.${index + 1}` : "product.card"
      }
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={image?.altText ?? product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" aria-hidden="true" />
          </div>
        )}
        {(product.isNewArrival ||
          product.isBestseller ||
          product.isTrending) && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.isNewArrival && (
              <span className="rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                Bestseller
              </span>
            )}
            {product.isTrending && (
              <span className="rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                Trending
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {product.sku}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {AVAILABILITY_LABEL[product.availability]}
          </span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {product.price !== undefined
              ? formatPrice(product.price)
              : "Enquire for price"}
          </span>
        </div>
      </div>
    </Link>
  );
}

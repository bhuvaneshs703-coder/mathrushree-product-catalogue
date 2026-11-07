import { Availability, type Product } from "@/backend";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { ProductCard } from "@/components/ProductCard";
import {
  useBrands,
  useCategories,
  usePublishedProduct,
  usePublishedProducts,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ImageOff,
  PackageX,
  Sparkles,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";

const AVAILABILITY_LABEL: Record<Availability, string> = {
  [Availability.inStock]: "In Stock",
  [Availability.outOfStock]: "Out of Stock",
  [Availability.madeToOrder]: "Made to Order",
};

const AVAILABILITY_TONE: Record<Availability, string> = {
  [Availability.inStock]: "text-success",
  [Availability.outOfStock]: "text-destructive",
  [Availability.madeToOrder]: "text-accent",
};

function formatPrice(price: bigint): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function parseProductId(raw: string | undefined): bigint | undefined {
  if (!raw) return undefined;
  try {
    const value = BigInt(raw);
    return value >= 0n ? value : undefined;
  } catch {
    return undefined;
  }
}

/* ── Gallery ────────────────────────────────────────────────── */

function ProductGallery({ product }: { product: Product }) {
  const images = useMemo(
    () => [...product.images].sort((a, b) => Number(a.order - b.order)),
    [product.images],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const active = images[activeIndex];
  const activeUrl = active?.blob?.getDirectURL?.();

  return (
    <div className="flex flex-col gap-4">
      <div
        data-ocid="product.gallery"
        className="relative aspect-[4/5] overflow-hidden rounded-md border border-accent/40 bg-muted"
      >
        {activeUrl ? (
          <img
            src={activeUrl}
            alt={active?.altText ?? product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="h-10 w-10" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wider">
              Image coming soon
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul
          data-ocid="product.thumbnail_list"
          className="grid grid-cols-4 gap-3 sm:grid-cols-5"
        >
          {images.map((image, index) => {
            const url = image.blob?.getDirectURL?.();
            const isActive = index === activeIndex;
            return (
              <li key={image.id.toString()}>
                <button
                  type="button"
                  data-ocid={`product.thumbnail.${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  aria-pressed={isActive}
                  className={`aspect-square w-full overflow-hidden rounded-md border bg-muted transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    isActive
                      ? "border-accent ring-1 ring-accent"
                      : "border-border hover:border-accent/60"
                  }`}
                >
                  {url ? (
                    <img
                      src={url}
                      alt={
                        image.altText ?? `${product.name} image ${index + 1}`
                      }
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <ImageOff className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── Detail panel ───────────────────────────────────────────── */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/70 py-3 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="label-caps w-40 shrink-0 text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function ProductDetailContent({ product }: { product: Product }) {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const category = categories?.find((item) => item.id === product.categoryId);
  const subcategory = category?.subcategories.find(
    (item) => item.id === product.subcategoryId,
  );
  const brand = brands?.find((item) => item.id === product.brandId);

  const relatedFilter = useMemo(
    () =>
      product.brandId !== undefined
        ? { brandId: product.brandId, pageSize: 5n }
        : { categoryId: product.categoryId, pageSize: 5n },
    [product.brandId, product.categoryId],
  );
  const { data: relatedPage } = usePublishedProducts(relatedFilter);
  const related = (relatedPage?.products ?? [])
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const categoryLabel = subcategory
    ? `${category?.name ?? ""} · ${subcategory.name}`
    : category?.name;

  return (
    <div className="flex flex-col gap-16">
      <nav aria-label="Breadcrumb" className="text-xs">
        <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <li>
            <Link
              to="/shop"
              data-ocid="product.breadcrumb_shop_link"
              className="transition-smooth hover:text-accent"
            >
              Shop
            </Link>
          </li>
          {category && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/shop"
                  search={{ search: category.name }}
                  data-ocid="product.breadcrumb_category_link"
                  className="transition-smooth hover:text-accent"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery key={product.id.toString()} product={product} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {brand && (
              <Link
                to="/brands"
                data-ocid="product.brand_link"
                className="label-caps w-fit text-accent transition-smooth hover:text-primary"
              >
                {brand.name}
              </Link>
            )}
            <h1 className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                {product.sku}
              </span>
              <span
                data-ocid="product.availability"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${AVAILABILITY_TONE[product.availability]}`}
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                {AVAILABILITY_LABEL[product.availability]}
              </span>
            </div>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="flex flex-wrap items-baseline gap-3 border-y border-accent/30 py-5">
            {product.price !== undefined ? (
              <span
                data-ocid="product.price"
                className="font-display text-3xl text-foreground"
              >
                {formatPrice(product.price)}
              </span>
            ) : (
              <span
                data-ocid="product.enquire_price"
                className="font-display text-2xl text-accent"
              >
                Enquire for price
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label-caps text-muted-foreground">
              Enquire about this piece
            </h2>
            <EnquiryButtons product={product} />
          </div>

          {categoryLabel && (
            <dl className="mt-2">
              <DetailRow label="Category" value={categoryLabel} />
              {brand && <DetailRow label="Brand" value={brand.name} />}
              <DetailRow label="SKU" value={product.sku} />
              <DetailRow
                label="Availability"
                value={AVAILABILITY_LABEL[product.availability]}
              />
            </dl>
          )}
        </div>
      </div>

      {product.longDescription && (
        <section
          data-ocid="product.description_section"
          className="grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16"
        >
          <h2 className="font-display text-2xl tracking-tight">Description</h2>
          <p className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {product.longDescription}
          </p>
        </section>
      )}

      {product.specifications.length > 0 && (
        <section
          data-ocid="product.specifications_section"
          className="grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16"
        >
          <h2 className="font-display text-2xl tracking-tight">
            Specifications
          </h2>
          <dl className="max-w-3xl">
            {product.specifications.map((spec) => (
              <DetailRow
                key={`${spec.name}-${spec.value}`}
                label={spec.name}
                value={spec.value}
              />
            ))}
          </dl>
        </section>
      )}

      {product.variants.length > 0 && (
        <section
          data-ocid="product.variants_section"
          className="grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16"
        >
          <h2 className="font-display text-2xl tracking-tight">
            Available Variants
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.variants.map((variant) => (
              <li
                key={`${variant.name}-${variant.value}`}
                className="flex flex-col gap-1 rounded-md border border-border bg-card p-4"
              >
                <span className="label-caps text-muted-foreground">
                  {variant.name}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {variant.value}
                </span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {variant.sku && (
                    <span className="font-mono uppercase tracking-wider">
                      {variant.sku}
                    </span>
                  )}
                  {variant.availability !== undefined && (
                    <span
                      className={
                        AVAILABILITY_TONE[variant.availability] ?? undefined
                      }
                    >
                      {AVAILABILITY_LABEL[variant.availability]}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section
          data-ocid="product.related_section"
          className="border-t border-accent/30 pt-10"
        >
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="font-display text-2xl tracking-tight">
              You may also like
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard
                key={item.id.toString()}
                product={item}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ── States ─────────────────────────────────────────────────── */

function NotFoundState() {
  return (
    <div
      data-ocid="product.not_found_state"
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center md:px-8"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 text-accent">
        <PackageX className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="font-display text-3xl tracking-tight">
        Product not available
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        This piece is not part of the published catalogue. It may have been
        removed or is not yet available.
      </p>
      <Link
        to="/shop"
        data-ocid="product.back_to_shop_button"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to the catalogue
      </Link>
    </div>
  );
}

function LoadingState() {
  return (
    <div
      data-ocid="product.loading_state"
      className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-16"
    >
      <div className="aspect-[4/5] animate-pulse rounded-md bg-muted" />
      <div className="flex flex-col gap-4">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-24 w-full animate-pulse rounded bg-muted" />
        <div className="h-12 w-48 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function ProductDetail() {
  const params = useParams({ strict: false }) as { productId?: string };
  const productId = parseProductId(params.productId);
  const { data: product, isLoading } = usePublishedProduct(productId);

  const isNotFound = !isLoading && (productId === undefined || !product);

  useSeo(
    product ? product.name : "Product not available",
    product
      ? product.shortDescription || `Enquire about ${product.name}.`
      : "This product is not part of the published catalogue.",
  );

  return (
    <section
      data-ocid="product.page"
      className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16"
    >
      {isLoading ? (
        <LoadingState />
      ) : isNotFound || !product ? (
        <NotFoundState />
      ) : (
        <ProductDetailContent product={product} />
      )}
    </section>
  );
}

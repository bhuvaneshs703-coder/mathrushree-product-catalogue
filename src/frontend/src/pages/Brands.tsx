import type { Brand } from "@/backend";
import { useBrands } from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ImageOff, Store } from "lucide-react";

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const logoUrl = brand.logo?.getDirectURL?.();

  return (
    <Link
      to="/shop"
      search={{ search: brand.name }}
      data-ocid={`brands.item.${index + 1}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-accent/20 bg-muted">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${brand.name} logo`}
            loading="lazy"
            className="h-full w-full object-contain p-8 transition-smooth group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageOff className="h-7 w-7" aria-hidden="true" />
            <span className="label-caps text-[10px]">No logo</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="font-display text-xl leading-snug text-foreground line-clamp-2">
          {brand.name}
        </h2>
        {brand.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {brand.description}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            Explore the collection.
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          View in shop
          <ArrowRight
            className="h-3.5 w-3.5 transition-smooth group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function BrandSkeleton() {
  return (
    <div
      data-ocid="brands.loading_state"
      className="flex flex-col overflow-hidden rounded-md border border-border bg-card"
    >
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function Brands() {
  useSeo(
    "Brands",
    "Discover the makers and houses whose fine stationery and lifestyle goods we carry.",
  );

  const { data: brands, isLoading, isError, refetch } = useBrands();
  const hasBrands = !!brands && brands.length > 0;

  return (
    <section
      data-ocid="brands.page"
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <header className="max-w-2xl">
        <p className="label-caps text-accent">The Houses We Carry</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground md:text-5xl">
          Brands
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          A curated register of the makers behind our catalogue — each one
          chosen for craft, provenance and enduring quality.
        </p>
      </header>

      <div className="mt-10 h-px w-full bg-accent/30" />

      {isLoading ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => `brand-skeleton-${i}`).map(
            (id) => (
              <BrandSkeleton key={id} />
            ),
          )}
        </div>
      ) : isError ? (
        <div
          data-ocid="brands.error_state"
          className="mt-10 flex flex-col items-center gap-4 rounded-md border border-border bg-card px-6 py-16 text-center"
        >
          <h2 className="font-display text-2xl text-foreground">
            We couldn't load the brands
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Something went wrong while fetching the register. Please try again.
          </p>
          <button
            type="button"
            data-ocid="brands.retry_button"
            onClick={() => void refetch()}
            className="rounded-md border border-accent/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Try again
          </button>
        </div>
      ) : !hasBrands ? (
        <div
          data-ocid="brands.empty_state"
          className="mt-10 flex flex-col items-center gap-4 rounded-md border border-dashed border-accent/40 bg-card px-6 py-20 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent">
            <Store className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-2xl text-foreground">
            No brands yet
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Our register of makers is being prepared. In the meantime, browse
            the full catalogue or get in touch with an enquiry.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/shop"
              search={{}}
              data-ocid="brands.browse_button"
              className="rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Browse the shop
            </Link>
            <Link
              to="/contact"
              data-ocid="brands.enquire_button"
              className="rounded-md border border-accent/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Make an enquiry
            </Link>
          </div>
        </div>
      ) : (
        <ul
          data-ocid="brands.list"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {brands.map((brand, index) => (
            <li key={brand.id.toString()} className="flex">
              <BrandCard brand={brand} index={index} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

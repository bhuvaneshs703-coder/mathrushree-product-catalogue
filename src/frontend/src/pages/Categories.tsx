import type { Category, Subcategory } from "@/backend";
import { useCategories } from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

/* ── Shared link styling ────────────────────────────────────── */
const SHOP_LINK_CLASS =
  "inline-flex items-center gap-1.5 rounded-md border border-accent/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function SubcategoryChip({ subcategory }: { subcategory: Subcategory }) {
  return (
    <Link
      to="/shop"
      search={{ search: subcategory.name }}
      data-ocid={`categories.subcategory_link.${subcategory.id}`}
      className={SHOP_LINK_CLASS}
    >
      {subcategory.name}
    </Link>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const subcategories = [...category.subcategories].sort((a, b) =>
    Number(a.order - b.order),
  );

  return (
    <article
      data-ocid={`categories.card.${category.id}`}
      className="group flex flex-col rounded-md border border-border bg-card p-6 shadow-subtle transition-smooth hover:border-accent/60 hover:shadow-elevated md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="label-caps text-muted-foreground">
            {subcategories.length > 0
              ? `${subcategories.length} ${
                  subcategories.length === 1 ? "subcategory" : "subcategories"
                }`
              : "Category"}
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-foreground md:text-3xl">
            {category.name}
          </h2>
        </div>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground"
        >
          <BookOpen className="h-5 w-5" />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="mt-4 block h-px w-16 origin-left bg-accent/50 transition-smooth group-hover:w-24"
      />

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {category.description?.trim()
          ? category.description
          : "Explore this collection of fine stationery and lifestyle goods."}
      </p>

      {subcategories.length > 0 && (
        <div className="mt-6">
          <p className="label-caps text-muted-foreground">Browse by</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <li key={subcategory.id.toString()}>
                <SubcategoryChip subcategory={subcategory} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex-1" />

      <Link
        to="/shop"
        search={{ search: category.name }}
        data-ocid={`categories.view_all_link.${category.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary transition-smooth hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        View all in {category.name}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}

function CategorySkeleton({ id }: { id: string }) {
  return (
    <div
      data-ocid="categories.loading_state"
      className="flex flex-col rounded-md border border-border bg-card p-6 shadow-subtle md:p-8"
    >
      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-7 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-5 h-px w-16 bg-accent/40" />
      <div className="mt-5 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
      </div>
      <span className="sr-only">{id}</span>
    </div>
  );
}

export default function Categories() {
  useSeo(
    "Categories",
    "Browse the Mathrushree Enterprises catalogue by category and subcategory — fine stationery and lifestyle goods.",
  );

  const { data: categories, isLoading, isError, refetch } = useCategories();

  const sorted = categories
    ? [...categories].sort((a, b) => Number(a.order - b.order))
    : [];

  return (
    <div data-ocid="categories.page" className="bg-background">
      {/* ── Page header band ─────────────────────────────────── */}
      <section className="border-b border-accent/25 bg-muted/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="label-caps text-accent">The Catalogue</p>
          <span
            aria-hidden="true"
            className="mt-3 block h-px w-20 origin-left animate-gold-sweep bg-accent/60"
          />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Browse by Category
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every entry in our ledger, organised by category and subcategory.
            Select a collection to view the pieces within it.
          </p>
        </div>
      </section>

      {/* ── Category grid ────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {isLoading && (
          <div
            data-ocid="categories.list"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }, (_, i) => `category-skeleton-${i}`).map(
              (id) => (
                <CategorySkeleton key={id} id={id} />
              ),
            )}
          </div>
        )}

        {isError && (
          <div
            data-ocid="categories.error_state"
            className="mx-auto max-w-xl rounded-md border border-destructive/40 bg-card p-8 text-center shadow-subtle"
          >
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              We couldn&rsquo;t load the categories
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Something went wrong while fetching the catalogue. Please try
              again.
            </p>
            <button
              type="button"
              data-ocid="categories.retry_button"
              onClick={() => void refetch()}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && sorted.length === 0 && (
          <div
            data-ocid="categories.empty_state"
            className="mx-auto max-w-xl rounded-md border border-border bg-card p-10 text-center shadow-subtle"
          >
            <span
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent"
            >
              <Layers className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-2xl tracking-tight text-foreground">
              No categories yet
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The catalogue is being prepared. In the meantime, browse the full
              collection or get in touch with an enquiry.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/shop"
                search={{}}
                data-ocid="categories.browse_shop_button"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Browse the shop
              </Link>
              <Link
                to="/contact"
                data-ocid="categories.contact_button"
                className="inline-flex items-center justify-center rounded-md border border-accent/60 px-5 py-2.5 text-sm font-medium tracking-wide text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Make an enquiry
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !isError && sorted.length > 0 && (
          <div
            data-ocid="categories.list"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {sorted.map((category) => (
              <CategoryCard key={category.id.toString()} category={category} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

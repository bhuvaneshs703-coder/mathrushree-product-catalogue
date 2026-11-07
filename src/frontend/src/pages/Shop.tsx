import { type ProductFilter, ProductSort } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useBrands,
  useCategories,
  usePublishedProducts,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 12n;

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: ProductSort.newest, label: "Newest first" },
  { value: ProductSort.nameAsc, label: "Name A–Z" },
  { value: ProductSort.nameDesc, label: "Name Z–A" },
  { value: ProductSort.priceAsc, label: "Price: low to high" },
  { value: ProductSort.priceDesc, label: "Price: high to low" },
];

const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((option) => option.value));

type ShopSearch = {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  sort?: string;
  page?: string;
};

function parseId(value: string | undefined): bigint | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? BigInt(parsed) : undefined;
}

function parsePage(value: string | undefined): bigint {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? BigInt(parsed) : 1n;
}

/** Read the full query string so filter state survives a refresh. */
function readRawSearch(): ShopSearch {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const read = (key: string) => params.get(key) ?? undefined;
  return {
    search: read("search"),
    category: read("category"),
    subcategory: read("subcategory"),
    brand: read("brand"),
    sort: read("sort"),
    page: read("page"),
  };
}

export default function Shop() {
  useSeo(
    "Shop the Catalogue",
    "Browse the full catalogue of fine stationery and lifestyle goods, filtered by category, brand and price.",
  );

  const navigate = useNavigate();
  const routeSearch = useSearch({ from: "/shop" });

  // Initial state comes from the URL; the route's validateSearch only
  // preserves `search`, so the remaining filters are read from the raw query.
  const [filters, setFilters] = useState<ShopSearch>(() => ({
    ...readRawSearch(),
    search: routeSearch.search ?? readRawSearch().search,
  }));
  const [searchDraft, setSearchDraft] = useState(filters.search ?? "");

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const categoryId = parseId(filters.category);
  const subcategoryId = parseId(filters.subcategory);
  const brandId = parseId(filters.brand);
  const page = parsePage(filters.page);
  const sort =
    filters.sort && SORT_VALUES.has(filters.sort)
      ? (filters.sort as ProductSort)
      : ProductSort.newest;

  const filter: ProductFilter = useMemo(
    () => ({
      search: filters.search || undefined,
      categoryId,
      subcategoryId,
      brandId,
      sort,
      page,
      pageSize: PAGE_SIZE,
    }),
    [filters.search, categoryId, subcategoryId, brandId, sort, page],
  );

  const { data, isLoading, isError, refetch } = usePublishedProducts(filter);

  // Keep the URL in sync with the active filter state.
  useEffect(() => {
    const next: Record<string, string> = {};
    if (filters.search) next.search = filters.search;
    if (filters.category) next.category = filters.category;
    if (filters.subcategory) next.subcategory = filters.subcategory;
    if (filters.brand) next.brand = filters.brand;
    if (filters.sort) next.sort = filters.sort;
    if (filters.page && filters.page !== "1") next.page = filters.page;
    void navigate({ to: "/shop", search: next, replace: true });
  }, [filters, navigate]);

  const activeCategory = categories?.find((item) => item.id === categoryId);
  const subcategories = activeCategory?.subcategories ?? [];

  const total = data?.total ?? 0n;
  const totalNumber = Number(total);
  const pageSize = Number(data?.pageSize ?? PAGE_SIZE) || Number(PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(totalNumber / pageSize));
  const currentPage = Number(page);
  const products = data?.products ?? [];

  const hasActiveFilters =
    Boolean(filters.search) ||
    categoryId !== undefined ||
    subcategoryId !== undefined ||
    brandId !== undefined ||
    (filters.sort !== undefined && filters.sort !== ProductSort.newest);

  function updateFilters(patch: Partial<ShopSearch>) {
    setFilters((current) => {
      const next = { ...current, ...patch };
      // Any filter change resets to the first page unless paging explicitly.
      if (!("page" in patch)) next.page = undefined;
      return next;
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateFilters({ search: searchDraft.trim() || undefined });
  }

  function handleCategoryChange(value: string) {
    if (value === "all") {
      updateFilters({ category: undefined, subcategory: undefined });
      return;
    }
    updateFilters({ category: value, subcategory: undefined });
  }

  function handleReset() {
    setSearchDraft("");
    setFilters({});
  }

  function goToPage(nextPage: number) {
    updateFilters({ page: nextPage <= 1 ? undefined : String(nextPage) });
  }

  return (
    <section
      data-ocid="shop.page"
      className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16"
    >
      <header className="flex flex-col gap-4 border-b border-accent/30 pb-8">
        <p className="label-caps text-accent">The Catalogue</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          Shop
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Every entry is presented as it is kept in our ledger — filter by
          category, brand or price to find the piece you are looking for.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* ── Filter rail ─────────────────────────────────────── */}
        <aside
          data-ocid="shop.filters_panel"
          className="flex flex-col gap-6 rounded-md border border-border bg-card p-5 shadow-subtle lg:sticky lg:top-24 lg:self-start"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg">
              <SlidersHorizontal
                className="h-4 w-4 text-accent"
                aria-hidden="true"
              />
              Refine
            </h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                data-ocid="shop.reset_button"
                className="text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Reset
              </button>
            )}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            <label
              htmlFor="shop-search"
              className="label-caps text-muted-foreground"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="shop-search"
                type="search"
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
                placeholder="Name, SKU or keyword"
                data-ocid="shop.search_input"
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              data-ocid="shop.search_button"
              className="mt-1 border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Apply search
            </Button>
          </form>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="shop-category"
              className="label-caps text-muted-foreground"
            >
              Category
            </label>
            <Select
              value={filters.category ?? "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                id="shop-category"
                data-ocid="shop.category_select"
                className="w-full"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {(categories ?? []).map((category) => (
                  <SelectItem
                    key={category.id.toString()}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {subcategories.length > 0 && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="shop-subcategory"
                className="label-caps text-muted-foreground"
              >
                Subcategory
              </label>
              <Select
                value={filters.subcategory ?? "all"}
                onValueChange={(value) =>
                  updateFilters({
                    subcategory: value === "all" ? undefined : value,
                  })
                }
              >
                <SelectTrigger
                  id="shop-subcategory"
                  data-ocid="shop.subcategory_select"
                  className="w-full"
                >
                  <SelectValue placeholder="All subcategories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All subcategories</SelectItem>
                  {subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory.id.toString()}
                      value={subcategory.id.toString()}
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="shop-brand"
              className="label-caps text-muted-foreground"
            >
              Brand
            </label>
            <Select
              value={filters.brand ?? "all"}
              onValueChange={(value) =>
                updateFilters({ brand: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger
                id="shop-brand"
                data-ocid="shop.brand_select"
                className="w-full"
              >
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {(brands ?? []).map((brand) => (
                  <SelectItem
                    key={brand.id.toString()}
                    value={brand.id.toString()}
                  >
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="shop-sort"
              className="label-caps text-muted-foreground"
            >
              Sort by
            </label>
            <Select
              value={sort}
              onValueChange={(value) => updateFilters({ sort: value })}
            >
              <SelectTrigger
                id="shop-sort"
                data-ocid="shop.sort_select"
                className="w-full"
              >
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* ── Results ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              data-ocid="shop.result_count"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {isLoading
                ? "Loading entries…"
                : `${totalNumber} ${totalNumber === 1 ? "entry" : "entries"}`}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                data-ocid="shop.clear_filters_button"
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {isLoading ? (
            <div
              data-ocid="shop.loading_state"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {Array.from({ length: 6 }, (_, i) => `shop-skeleton-${i}`).map(
                (id) => (
                  <div
                    key={id}
                    className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle"
                  >
                    <div className="aspect-[4/5] animate-pulse bg-muted" />
                    <div className="flex flex-col gap-3 p-4">
                      <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : isError ? (
            <div
              data-ocid="shop.error_state"
              className="flex flex-col items-center gap-4 rounded-md border border-destructive/40 bg-card px-6 py-16 text-center"
            >
              <h2 className="font-display text-2xl">
                We could not load the catalogue
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Something interrupted the ledger. Please try again.
              </p>
              <Button
                type="button"
                variant="outline"
                data-ocid="shop.retry_button"
                onClick={() => void refetch()}
                className="border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Retry
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div
              data-ocid="shop.empty_state"
              className="flex flex-col items-center gap-4 rounded-md border border-border bg-card px-6 py-20 text-center shadow-subtle"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent">
                <Search className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl">
                No entries match your filters
              </h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Try a broader search, or clear the filters to see the full
                catalogue again.
              </p>
              <Button
                type="button"
                data-ocid="shop.empty_reset_button"
                onClick={handleReset}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <div
                data-ocid="shop.product_grid"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  data-ocid="shop.pagination"
                  className="flex items-center justify-between gap-4 border-t border-accent/30 pt-6"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid="shop.pagination_prev"
                    disabled={currentPage <= 1}
                    onClick={() => goToPage(currentPage - 1)}
                    className="border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Previous
                  </Button>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid="shop.pagination_next"
                    disabled={currentPage >= totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    className="border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

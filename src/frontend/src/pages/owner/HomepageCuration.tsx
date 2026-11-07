import { type Product, type ProductFilter, PublishState } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  useHomepageSections,
  usePublishedProducts,
  useSetProductFlag,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  LayoutGrid,
  PackageOpen,
} from "lucide-react";
import { useMemo, useState } from "react";

/* ── Flag definitions ───────────────────────────────────────── */

type FlagKey =
  | "isTrending"
  | "isNewArrival"
  | "isBestseller"
  | "isFeatured"
  | "showOnHomepage";

interface FlagDef {
  key: FlagKey;
  /** Backend flag name accepted by setProductFlag. */
  apiFlag: string;
  label: string;
  short: string;
}

const FLAGS: FlagDef[] = [
  {
    key: "showOnHomepage",
    apiFlag: "showOnHomepage",
    label: "On homepage",
    short: "Homepage",
  },
  {
    key: "isTrending",
    apiFlag: "trending",
    label: "Trending",
    short: "Trending",
  },
  {
    key: "isNewArrival",
    apiFlag: "newArrival",
    label: "New Arrival",
    short: "New",
  },
  {
    key: "isBestseller",
    apiFlag: "bestseller",
    label: "Bestseller",
    short: "Bestseller",
  },
  {
    key: "isFeatured",
    apiFlag: "featured",
    label: "Featured",
    short: "Featured",
  },
];

interface SectionDef {
  key: "trending" | "newArrivals" | "bestsellers" | "featured";
  title: string;
  description: string;
}

const SECTIONS: SectionDef[] = [
  {
    key: "trending",
    title: "Trending",
    description: "Products flagged as trending.",
  },
  {
    key: "newArrivals",
    title: "New Arrivals",
    description: "Products flagged as new arrivals.",
  },
  {
    key: "bestsellers",
    title: "Bestsellers",
    description: "Products flagged as bestsellers.",
  },
  {
    key: "featured",
    title: "Featured",
    description: "Products flagged as featured.",
  },
];

/* ── Feedback banner ────────────────────────────────────────── */

interface Feedback {
  kind: "success" | "error";
  message: string;
}

function FeedbackBanner({ feedback }: { feedback: Feedback | null }) {
  if (!feedback) return null;
  const isSuccess = feedback.kind === "success";
  return (
    <output
      aria-live="polite"
      data-ocid={isSuccess ? "homepage.success_state" : "homepage.error_state"}
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-sm",
        isSuccess
          ? "border-success/40 bg-success/10 text-foreground"
          : "border-destructive/40 bg-destructive/10 text-foreground",
      )}
    >
      {isSuccess ? (
        <CheckCircle2
          className="mt-0.5 h-4 w-4 shrink-0 text-success"
          aria-hidden="true"
        />
      ) : (
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
          aria-hidden="true"
        />
      )}
      <p className="min-w-0">{feedback.message}</p>
    </output>
  );
}

/* ── Product flag row ───────────────────────────────────────── */

function ProductFlagRow({
  product,
  index,
  onToggle,
  pendingFlag,
}: {
  product: Product;
  index: number;
  onToggle: (product: Product, flag: FlagDef, value: boolean) => void;
  pendingFlag: string | null;
}) {
  const isDraft = product.publishState !== PublishState.published;
  return (
    <div
      data-ocid={`homepage.product.item.${index}`}
      className="flex flex-col gap-4 border-b border-border/70 py-5 last:border-b-0 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="min-w-0 lg:max-w-xs">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-display text-lg text-foreground">
            {product.name}
          </p>
          {isDraft && (
            <Badge variant="secondary" className="label-caps">
              {product.publishState === PublishState.draft
                ? "Draft"
                : "Archived"}
            </Badge>
          )}
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {product.sku}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-x-6">
        {FLAGS.map((flag) => {
          const checked = product[flag.key];
          const isPending = pendingFlag === `${product.id}-${flag.key}`;
          const inputId = `flag-${product.id}-${flag.key}`;
          return (
            <div key={flag.key} className="flex items-center gap-2">
              <Switch
                id={inputId}
                checked={checked}
                disabled={isPending}
                onCheckedChange={(value) => onToggle(product, flag, value)}
                data-ocid={`homepage.toggle.${flag.key}.${index}`}
                aria-label={`${flag.label} for ${product.name}`}
              />
              <label
                htmlFor={inputId}
                className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {flag.short}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Section preview ────────────────────────────────────────── */

function SectionPreview({
  section,
  products,
}: {
  section: SectionDef;
  products: Product[];
}) {
  return (
    <Card
      data-ocid={`homepage.section.${section.key}`}
      className="rounded-lg border-border/70 shadow-none"
    >
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-display text-xl">
            {section.title}
          </CardTitle>
          <Badge variant="outline" className="label-caps">
            {products.length} {products.length === 1 ? "item" : "items"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{section.description}</p>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p
            data-ocid={`homepage.section.${section.key}.empty_state`}
            className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground"
          >
            Nothing here yet. Toggle a product flag to populate this section.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {products.map((product, i) => (
              <li
                key={product.id.toString()}
                data-ocid={`homepage.section.${section.key}.item.${i}`}
                className="flex items-center justify-between gap-3 rounded-md bg-muted/40 px-3 py-2"
              >
                <span className="min-w-0 truncate text-sm text-foreground">
                  {product.name}
                </span>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {product.sku}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function OwnerHomepageCuration() {
  useSeo(
    "Homepage Curation",
    "Curate the homepage sections and product flags.",
  );

  const filter = useMemo<ProductFilter>(() => ({ pageSize: 100n }), []);
  const productsQuery = usePublishedProducts(filter);
  const sectionsQuery = useHomepageSections();
  const setFlag = useSetProductFlag();

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [pendingFlag, setPendingFlag] = useState<string | null>(null);

  const products = productsQuery.data?.products ?? [];

  function handleToggle(product: Product, flag: FlagDef, value: boolean) {
    setFeedback(null);
    setPendingFlag(`${product.id}-${flag.key}`);
    setFlag.mutate(
      { id: product.id, flag: flag.apiFlag, value },
      {
        onSuccess: (result) => {
          setPendingFlag(null);
          if (result.__kind__ === "ok") {
            setFeedback({
              kind: "success",
              message: `${product.name} — ${flag.label} ${value ? "enabled" : "disabled"}.`,
            });
          } else {
            setFeedback({
              kind: "error",
              message:
                result.__kind__ === "unauthorized"
                  ? "You do not have permission to change homepage flags."
                  : `Could not update ${flag.label} for ${product.name}.`,
            });
          }
        },
        onError: () => {
          setPendingFlag(null);
          setFeedback({
            kind: "error",
            message: `Could not update ${flag.label} for ${product.name}. Please try again.`,
          });
        },
      },
    );
  }

  const sections = sectionsQuery.data;

  return (
    <section
      data-ocid="homepage.page"
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <header className="max-w-2xl">
        <p className="label-caps text-accent">Owner dashboard</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          Homepage Curation
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Control which products appear on the homepage and in each featured
          section. Changes are saved immediately.
        </p>
      </header>

      <div className="mt-8">
        <FeedbackBanner feedback={feedback} />
      </div>

      {/* ── Product flags ─────────────────────────────────────── */}
      <div className="mt-12">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-2xl tracking-tight">
            Product flags
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Toggle a flag to place the product in the matching homepage section. A
          product must be published and marked “On homepage” to appear.
        </p>

        <Card className="mt-6 rounded-lg border-border/70 shadow-none">
          <CardContent className="px-4 py-2 md:px-6">
            {productsQuery.isLoading ? (
              <div
                data-ocid="homepage.loading_state"
                className="flex flex-col gap-4 py-6"
              >
                {Array.from(
                  { length: 4 },
                  (_, i) => `homepage-skeleton-${i}`,
                ).map((id) => (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-4"
                  >
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-6 w-64" />
                  </div>
                ))}
              </div>
            ) : productsQuery.isError ? (
              <div
                data-ocid="homepage.error_state"
                className="flex flex-col items-center gap-3 py-12 text-center"
              >
                <AlertCircle
                  className="h-8 w-8 text-destructive"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  We could not load the catalogue. Please try again.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="homepage.retry_button"
                  onClick={() => void productsQuery.refetch()}
                >
                  Retry
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div
                data-ocid="homepage.empty_state"
                className="flex flex-col items-center gap-3 py-12 text-center"
              >
                <PackageOpen
                  className="h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="font-display text-lg">
                  No published products yet
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Publish products in the catalogue to curate the homepage.
                </p>
              </div>
            ) : (
              <div data-ocid="homepage.product.list">
                {products.map((product, index) => (
                  <ProductFlagRow
                    key={product.id.toString()}
                    product={product}
                    index={index}
                    onToggle={handleToggle}
                    pendingFlag={pendingFlag}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Section previews ──────────────────────────────────── */}
      <div className="mt-16">
        <h2 className="font-display text-2xl tracking-tight">
          Current homepage sections
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A live preview of what visitors see in each section right now.
        </p>

        {sectionsQuery.isLoading ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }, (_, i) => `section-skeleton-${i}`).map(
              (id) => (
                <Skeleton key={id} className="h-48 w-full rounded-lg" />
              ),
            )}
          </div>
        ) : sectionsQuery.isError || !sections ? (
          <div
            data-ocid="homepage.sections.error_state"
            className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-12 text-center"
          >
            <AlertCircle
              className="h-8 w-8 text-destructive"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              We could not load the homepage sections.
            </p>
            <Button
              type="button"
              variant="outline"
              data-ocid="homepage.sections.retry_button"
              onClick={() => void sectionsQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <SectionPreview
                key={section.key}
                section={section}
                products={sections[section.key]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

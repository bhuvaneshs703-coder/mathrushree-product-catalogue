import {
  type CatalogueError,
  type Id,
  type Product,
  type ProductFilter,
  PublishState,
} from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllProducts,
  useDeleteProduct,
  useDuplicateProduct,
  useIsCallerAdmin,
  useSetPublishState,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import {
  Archive,
  ArchiveRestore,
  Copy,
  Loader2,
  PackageOpen,
  Pencil,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

/* ── Constants ──────────────────────────────────────────────── */

type StateFilter = "all" | PublishState;

const STATE_FILTERS: { value: StateFilter; label: string }[] = [
  { value: "all", label: "All states" },
  { value: PublishState.draft, label: "Draft" },
  { value: PublishState.published, label: "Published" },
  { value: PublishState.archived, label: "Archived" },
];

const PUBLISH_LABEL: Record<PublishState, string> = {
  [PublishState.draft]: "Draft",
  [PublishState.published]: "Published",
  [PublishState.archived]: "Archived",
};

const PUBLISH_BADGE_CLASS: Record<PublishState, string> = {
  [PublishState.draft]: "border-warning/50 bg-warning/10 text-foreground",
  [PublishState.published]: "border-success/50 bg-success/10 text-foreground",
  [PublishState.archived]: "border-border bg-muted text-muted-foreground",
};

/* ── Helpers ────────────────────────────────────────────────── */

function errorMessage(error: CatalogueError): string | null {
  switch (error.__kind__) {
    case "ok":
      return null;
    case "duplicateSku":
      return `SKU "${error.duplicateSku}" is already in use.`;
    case "invalidInput":
      return error.invalidInput;
    case "notFound":
      return "This product could not be found. It may have been removed.";
    case "unauthorized":
      return "You do not have permission to change products.";
  }
}

function formatPrice(price: bigint | undefined): string {
  if (price === undefined) return "Enquire for price";
  return `₹${price.toLocaleString("en-IN")}`;
}

/* ── Row actions ────────────────────────────────────────────── */

function PublishActions({
  product,
  position,
  onSetState,
  pending,
}: {
  product: Product;
  position: number;
  onSetState: (state: PublishState) => void;
  pending: boolean;
}) {
  const state = product.publishState;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {state !== PublishState.published ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => onSetState(PublishState.published)}
          data-ocid={`owner.products.publish_button.${position}`}
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Publish
        </Button>
      ) : null}
      {state !== PublishState.draft ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => onSetState(PublishState.draft)}
          data-ocid={`owner.products.draft_button.${position}`}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Move to draft
        </Button>
      ) : null}
      {state !== PublishState.archived ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => onSetState(PublishState.archived)}
          data-ocid={`owner.products.archive_button.${position}`}
        >
          <Archive className="h-3.5 w-3.5" aria-hidden="true" />
          Archive
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => onSetState(PublishState.draft)}
          data-ocid={`owner.products.restore_button.${position}`}
        >
          <ArchiveRestore className="h-3.5 w-3.5" aria-hidden="true" />
          Restore
        </Button>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function OwnerProducts() {
  useSeo("Products", "Manage every catalogue product, including drafts.");

  const adminQuery = useIsCallerAdmin();
  const isAdmin = adminQuery.data === true;

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);

  const filter = useMemo<ProductFilter>(() => {
    const next: ProductFilter = {};
    const trimmed = search.trim();
    if (trimmed) next.search = trimmed;
    if (stateFilter !== "all") next.publishState = stateFilter;
    return next;
  }, [search, stateFilter]);

  const productsQuery = useAllProducts(filter);
  const deleteProduct = useDeleteProduct();
  const duplicateProduct = useDuplicateProduct();
  const setPublishState = useSetPublishState();

  const products = productsQuery.data?.products ?? [];
  const isFiltered = search.trim().length > 0 || stateFilter !== "all";

  function handleDelete() {
    if (!pendingDelete) return;
    const target = pendingDelete;
    deleteProduct.mutate(target.id, {
      onSuccess: (result) => {
        const message = errorMessage(result);
        if (message) {
          toast.error(message);
          return;
        }
        toast.success(`Deleted “${target.name}”.`);
        setPendingDelete(null);
      },
      onError: () => {
        toast.error("Could not delete the product. Please try again.");
      },
    });
  }

  function handleDuplicate(product: Product) {
    duplicateProduct.mutate(product.id, {
      onSuccess: (result) => {
        const message = errorMessage(result);
        if (message) {
          toast.error(message);
          return;
        }
        toast.success(`Duplicated “${product.name}”.`);
      },
      onError: () => {
        toast.error("Could not duplicate the product. Please try again.");
      },
    });
  }

  function handleSetState(product: Product, state: PublishState) {
    setPublishState.mutate(
      { id: product.id, state },
      {
        onSuccess: (result) => {
          const message = errorMessage(result);
          if (message) {
            toast.error(message);
            return;
          }
          toast.success(
            `“${product.name}” is now ${PUBLISH_LABEL[state].toLowerCase()}.`,
          );
        },
        onError: () => {
          toast.error("Could not update the publish state. Please try again.");
        },
      },
    );
  }

  /* ── Access gate ──────────────────────────────────────────── */

  if (adminQuery.isLoading) {
    return (
      <section
        data-ocid="owner.products.loading_state"
        className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-24 text-muted-foreground md:px-8"
      >
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        Checking owner access…
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section
        data-ocid="owner.products.denied_state"
        className="mx-auto w-full max-w-3xl px-4 py-24 md:px-8"
      >
        <div className="border border-destructive/40 bg-destructive/5 px-6 py-8">
          <ShieldAlert
            className="h-6 w-6 text-destructive"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-display text-3xl tracking-tight">
            Owner access required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The product list is reserved for the signed-in owner. Sign in with
            the approved Internet Identity to manage the catalogue.
          </p>
          <Button asChild className="mt-6">
            <Link to="/owner/sign-in" data-ocid="owner.products.signin_link">
              Go to owner sign in
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  /* ── List ─────────────────────────────────────────────────── */

  return (
    <section
      data-ocid="owner.products.page"
      className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16"
    >
      <div className="flex flex-col gap-6 border-b border-accent/30 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="label-caps text-accent">Private Ledger</p>
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            Products
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Every catalogue entry, including drafts and archived products.
          </p>
        </div>
        <Button asChild data-ocid="owner.products.add_button">
          <Link to="/owner/products/$productId" params={{ productId: "new" }}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add product
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or SKU"
            aria-label="Search products by name or SKU"
            data-ocid="owner.products.search_input"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor="publish-filter"
            className="label-caps text-muted-foreground"
          >
            State
          </label>
          <Select
            value={stateFilter}
            onValueChange={(value) => setStateFilter(value as StateFilter)}
          >
            <SelectTrigger
              id="publish-filter"
              data-ocid="owner.products.state_filter"
              className="w-44"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATE_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8">
        {productsQuery.isLoading ? (
          <div
            data-ocid="owner.products.loading_state"
            className="flex flex-col gap-3"
          >
            {Array.from({ length: 5 }, (_, i) => `product-skeleton-${i}`).map(
              (id) => (
                <Skeleton key={id} className="h-20 w-full rounded-md" />
              ),
            )}
          </div>
        ) : productsQuery.isError ? (
          <div
            data-ocid="owner.products.error_state"
            role="alert"
            className="border border-destructive/40 bg-destructive/5 px-6 py-8 text-center"
          >
            <h2 className="font-display text-xl">Could not load products</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while fetching the catalogue. Please try
              again.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-5"
              onClick={() => void productsQuery.refetch()}
              data-ocid="owner.products.retry_button"
            >
              Retry
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div
            data-ocid="owner.products.empty_state"
            className="border border-dashed border-border bg-muted/30 px-6 py-16 text-center"
          >
            <PackageOpen
              className="mx-auto h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 className="mt-4 font-display text-2xl">
              {isFiltered ? "No matching products" : "No products yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {isFiltered
                ? "No products match your search or filter. Try a different term or state."
                : "Your catalogue is empty. Add your first product to get started."}
            </p>
            {isFiltered ? (
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearch("");
                  setStateFilter("all");
                }}
                data-ocid="owner.products.clear_filters_button"
              >
                Clear filters
              </Button>
            ) : (
              <Button asChild className="mt-6">
                <Link
                  to="/owner/products/$productId"
                  params={{ productId: "new" }}
                  data-ocid="owner.products.empty_add_button"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add product
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <ul data-ocid="owner.products.list" className="flex flex-col gap-3">
            {products.map((product, index) => {
              const rowPending =
                (duplicateProduct.isPending &&
                  duplicateProduct.variables === product.id) ||
                (deleteProduct.isPending &&
                  deleteProduct.variables === product.id) ||
                (setPublishState.isPending &&
                  setPublishState.variables?.id === product.id);
              return (
                <li
                  key={product.id.toString()}
                  data-ocid={`owner.products.item.${index + 1}`}
                  className="flex flex-col gap-4 border border-border bg-card p-4 shadow-subtle md:flex-row md:items-center md:justify-between md:p-5"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="min-w-0 truncate font-display text-lg">
                        {product.name}
                      </h2>
                      <Badge
                        variant="outline"
                        className={PUBLISH_BADGE_CLASS[product.publishState]}
                        data-ocid={`owner.products.state_badge.${index + 1}`}
                      >
                        {PUBLISH_LABEL[product.publishState]}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-mono text-xs">
                        SKU {product.sku}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        data-ocid={`owner.products.edit_button.${index + 1}`}
                      >
                        <Link
                          to="/owner/products/$productId"
                          params={{ productId: product.id.toString() }}
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          Rename / Edit
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={rowPending}
                        onClick={() => handleDuplicate(product)}
                        data-ocid={`owner.products.duplicate_button.${index + 1}`}
                      >
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Duplicate
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={rowPending}
                        onClick={() => setPendingDelete(product)}
                        data-ocid={`owner.products.delete_button.${index + 1}`}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Delete
                      </Button>
                    </div>
                    <PublishActions
                      product={product}
                      position={index + 1}
                      pending={rowPending}
                      onSetState={(state) => handleSetState(product, state)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <AlertDialogContent data-ocid="owner.products.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `“${pendingDelete.name}” (SKU ${pendingDelete.sku}) will be permanently removed from the catalogue. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="owner.products.delete_cancel_button"
              disabled={deleteProduct.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="owner.products.delete_confirm_button"
              disabled={deleteProduct.isPending}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProduct.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : null}
              Delete product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

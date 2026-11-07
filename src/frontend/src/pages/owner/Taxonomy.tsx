import type {
  Brand,
  Category,
  Collection,
  Id,
  Product,
  Subcategory,
} from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAssignProductToCollection,
  useBrands,
  useCategories,
  useCollections,
  useCreateBrand,
  useCreateCategory,
  useCreateCollection,
  useCreateSubcategory,
  useDeleteBrand,
  useDeleteCategory,
  useDeleteCollection,
  useDeleteSubcategory,
  usePublishedProducts,
  useRemoveProductFromCollection,
  useUpdateBrand,
  useUpdateCategory,
  useUpdateCollection,
  useUpdateSubcategory,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

/* ── Shared helpers ─────────────────────────────────────────── */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

type Feedback = { kind: "success" | "error"; text: string } | null;

function FeedbackBanner({
  feedback,
  ocid,
}: {
  feedback: Feedback;
  ocid: string;
}) {
  if (!feedback) return null;
  const isSuccess = feedback.kind === "success";
  return (
    <output
      data-ocid={ocid}
      aria-live="polite"
      className={cn(
        "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
        isSuccess
          ? "border-accent/50 bg-accent/10 text-foreground"
          : "border-destructive/40 bg-destructive/10 text-foreground",
      )}
    >
      {isSuccess ? (
        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      ) : (
        <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
      )}
      <span className="min-w-0 break-words">{feedback.text}</span>
    </output>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6">
      <p className="label-caps text-accent">{label}</p>
      <h2 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
        {title}
      </h2>
      <span aria-hidden className="mt-3 block h-px w-16 bg-accent/60" />
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

function EmptyState({
  ocid,
  title,
  hint,
}: {
  ocid: string;
  title: string;
  hint: string;
}) {
  return (
    <div
      data-ocid={ocid}
      className="rounded-md border border-dashed border-border bg-muted/30 px-6 py-10 text-center"
    >
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

function LoadingRows({ ocid }: { ocid: string }) {
  const ids = Array.from({ length: 3 }, (_, i) => `taxonomy-skeleton-${i}`);
  return (
    <div data-ocid={ocid} className="space-y-3" aria-hidden>
      {ids.map((id) => (
        <div
          key={id}
          className="h-16 animate-pulse rounded-md border border-border bg-muted/40"
        />
      ))}
    </div>
  );
}

/* ── Inline rename control ──────────────────────────────────── */

function RenameField({
  initialValue,
  pending,
  onCancel,
  onSubmit,
  ocid,
}: {
  initialValue: string;
  pending: boolean;
  onCancel: () => void;
  onSubmit: (value: string) => void;
  ocid: string;
}) {
  const [value, setValue] = useState(initialValue);
  const trimmed = value.trim();

  return (
    <form
      className="flex flex-1 flex-wrap items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (!trimmed || pending) return;
        onSubmit(trimmed);
      }}
    >
      <Input
        data-ocid={`${ocid}.input`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="New name"
        className="h-9 min-w-0 flex-1"
        autoFocus
      />
      <Button
        data-ocid={`${ocid}.save_button`}
        type="submit"
        size="sm"
        disabled={!trimmed || pending}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Check className="size-4" aria-hidden />
        )}
        Save
      </Button>
      <Button
        data-ocid={`${ocid}.cancel_button`}
        type="button"
        size="sm"
        variant="ghost"
        onClick={onCancel}
        disabled={pending}
      >
        Cancel
      </Button>
    </form>
  );
}

/* ── Categories section ─────────────────────────────────────── */

function CategoriesSection() {
  const categoriesQuery = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const createSubcategory = useCreateSubcategory();
  const updateSubcategory = useUpdateSubcategory();
  const deleteSubcategory = useDeleteSubcategory();

  const [feedback, setFeedback] = useState<Feedback>(null);
  const [newCategory, setNewCategory] = useState("");
  const [renamingId, setRenamingId] = useState<Id | null>(null);
  const [expandedId, setExpandedId] = useState<Id | null>(null);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [renamingSubId, setRenamingSubId] = useState<Id | null>(null);

  const categories = categoriesQuery.data ?? [];

  function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    const name = newCategory.trim();
    if (!name) return;
    const draft: Category = {
      id: 0n,
      name,
      slug: slugify(name),
      order: BigInt(categories.length),
      subcategories: [],
    };
    setNewCategory("");
    createCategory.mutate(draft, {
      onSuccess: () =>
        setFeedback({ kind: "success", text: `Category “${name}” created.` }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleRenameCategory(category: Category, name: string) {
    updateCategory.mutate(
      { ...category, name, slug: slugify(name) },
      {
        onSuccess: () => {
          setRenamingId(null);
          setFeedback({
            kind: "success",
            text: `Category renamed to “${name}”.`,
          });
        },
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  function handleDeleteCategory(category: Category) {
    deleteCategory.mutate(category.id, {
      onSuccess: () =>
        setFeedback({
          kind: "success",
          text: `Category “${category.name}” deleted.`,
        }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleCreateSubcategory(category: Category, event: React.FormEvent) {
    event.preventDefault();
    const name = newSubcategory.trim();
    if (!name) return;
    const draft: Subcategory = {
      id: 0n,
      categoryId: category.id,
      name,
      slug: slugify(name),
      order: BigInt(category.subcategories.length),
    };
    setNewSubcategory("");
    createSubcategory.mutate(draft, {
      onSuccess: () =>
        setFeedback({ kind: "success", text: `Subcategory “${name}” added.` }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleRenameSubcategory(subcategory: Subcategory, name: string) {
    updateSubcategory.mutate(
      { ...subcategory, name, slug: slugify(name) },
      {
        onSuccess: () => {
          setRenamingSubId(null);
          setFeedback({
            kind: "success",
            text: `Subcategory renamed to “${name}”.`,
          });
        },
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  function handleDeleteSubcategory(subcategory: Subcategory) {
    deleteSubcategory.mutate(subcategory.id, {
      onSuccess: () =>
        setFeedback({
          kind: "success",
          text: `Subcategory “${subcategory.name}” deleted.`,
        }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  return (
    <section
      data-ocid="taxonomy.categories.section"
      aria-labelledby="taxonomy-categories"
    >
      <SectionHeading
        label="Section 01"
        title="Categories & Subcategories"
        description="Group the catalogue into top-level categories, then nest subcategories beneath each one."
      />

      <form
        className="mb-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={handleCreateCategory}
      >
        <Label htmlFor="new-category" className="sr-only">
          New category name
        </Label>
        <Input
          id="new-category"
          data-ocid="taxonomy.category.input"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="e.g. Writing Instruments"
          className="h-10 flex-1"
        />
        <Button
          data-ocid="taxonomy.category.add_button"
          type="submit"
          className="h-10"
          disabled={!newCategory.trim() || createCategory.isPending}
        >
          {createCategory.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Plus className="size-4" aria-hidden />
          )}
          Add category
        </Button>
      </form>

      <FeedbackBanner feedback={feedback} ocid="taxonomy.categories.feedback" />

      <div className="mt-4">
        {categoriesQuery.isLoading ? (
          <LoadingRows ocid="taxonomy.categories.loading_state" />
        ) : categories.length === 0 ? (
          <EmptyState
            ocid="taxonomy.categories.empty_state"
            title="No categories yet"
            hint="Add your first category above to start organising the catalogue."
          />
        ) : (
          <ul data-ocid="taxonomy.categories.list" className="space-y-3">
            {categories.map((category, index) => {
              const isRenaming = renamingId === category.id;
              const isExpanded = expandedId === category.id;
              return (
                <li
                  key={category.id.toString()}
                  data-ocid={`taxonomy.category.item.${index + 1}`}
                  className="rounded-md border border-border bg-card shadow-subtle"
                >
                  <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                    {isRenaming ? (
                      <RenameField
                        ocid={`taxonomy.category.rename.${index + 1}`}
                        initialValue={category.name}
                        pending={updateCategory.isPending}
                        onCancel={() => setRenamingId(null)}
                        onSubmit={(name) =>
                          handleRenameCategory(category, name)
                        }
                      />
                    ) : (
                      <>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-lg text-foreground">
                            {category.name}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">
                            {category.slug} · {category.subcategories.length}{" "}
                            subcategor
                            {category.subcategories.length === 1 ? "y" : "ies"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            data-ocid={`taxonomy.category.edit_button.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setRenamingId(category.id)}
                            aria-label={`Rename ${category.name}`}
                          >
                            <Pencil className="size-4" aria-hidden />
                          </Button>
                          <Button
                            data-ocid={`taxonomy.category.delete_button.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteCategory(category)}
                            disabled={deleteCategory.isPending}
                            aria-label={`Delete ${category.name}`}
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </Button>
                          <Button
                            data-ocid={`taxonomy.category.toggle.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : category.id)
                            }
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? "Hide" : "Show"} subcategories for ${category.name}`}
                          >
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {isExpanded && !isRenaming && (
                    <div className="border-t border-border bg-muted/30 px-4 py-4">
                      <p className="label-caps mb-3 text-muted-foreground">
                        Subcategories
                      </p>
                      {category.subcategories.length === 0 ? (
                        <p
                          data-ocid={`taxonomy.subcategory.empty_state.${index + 1}`}
                          className="mb-3 text-sm text-muted-foreground"
                        >
                          No subcategories yet.
                        </p>
                      ) : (
                        <ul className="mb-3 space-y-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <li
                              key={sub.id.toString()}
                              data-ocid={`taxonomy.subcategory.item.${index + 1}.${subIndex + 1}`}
                              className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
                            >
                              {renamingSubId === sub.id ? (
                                <RenameField
                                  ocid={`taxonomy.subcategory.rename.${index + 1}.${subIndex + 1}`}
                                  initialValue={sub.name}
                                  pending={updateSubcategory.isPending}
                                  onCancel={() => setRenamingSubId(null)}
                                  onSubmit={(name) =>
                                    handleRenameSubcategory(sub, name)
                                  }
                                />
                              ) : (
                                <>
                                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                                    {sub.name}
                                  </span>
                                  <Button
                                    data-ocid={`taxonomy.subcategory.edit_button.${index + 1}.${subIndex + 1}`}
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setRenamingSubId(sub.id)}
                                    aria-label={`Rename ${sub.name}`}
                                  >
                                    <Pencil className="size-4" aria-hidden />
                                  </Button>
                                  <Button
                                    data-ocid={`taxonomy.subcategory.delete_button.${index + 1}.${subIndex + 1}`}
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => handleDeleteSubcategory(sub)}
                                    disabled={deleteSubcategory.isPending}
                                    aria-label={`Delete ${sub.name}`}
                                  >
                                    <Trash2 className="size-4" aria-hidden />
                                  </Button>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      <form
                        className="flex flex-col gap-2 sm:flex-row"
                        onSubmit={(event) =>
                          handleCreateSubcategory(category, event)
                        }
                      >
                        <Label
                          htmlFor={`new-subcategory-${category.id}`}
                          className="sr-only"
                        >
                          New subcategory name
                        </Label>
                        <Input
                          id={`new-subcategory-${category.id}`}
                          data-ocid={`taxonomy.subcategory.input.${index + 1}`}
                          value={newSubcategory}
                          onChange={(event) =>
                            setNewSubcategory(event.target.value)
                          }
                          placeholder="e.g. Fountain Pens"
                          className="h-9 flex-1"
                        />
                        <Button
                          data-ocid={`taxonomy.subcategory.add_button.${index + 1}`}
                          type="submit"
                          size="sm"
                          disabled={
                            !newSubcategory.trim() ||
                            createSubcategory.isPending
                          }
                        >
                          <Plus className="size-4" aria-hidden />
                          Add subcategory
                        </Button>
                      </form>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ── Brands section ─────────────────────────────────────────── */

function BrandsSection() {
  const brandsQuery = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const [feedback, setFeedback] = useState<Feedback>(null);
  const [newBrand, setNewBrand] = useState("");
  const [renamingId, setRenamingId] = useState<Id | null>(null);

  const brands = brandsQuery.data ?? [];

  function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    const name = newBrand.trim();
    if (!name) return;
    const draft: Brand = { id: 0n, name, slug: slugify(name) };
    setNewBrand("");
    createBrand.mutate(draft, {
      onSuccess: () =>
        setFeedback({ kind: "success", text: `Brand “${name}” created.` }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleRename(brand: Brand, name: string) {
    updateBrand.mutate(
      { ...brand, name, slug: slugify(name) },
      {
        onSuccess: () => {
          setRenamingId(null);
          setFeedback({ kind: "success", text: `Brand renamed to “${name}”.` });
        },
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  function handleDelete(brand: Brand) {
    deleteBrand.mutate(brand.id, {
      onSuccess: () =>
        setFeedback({
          kind: "success",
          text: `Brand “${brand.name}” deleted.`,
        }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  return (
    <section
      data-ocid="taxonomy.brands.section"
      aria-labelledby="taxonomy-brands"
    >
      <SectionHeading
        label="Section 02"
        title="Brands"
        description="Maintain the makers and houses represented in the catalogue."
      />

      <form
        className="mb-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={handleCreate}
      >
        <Label htmlFor="new-brand" className="sr-only">
          New brand name
        </Label>
        <Input
          id="new-brand"
          data-ocid="taxonomy.brand.input"
          value={newBrand}
          onChange={(event) => setNewBrand(event.target.value)}
          placeholder="e.g. Kaweco"
          className="h-10 flex-1"
        />
        <Button
          data-ocid="taxonomy.brand.add_button"
          type="submit"
          className="h-10"
          disabled={!newBrand.trim() || createBrand.isPending}
        >
          {createBrand.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Plus className="size-4" aria-hidden />
          )}
          Add brand
        </Button>
      </form>

      <FeedbackBanner feedback={feedback} ocid="taxonomy.brands.feedback" />

      <div className="mt-4">
        {brandsQuery.isLoading ? (
          <LoadingRows ocid="taxonomy.brands.loading_state" />
        ) : brands.length === 0 ? (
          <EmptyState
            ocid="taxonomy.brands.empty_state"
            title="No brands yet"
            hint="Add the first brand above to attribute your products."
          />
        ) : (
          <ul data-ocid="taxonomy.brands.list" className="space-y-3">
            {brands.map((brand, index) => (
              <li
                key={brand.id.toString()}
                data-ocid={`taxonomy.brand.item.${index + 1}`}
                className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-subtle"
              >
                {renamingId === brand.id ? (
                  <RenameField
                    ocid={`taxonomy.brand.rename.${index + 1}`}
                    initialValue={brand.name}
                    pending={updateBrand.isPending}
                    onCancel={() => setRenamingId(null)}
                    onSubmit={(name) => handleRename(brand, name)}
                  />
                ) : (
                  <>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg text-foreground">
                        {brand.name}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {brand.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        data-ocid={`taxonomy.brand.edit_button.${index + 1}`}
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setRenamingId(brand.id)}
                        aria-label={`Rename ${brand.name}`}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </Button>
                      <Button
                        data-ocid={`taxonomy.brand.delete_button.${index + 1}`}
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(brand)}
                        disabled={deleteBrand.isPending}
                        aria-label={`Delete ${brand.name}`}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ── Collections section ────────────────────────────────────── */

function CollectionsSection() {
  const collectionsQuery = useCollections();
  const productsQuery = usePublishedProducts({ pageSize: 200n });
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();
  const assignProduct = useAssignProductToCollection();
  const removeProduct = useRemoveProductFromCollection();

  const [feedback, setFeedback] = useState<Feedback>(null);
  const [newCollection, setNewCollection] = useState("");
  const [renamingId, setRenamingId] = useState<Id | null>(null);
  const [expandedId, setExpandedId] = useState<Id | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("");

  const collections = collectionsQuery.data ?? [];
  const products: Product[] = productsQuery.data?.products ?? [];
  const productById = new Map(products.map((p) => [p.id.toString(), p]));

  function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    const name = newCollection.trim();
    if (!name) return;
    const draft: Collection = {
      id: 0n,
      name,
      slug: slugify(name),
      productIds: [],
      order: BigInt(collections.length),
    };
    setNewCollection("");
    createCollection.mutate(draft, {
      onSuccess: () =>
        setFeedback({ kind: "success", text: `Collection “${name}” created.` }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleRename(collection: Collection, name: string) {
    updateCollection.mutate(
      { ...collection, name, slug: slugify(name) },
      {
        onSuccess: () => {
          setRenamingId(null);
          setFeedback({
            kind: "success",
            text: `Collection renamed to “${name}”.`,
          });
        },
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  function handleDelete(collection: Collection) {
    deleteCollection.mutate(collection.id, {
      onSuccess: () =>
        setFeedback({
          kind: "success",
          text: `Collection “${collection.name}” deleted.`,
        }),
      onError: (error) =>
        setFeedback({ kind: "error", text: errorMessage(error) }),
    });
  }

  function handleAssign(collection: Collection, event: React.FormEvent) {
    event.preventDefault();
    if (!selectedProduct) return;
    const productId = BigInt(selectedProduct);
    const productName = productById.get(selectedProduct)?.name ?? "Product";
    setSelectedProduct("");
    assignProduct.mutate(
      { collectionId: collection.id, productId },
      {
        onSuccess: () =>
          setFeedback({
            kind: "success",
            text: `“${productName}” added to “${collection.name}”.`,
          }),
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  function handleRemove(collection: Collection, productId: Id) {
    const productName =
      productById.get(productId.toString())?.name ?? "Product";
    removeProduct.mutate(
      { collectionId: collection.id, productId },
      {
        onSuccess: () =>
          setFeedback({
            kind: "success",
            text: `“${productName}” removed from “${collection.name}”.`,
          }),
        onError: (error) =>
          setFeedback({ kind: "error", text: errorMessage(error) }),
      },
    );
  }

  return (
    <section
      data-ocid="taxonomy.collections.section"
      aria-labelledby="taxonomy-collections"
    >
      <SectionHeading
        label="Section 03"
        title="Collections"
        description="Curate editorial groupings and assign published products to each collection."
      />

      <form
        className="mb-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={handleCreate}
      >
        <Label htmlFor="new-collection" className="sr-only">
          New collection name
        </Label>
        <Input
          id="new-collection"
          data-ocid="taxonomy.collection.input"
          value={newCollection}
          onChange={(event) => setNewCollection(event.target.value)}
          placeholder="e.g. Autumn Desk Edit"
          className="h-10 flex-1"
        />
        <Button
          data-ocid="taxonomy.collection.add_button"
          type="submit"
          className="h-10"
          disabled={!newCollection.trim() || createCollection.isPending}
        >
          {createCollection.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Plus className="size-4" aria-hidden />
          )}
          Add collection
        </Button>
      </form>

      <FeedbackBanner
        feedback={feedback}
        ocid="taxonomy.collections.feedback"
      />

      <div className="mt-4">
        {collectionsQuery.isLoading ? (
          <LoadingRows ocid="taxonomy.collections.loading_state" />
        ) : collections.length === 0 ? (
          <EmptyState
            ocid="taxonomy.collections.empty_state"
            title="No collections yet"
            hint="Create a collection above, then assign products to it."
          />
        ) : (
          <ul data-ocid="taxonomy.collections.list" className="space-y-3">
            {collections.map((collection, index) => {
              const isRenaming = renamingId === collection.id;
              const isExpanded = expandedId === collection.id;
              const assigned = collection.productIds;
              const available = products.filter(
                (p) => !assigned.some((id) => id === p.id),
              );
              return (
                <li
                  key={collection.id.toString()}
                  data-ocid={`taxonomy.collection.item.${index + 1}`}
                  className="rounded-md border border-border bg-card shadow-subtle"
                >
                  <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                    {isRenaming ? (
                      <RenameField
                        ocid={`taxonomy.collection.rename.${index + 1}`}
                        initialValue={collection.name}
                        pending={updateCollection.isPending}
                        onCancel={() => setRenamingId(null)}
                        onSubmit={(name) => handleRename(collection, name)}
                      />
                    ) : (
                      <>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-lg text-foreground">
                            {collection.name}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">
                            {collection.slug} · {assigned.length} product
                            {assigned.length === 1 ? "" : "s"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            data-ocid={`taxonomy.collection.edit_button.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setRenamingId(collection.id)}
                            aria-label={`Rename ${collection.name}`}
                          >
                            <Pencil className="size-4" aria-hidden />
                          </Button>
                          <Button
                            data-ocid={`taxonomy.collection.delete_button.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(collection)}
                            disabled={deleteCollection.isPending}
                            aria-label={`Delete ${collection.name}`}
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </Button>
                          <Button
                            data-ocid={`taxonomy.collection.toggle.${index + 1}`}
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : collection.id)
                            }
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? "Hide" : "Show"} products for ${collection.name}`}
                          >
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {isExpanded && !isRenaming && (
                    <div className="border-t border-border bg-muted/30 px-4 py-4">
                      <p className="label-caps mb-3 text-muted-foreground">
                        Assigned products
                      </p>
                      {assigned.length === 0 ? (
                        <p
                          data-ocid={`taxonomy.collection.products_empty_state.${index + 1}`}
                          className="mb-3 text-sm text-muted-foreground"
                        >
                          No products assigned yet.
                        </p>
                      ) : (
                        <ul className="mb-3 space-y-2">
                          {assigned.map((productId, productIndex) => {
                            const product = productById.get(
                              productId.toString(),
                            );
                            return (
                              <li
                                key={productId.toString()}
                                data-ocid={`taxonomy.collection.product.${index + 1}.${productIndex + 1}`}
                                className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
                              >
                                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                                  {product?.name ?? `Product #${productId}`}
                                </span>
                                {product && (
                                  <span className="font-mono text-xs text-muted-foreground">
                                    {product.sku}
                                  </span>
                                )}
                                <Button
                                  data-ocid={`taxonomy.collection.remove_button.${index + 1}.${productIndex + 1}`}
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() =>
                                    handleRemove(collection, productId)
                                  }
                                  disabled={removeProduct.isPending}
                                  aria-label={`Remove ${product?.name ?? "product"} from ${collection.name}`}
                                >
                                  <X className="size-4" aria-hidden />
                                  Remove
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      <form
                        className="flex flex-col gap-2 sm:flex-row"
                        onSubmit={(event) => handleAssign(collection, event)}
                      >
                        <Label
                          htmlFor={`assign-product-${collection.id}`}
                          className="sr-only"
                        >
                          Product to assign
                        </Label>
                        <select
                          id={`assign-product-${collection.id}`}
                          data-ocid={`taxonomy.collection.product_select.${index + 1}`}
                          value={selectedProduct}
                          onChange={(event) =>
                            setSelectedProduct(event.target.value)
                          }
                          className="h-9 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                          <option value="">Select a product…</option>
                          {available.map((product) => (
                            <option
                              key={product.id.toString()}
                              value={product.id.toString()}
                            >
                              {product.name} — {product.sku}
                            </option>
                          ))}
                        </select>
                        <Button
                          data-ocid={`taxonomy.collection.assign_button.${index + 1}`}
                          type="submit"
                          size="sm"
                          disabled={!selectedProduct || assignProduct.isPending}
                        >
                          <Plus className="size-4" aria-hidden />
                          Assign product
                        </Button>
                      </form>
                      {available.length === 0 && products.length > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          All published products are already in this collection.
                        </p>
                      )}
                      {products.length === 0 && !productsQuery.isLoading && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          No published products available to assign yet.
                        </p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function OwnerTaxonomy() {
  useSeo(
    "Taxonomy",
    "Manage categories, subcategories, brands and collections.",
  );

  return (
    <div
      data-ocid="owner.taxonomy.page"
      className="mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-24"
    >
      <header className="mb-12 border-b border-border pb-8">
        <p className="label-caps text-accent">Owner Console</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          Taxonomy
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Shape how the catalogue is organised — categories and subcategories,
          the brands you carry, and the curated collections that group products
          for your customers.
        </p>
      </header>

      <div className="space-y-16 md:space-y-24">
        <CategoriesSection />
        <BrandsSection />
        <CollectionsSection />
      </div>
    </div>
  );
}

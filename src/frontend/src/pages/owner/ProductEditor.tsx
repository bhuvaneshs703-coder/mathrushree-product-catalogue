import {
  Availability,
  type CatalogueError,
  type Category,
  ExternalBlob,
  type Id,
  type Product,
  type ProductImage,
  PublishState,
  type Specification,
  type Variant,
} from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllProducts,
  useBrands,
  useCategories,
  useCreateCategory,
  useCreateProduct,
  useReorderProductImages,
  useUpdateProduct,
} from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

/* ── Constants ──────────────────────────────────────────────── */

const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
  { value: Availability.inStock, label: "In Stock" },
  { value: Availability.outOfStock, label: "Out of Stock" },
  { value: Availability.madeToOrder, label: "Made to Order" },
];

const PUBLISH_OPTIONS: { value: PublishState; label: string }[] = [
  { value: PublishState.draft, label: "Draft" },
  { value: PublishState.published, label: "Published" },
  { value: PublishState.archived, label: "Archived" },
];

const NEW_PRODUCT_ID = "new";

/* ── Draft types ────────────────────────────────────────────── */

type ImageDraft = {
  id: Id;
  blob: ExternalBlob;
  filename: string;
  altText: string;
};

type SpecDraft = { key: string; name: string; value: string };
type VariantDraft = {
  key: string;
  name: string;
  value: string;
  sku: string;
  availability: Availability;
};

type FormState = {
  name: string;
  sku: string;
  brandId: string;
  categoryId: string;
  subcategoryId: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  availability: Availability;
  publishState: PublishState;
  specifications: SpecDraft[];
  variants: VariantDraft[];
};

const EMPTY_FORM: FormState = {
  name: "",
  sku: "",
  brandId: "",
  categoryId: "",
  subcategoryId: "",
  shortDescription: "",
  longDescription: "",
  price: "",
  availability: Availability.inStock,
  publishState: PublishState.draft,
  specifications: [],
  variants: [],
};

/* ── Helpers ────────────────────────────────────────────────── */

let draftKeySeed = 0;
function nextDraftKey(prefix: string): string {
  draftKeySeed += 1;
  return `${prefix}-${draftKeySeed}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function errorMessage(error: CatalogueError): string | null {
  switch (error.__kind__) {
    case "ok":
      return null;
    case "duplicateSku":
      return `SKU "${error.duplicateSku}" is already in use. Choose a different SKU.`;
    case "invalidInput":
      return error.invalidInput;
    case "notFound":
      return "This product could not be found. It may have been removed.";
    case "unauthorized":
      return "You do not have permission to save products.";
  }
}

function productToForm(product: Product): FormState {
  return {
    name: product.name,
    sku: product.sku,
    brandId: product.brandId !== undefined ? product.brandId.toString() : "",
    categoryId: product.categoryId.toString(),
    subcategoryId:
      product.subcategoryId !== undefined
        ? product.subcategoryId.toString()
        : "",
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    price: product.price !== undefined ? product.price.toString() : "",
    availability: product.availability,
    publishState: product.publishState,
    specifications: product.specifications.map((spec) => ({
      key: nextDraftKey("spec"),
      name: spec.name,
      value: spec.value,
    })),
    variants: product.variants.map((variant) => ({
      key: nextDraftKey("variant"),
      name: variant.name,
      value: variant.value,
      sku: variant.sku ?? "",
      availability: variant.availability ?? product.availability,
    })),
  };
}

function productToImages(product: Product): ImageDraft[] {
  return [...product.images]
    .sort((a, b) => Number(a.order - b.order))
    .map((image) => ({
      id: image.id,
      blob: image.blob,
      filename: image.filename,
      altText: image.altText ?? "",
    }));
}

/* ── Field wrapper ──────────────────────────────────────────── */

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="label-caps text-muted-foreground">
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          data-ocid={`owner.product_editor.error.${id}`}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function OwnerProductEditor() {
  const params = useParams({ strict: false }) as { productId?: string };
  const rawId = params.productId ?? NEW_PRODUCT_ID;
  const isNew = rawId === NEW_PRODUCT_ID;
  const productId = useMemo(() => {
    if (isNew) return undefined;
    try {
      return BigInt(rawId);
    } catch {
      return undefined;
    }
  }, [isNew, rawId]);
  const invalidId = !isNew && productId === undefined;

  useSeo(
    isNew ? "New Product" : "Edit Product",
    "Create or edit a catalogue product.",
  );

  const navigate = useNavigate();
  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data;
  const { data: brands } = useBrands();
  const productQuery = useAllProducts(
    productId !== undefined ? { pageSize: 1000n } : {},
  );
  const existing = useMemo<Product | null>(() => {
    if (productId === undefined) return null;
    const page = productQuery.data;
    if (!page) return null;
    return page.products.find((item) => item.id === productId) ?? null;
  }, [productId, productQuery.data]);
  const isLoadingProduct = productQuery.isLoading;
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const reorderImages = useReorderProductImages();
  const createCategory = useCreateCategory();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [images, setImages] = useState<ImageDraft[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const initializedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* One-time initialization from the loaded product. */
  useEffect(() => {
    if (isNew || initializedRef.current || !existing) return;
    initializedRef.current = true;
    setForm(productToForm(existing));
    setImages(productToImages(existing));
  }, [isNew, existing]);

  const selectedCategory = useMemo(
    () => categories?.find((c) => c.id.toString() === form.categoryId),
    [categories, form.categoryId],
  );

  const subcategories = selectedCategory?.subcategories ?? [];

  const isSaving = createProduct.isPending || updateProduct.isPending;

  /* ── Field updates ────────────────────────────────────────── */

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  /* ── Create category inline ───────────────────────────────── */

  async function handleCreateCategory() {
    const name = newCategoryName.trim();
    if (!name) {
      setCategoryError("Enter a category name.");
      return;
    }
    setCategoryError(null);
    const slug = slugify(name);
    const draft: Category = {
      id: 0n,
      name,
      slug,
      order: BigInt(categories?.length ?? 0),
      subcategories: [],
    };
    try {
      const result = await createCategory.mutateAsync(draft);
      const message = errorMessage(result);
      if (message) {
        setCategoryError(message);
        return;
      }
      const refreshed = await categoriesQuery.refetch();
      const created = (refreshed.data ?? []).find(
        (category) => category.slug === slug,
      );
      if (created) {
        update("categoryId", created.id.toString());
        update("subcategoryId", "");
      }
      setNewCategoryName("");
      setShowCategoryForm(false);
      toast.success(`Category “${name}” created.`);
    } catch {
      setCategoryError("Could not create the category. Please try again.");
    }
  }

  /* ── Specifications ───────────────────────────────────────── */

  function addSpecification() {
    setForm((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        { key: nextDraftKey("spec"), name: "", value: "" },
      ],
    }));
    setSaved(false);
  }

  function updateSpecification(
    index: number,
    key: keyof SpecDraft,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [key]: value } : spec,
      ),
    }));
    setSaved(false);
  }

  function removeSpecification(index: number) {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  /* ── Variants ─────────────────────────────────────────────── */

  function addVariant() {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          key: nextDraftKey("variant"),
          name: "",
          value: "",
          sku: "",
          availability: prev.availability,
        },
      ],
    }));
    setSaved(false);
  }

  function updateVariant(
    index: number,
    key: keyof VariantDraft,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [key]: value } : variant,
      ),
    }));
    setSaved(false);
  }

  function removeVariant(index: number) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
    setSaved(false);
  }

  /* ── Images ───────────────────────────────────────────────── */

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const drafts = await Promise.all(
        files.map(async (file) => {
          const bytes = new Uint8Array(await file.arrayBuffer());
          const blob = ExternalBlob.fromBytes(bytes, file.type, file.name);
          return {
            id: BigInt(Date.now()) + BigInt(Math.floor(Math.random() * 100000)),
            blob,
            filename: file.name,
            altText: "",
          } satisfies ImageDraft;
        }),
      );
      setImages((prev) => [...prev, ...drafts]);
      setSaved(false);
    } catch {
      setFormError("One or more images could not be read. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
    setSaved(false);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  function updateImageAlt(index: number, altText: string) {
    setImages((prev) =>
      prev.map((image, i) => (i === index ? { ...image, altText } : image)),
    );
    setSaved(false);
  }

  /* ── Validation ───────────────────────────────────────────── */

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (!form.sku.trim()) next.sku = "SKU is required.";
    if (!form.categoryId) next.categoryId = "Choose a category.";
    if (form.price.trim()) {
      const parsed = Number(form.price);
      if (!Number.isFinite(parsed) || parsed < 0) {
        next.price = "Enter a valid non-negative price, or leave it empty.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  /* ── Submit ───────────────────────────────────────────────── */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSaved(false);
    if (!validate()) {
      setFormError("Please fix the highlighted fields before saving.");
      return;
    }

    const specifications: Specification[] = form.specifications
      .filter((spec) => spec.name.trim() || spec.value.trim())
      .map((spec) => ({ name: spec.name.trim(), value: spec.value.trim() }));

    const variants: Variant[] = form.variants
      .filter((variant) => variant.name.trim() || variant.value.trim())
      .map((variant) => ({
        name: variant.name.trim(),
        value: variant.value.trim(),
        sku: variant.sku.trim() ? variant.sku.trim() : undefined,
        availability: variant.availability,
      }));

    const productImages: ProductImage[] = images.map((image, index) => ({
      id: image.id,
      blob: image.blob,
      filename: image.filename,
      altText: image.altText.trim() ? image.altText.trim() : undefined,
      order: BigInt(index),
    }));

    const priceValue = form.price.trim()
      ? BigInt(form.price.trim())
      : undefined;

    const payload: Product = {
      id: existing?.id ?? 0n,
      name: form.name.trim(),
      sku: form.sku.trim(),
      brandId: form.brandId ? BigInt(form.brandId) : undefined,
      categoryId: BigInt(form.categoryId),
      subcategoryId: form.subcategoryId
        ? BigInt(form.subcategoryId)
        : undefined,
      shortDescription: form.shortDescription.trim(),
      longDescription: form.longDescription.trim(),
      specifications,
      variants,
      availability: form.availability,
      price: priceValue,
      images: productImages,
      publishState: form.publishState,
      isTrending: existing?.isTrending ?? false,
      isNewArrival: existing?.isNewArrival ?? false,
      isBestseller: existing?.isBestseller ?? false,
      isFeatured: existing?.isFeatured ?? false,
      showOnHomepage: existing?.showOnHomepage ?? false,
      createdAt: existing?.createdAt ?? 0n,
      updatedAt: existing?.updatedAt ?? 0n,
    };

    try {
      const result = isNew
        ? await createProduct.mutateAsync(payload)
        : await updateProduct.mutateAsync(payload);
      const message = errorMessage(result);
      if (message) {
        setFormError(message);
        toast.error(message);
        return;
      }

      if (!isNew && existing) {
        const order = productImages.map((image) => image.id);
        const reorderResult = await reorderImages.mutateAsync({
          productId: existing.id,
          imageIds: order,
        });
        const reorderMessage = errorMessage(reorderResult);
        if (reorderMessage) {
          setFormError(reorderMessage);
          toast.error(reorderMessage);
          return;
        }
      }

      setSaved(true);
      toast.success(isNew ? "Product created." : "Product saved.");
      if (isNew) {
        void navigate({ to: "/owner/products" });
      }
    } catch {
      const message = "Could not save the product. Please try again.";
      setFormError(message);
      toast.error(message);
    }
  }

  /* ── Loading / not found ──────────────────────────────────── */

  if (!isNew && isLoadingProduct) {
    return (
      <section
        data-ocid="owner.product_editor.loading_state"
        className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-24 text-muted-foreground md:px-8"
      >
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        Loading product…
      </section>
    );
  }

  if (!isNew && (invalidId || (!isLoadingProduct && !existing))) {
    return (
      <section
        data-ocid="owner.product_editor.error_state"
        className="mx-auto w-full max-w-4xl px-4 py-24 md:px-8"
      >
        <h1 className="font-display text-3xl tracking-tight">
          Product not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This product could not be loaded. It may have been removed from the
          catalogue.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link
            to="/owner/products"
            data-ocid="owner.product_editor.back_button"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to products
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section
      data-ocid="owner.product_editor.page"
      className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16"
    >
      <div className="flex flex-col gap-2">
        <Link
          to="/owner/products"
          data-ocid="owner.product_editor.back_link"
          className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-smooth hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Products
        </Link>
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">
          {isNew ? "New product" : "Edit product"}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {isNew
            ? "Add a new entry to the catalogue ledger."
            : "Update this catalogue entry and its images."}
        </p>
      </div>
      {saved ? (
        <output
          data-ocid="owner.product_editor.success_state"
          className="mt-6 flex items-center gap-2 rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm font-medium text-foreground"
        >
          <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
          {isNew
            ? "Product created successfully."
            : "Product saved successfully."}
        </output>
      ) : null}

      {formError ? (
        <div
          data-ocid="owner.product_editor.form_error"
          role="alert"
          className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {formError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-10">
        {/* ── Identity ─────────────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Identity</legend>
          <Separator className="hairline-gold" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="name" label="Product name" error={errors.name}>
              <Input
                id="name"
                data-ocid="owner.product_editor.input.name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="e.g. Hand-bound Leather Journal"
              />
            </Field>
            <Field
              id="sku"
              label="SKU"
              hint="A unique stock code for this product."
              error={errors.sku}
            >
              <Input
                id="sku"
                data-ocid="owner.product_editor.input.sku"
                value={form.sku}
                onChange={(e) => update("sku", e.target.value)}
                aria-invalid={Boolean(errors.sku)}
                aria-describedby={errors.sku ? "sku-error" : undefined}
                placeholder="e.g. ME-JRN-001"
                className="font-mono"
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Classification ───────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Classification</legend>
          <Separator className="hairline-gold" />
          <div className="grid gap-5 md:grid-cols-3">
            <Field id="brand" label="Brand">
              <Select
                value={form.brandId || "none"}
                onValueChange={(value) =>
                  update("brandId", value === "none" ? "" : value)
                }
              >
                <SelectTrigger
                  id="brand"
                  data-ocid="owner.product_editor.select.brand"
                  className="w-full"
                >
                  <SelectValue placeholder="No brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No brand</SelectItem>
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
            </Field>

            <Field id="category" label="Category" error={errors.categoryId}>
              <Select
                value={form.categoryId || "none"}
                onValueChange={(value) => {
                  update("categoryId", value === "none" ? "" : value);
                  update("subcategoryId", "");
                }}
              >
                <SelectTrigger
                  id="category"
                  data-ocid="owner.product_editor.select.category"
                  className="w-full"
                  aria-invalid={Boolean(errors.categoryId)}
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Choose a category</SelectItem>
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
              {(categories ?? []).length === 0 && !showCategoryForm ? (
                <p className="text-xs text-muted-foreground">
                  No categories yet. Create one to classify this product.
                </p>
              ) : null}
              {showCategoryForm ? (
                <div
                  data-ocid="owner.product_editor.category_form"
                  className="mt-1 flex flex-col gap-2 rounded-md border border-border bg-muted/40 p-3"
                >
                  <Label
                    htmlFor="new-category-name"
                    className="label-caps text-muted-foreground"
                  >
                    New category
                  </Label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="new-category-name"
                      data-ocid="owner.product_editor.input.new_category"
                      value={newCategoryName}
                      onChange={(e) => {
                        setNewCategoryName(e.target.value);
                        setCategoryError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void handleCreateCategory();
                        }
                      }}
                      placeholder="e.g. Textiles"
                      aria-invalid={Boolean(categoryError)}
                      aria-describedby={
                        categoryError ? "new-category-error" : undefined
                      }
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => void handleCreateCategory()}
                        disabled={createCategory.isPending}
                        data-ocid="owner.product_editor.create_category_button"
                      >
                        {createCategory.isPending ? (
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        )}
                        {createCategory.isPending ? "Creating…" : "Create"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowCategoryForm(false);
                          setNewCategoryName("");
                          setCategoryError(null);
                        }}
                        data-ocid="owner.product_editor.cancel_category_button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  {categoryError ? (
                    <p
                      id="new-category-error"
                      data-ocid="owner.product_editor.category_error"
                      className="text-xs font-medium text-destructive"
                    >
                      {categoryError}
                    </p>
                  ) : null}
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCategoryForm(true)}
                  data-ocid="owner.product_editor.new_category_button"
                  className="mt-1 w-fit"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  New category
                </Button>
              )}
            </Field>

            <Field id="subcategory" label="Subcategory">
              <Select
                value={form.subcategoryId || "none"}
                onValueChange={(value) =>
                  update("subcategoryId", value === "none" ? "" : value)
                }
                disabled={subcategories.length === 0}
              >
                <SelectTrigger
                  id="subcategory"
                  data-ocid="owner.product_editor.select.subcategory"
                  className="w-full"
                >
                  <SelectValue
                    placeholder={
                      subcategories.length === 0
                        ? "No subcategories"
                        : "No subcategory"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No subcategory</SelectItem>
                  {subcategories.map((sub) => (
                    <SelectItem
                      key={sub.id.toString()}
                      value={sub.id.toString()}
                    >
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </fieldset>

        {/* ── Description ──────────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Description</legend>
          <Separator className="hairline-gold" />
          <Field id="shortDescription" label="Short description">
            <Textarea
              id="shortDescription"
              data-ocid="owner.product_editor.textarea.short_description"
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              rows={2}
              placeholder="A one-line summary shown on catalogue cards."
            />
          </Field>
          <Field id="longDescription" label="Long description">
            <Textarea
              id="longDescription"
              data-ocid="owner.product_editor.textarea.long_description"
              value={form.longDescription}
              onChange={(e) => update("longDescription", e.target.value)}
              rows={5}
              placeholder="The full description shown on the product page."
            />
          </Field>
        </fieldset>

        {/* ── Specifications ───────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Specifications</legend>
          <Separator className="hairline-gold" />
          {form.specifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No specifications yet. Add details such as material, size or
              finish.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {form.specifications.map((spec, index) => (
                <div
                  key={spec.key}
                  data-ocid={`owner.product_editor.spec.${index + 1}`}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <Input
                    value={spec.name}
                    onChange={(e) =>
                      updateSpecification(index, "name", e.target.value)
                    }
                    placeholder="Name (e.g. Material)"
                    aria-label={`Specification ${index + 1} name`}
                    data-ocid={`owner.product_editor.input.spec_name.${index + 1}`}
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) =>
                      updateSpecification(index, "value", e.target.value)
                    }
                    placeholder="Value (e.g. Full-grain leather)"
                    aria-label={`Specification ${index + 1} value`}
                    data-ocid={`owner.product_editor.input.spec_value.${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                    aria-label={`Remove specification ${index + 1}`}
                    data-ocid={`owner.product_editor.delete_button.spec.${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecification}
            data-ocid="owner.product_editor.add_spec_button"
            className="w-fit"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add specification
          </Button>
        </fieldset>

        {/* ── Variants ─────────────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Variants</legend>
          <Separator className="hairline-gold" />
          {form.variants.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No variants yet. Add options such as colour, size or finish.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {form.variants.map((variant, index) => (
                <div
                  key={variant.key}
                  data-ocid={`owner.product_editor.variant.${index + 1}`}
                  className="rounded-md border border-border bg-card p-4 shadow-subtle"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      value={variant.name}
                      onChange={(e) =>
                        updateVariant(index, "name", e.target.value)
                      }
                      placeholder="Option (e.g. Colour)"
                      aria-label={`Variant ${index + 1} option name`}
                      data-ocid={`owner.product_editor.input.variant_name.${index + 1}`}
                    />
                    <Input
                      value={variant.value}
                      onChange={(e) =>
                        updateVariant(index, "value", e.target.value)
                      }
                      placeholder="Value (e.g. Navy)"
                      aria-label={`Variant ${index + 1} value`}
                      data-ocid={`owner.product_editor.input.variant_value.${index + 1}`}
                    />
                    <Input
                      value={variant.sku}
                      onChange={(e) =>
                        updateVariant(index, "sku", e.target.value)
                      }
                      placeholder="Variant SKU (optional)"
                      aria-label={`Variant ${index + 1} SKU`}
                      className="font-mono"
                      data-ocid={`owner.product_editor.input.variant_sku.${index + 1}`}
                    />
                    <Select
                      value={variant.availability}
                      onValueChange={(value) =>
                        updateVariant(index, "availability", value)
                      }
                    >
                      <SelectTrigger
                        aria-label={`Variant ${index + 1} availability`}
                        data-ocid={`owner.product_editor.select.variant_availability.${index + 1}`}
                        className="w-full"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(index)}
                      data-ocid={`owner.product_editor.delete_button.variant.${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove variant
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addVariant}
            data-ocid="owner.product_editor.add_variant_button"
            className="w-fit"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add variant
          </Button>
        </fieldset>

        {/* ── Availability & price ─────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">
            Availability &amp; price
          </legend>
          <Separator className="hairline-gold" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="availability" label="Availability">
              <Select
                value={form.availability}
                onValueChange={(value) =>
                  update("availability", value as Availability)
                }
              >
                <SelectTrigger
                  id="availability"
                  data-ocid="owner.product_editor.select.availability"
                  className="w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field
              id="price"
              label="Price (₹)"
              hint="Leave empty to show “Enquire for price”."
              error={errors.price}
            >
              <Input
                id="price"
                data-ocid="owner.product_editor.input.price"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                aria-invalid={Boolean(errors.price)}
                aria-describedby={errors.price ? "price-error" : undefined}
                placeholder="Optional"
                className="font-mono"
              />
            </Field>
          </div>
        </fieldset>

        {/* ── Images ───────────────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Images</legend>
          <Separator className="hairline-gold" />
          <div className="flex flex-col gap-3">
            <input
              ref={fileInputRef}
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="sr-only"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              data-ocid="owner.product_editor.upload_button"
              className="w-fit"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ImagePlus className="h-4 w-4" aria-hidden="true" />
              )}
              {uploading ? "Reading images…" : "Add images"}
            </Button>
            <p className="text-xs text-muted-foreground">
              The first image is used as the catalogue thumbnail. Reorder with
              the arrows.
            </p>
          </div>

          {images.length === 0 ? (
            <p
              data-ocid="owner.product_editor.images.empty_state"
              className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground"
            >
              No images yet. Add one or more product images.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {images.map((image, index) => (
                <li
                  key={image.id.toString()}
                  data-ocid={`owner.product_editor.image.${index + 1}`}
                  className="flex flex-col gap-3 rounded-md border border-border bg-card p-3 shadow-subtle"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                    <img
                      src={image.blob.getDirectURL()}
                      alt={image.altText || image.filename}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 ? (
                      <span className="absolute left-2 top-2 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                        Thumbnail
                      </span>
                    ) : null}
                  </div>
                  <Input
                    value={image.altText}
                    onChange={(e) => updateImageAlt(index, e.target.value)}
                    placeholder="Alt text (optional)"
                    aria-label={`Alt text for image ${index + 1}`}
                    data-ocid={`owner.product_editor.input.image_alt.${index + 1}`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
                      {image.filename}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                        aria-label={`Move image ${index + 1} earlier`}
                        data-ocid={`owner.product_editor.move_up_button.${index + 1}`}
                      >
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                        aria-label={`Move image ${index + 1} later`}
                        data-ocid={`owner.product_editor.move_down_button.${index + 1}`}
                      >
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove image ${index + 1}`}
                        data-ocid={`owner.product_editor.delete_button.image.${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        {/* ── Publishing ───────────────────────────────────── */}
        <fieldset className="flex flex-col gap-5">
          <legend className="label-caps text-accent">Publishing</legend>
          <Separator className="hairline-gold" />
          <Field id="publishState" label="Publishing state">
            <Select
              value={form.publishState}
              onValueChange={(value) =>
                update("publishState", value as PublishState)
              }
            >
              <SelectTrigger
                id="publishState"
                data-ocid="owner.product_editor.select.publish_state"
                className="w-full md:w-64"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PUBLISH_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </fieldset>

        {/* ── Actions ──────────────────────────────────────── */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => void navigate({ to: "/owner/products" })}
            data-ocid="owner.product_editor.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            data-ocid="owner.product_editor.submit_button"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            {isSaving ? "Saving…" : isNew ? "Create product" : "Save changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}

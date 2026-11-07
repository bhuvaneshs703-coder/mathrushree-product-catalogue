import { A as useUpdateProduct, B as require_react, C as useReorderProductImages, F as createLucideIcon, M as Availability, P as PublishState, a as useCategories, c as useCreateCategory, ct as __toESM, i as useBrands, n as useAllProducts, ot as ExternalBlob, t as useSeo, u as useCreateProduct, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ArrowLeft } from "./arrow-left-AUJPrEEP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CGv8Q1Kf.js";
import { t as CircleCheck } from "./circle-check-Hhwq11bV.js";
import { i as LoaderCircle, n as Trash2, r as Plus, t as Input } from "./input-B48g_3TA.js";
import { i as useParams, n as useNavigate, t as Link } from "./index-Bipk6PsK.js";
import { r as cn, t as Button } from "./button-cWuqRO5T.js";
import { n as Primitive, t as Label } from "./label-DJ55qAR6.js";
import { t as ue } from "./dist-BN4kFDjX.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowDown = createLucideIcon("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ImagePlus = createLucideIcon("image-plus", [
	["path", {
		d: "M16 5h6",
		key: "1vod17"
	}],
	["path", {
		d: "M19 2v6",
		key: "4bpg5p"
	}],
	["path", {
		d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
		key: "1ue2ih"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}]
]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-separator@1.1.8_@types+react-dom@19.1.11_@types+react@19.1.17__@types+r_69b73e194ad1c64cfb6e320f50e6ca06/node_modules/@radix-ui/react-separator/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
	const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
	const semanticProps = decorative ? { role: "none" } : {
		"aria-orientation": orientation === "vertical" ? orientation : void 0,
		role: "separator"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-orientation": orientation,
		...semanticProps,
		...domProps,
		ref: forwardedRef
	});
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
	return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
//#endregion
//#region src/components/ui/separator.tsx
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "separator",
		decorative,
		orientation,
		className: cn("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
		...props
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
//#endregion
//#region src/pages/owner/ProductEditor.tsx
var AVAILABILITY_OPTIONS = [
	{
		value: Availability.inStock,
		label: "In Stock"
	},
	{
		value: Availability.outOfStock,
		label: "Out of Stock"
	},
	{
		value: Availability.madeToOrder,
		label: "Made to Order"
	}
];
var PUBLISH_OPTIONS = [
	{
		value: PublishState.draft,
		label: "Draft"
	},
	{
		value: PublishState.published,
		label: "Published"
	},
	{
		value: PublishState.archived,
		label: "Archived"
	}
];
var NEW_PRODUCT_ID = "new";
var EMPTY_FORM = {
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
	variants: []
};
var draftKeySeed = 0;
function nextDraftKey(prefix) {
	draftKeySeed += 1;
	return `${prefix}-${draftKeySeed}`;
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function errorMessage(error) {
	switch (error.__kind__) {
		case "ok": return null;
		case "duplicateSku": return `SKU "${error.duplicateSku}" is already in use. Choose a different SKU.`;
		case "invalidInput": return error.invalidInput;
		case "notFound": return "This product could not be found. It may have been removed.";
		case "unauthorized": return "You do not have permission to save products.";
	}
}
function productToForm(product) {
	return {
		name: product.name,
		sku: product.sku,
		brandId: product.brandId !== void 0 ? product.brandId.toString() : "",
		categoryId: product.categoryId.toString(),
		subcategoryId: product.subcategoryId !== void 0 ? product.subcategoryId.toString() : "",
		shortDescription: product.shortDescription,
		longDescription: product.longDescription,
		price: product.price !== void 0 ? product.price.toString() : "",
		availability: product.availability,
		publishState: product.publishState,
		specifications: product.specifications.map((spec) => ({
			key: nextDraftKey("spec"),
			name: spec.name,
			value: spec.value
		})),
		variants: product.variants.map((variant) => ({
			key: nextDraftKey("variant"),
			name: variant.name,
			value: variant.value,
			sku: variant.sku ?? "",
			availability: variant.availability ?? product.availability
		}))
	};
}
function productToImages(product) {
	return [...product.images].sort((a, b) => Number(a.order - b.order)).map((image) => ({
		id: image.id,
		blob: image.blob,
		filename: image.filename,
		altText: image.altText ?? ""
	}));
}
function Field({ id, label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				className: "label-caps text-muted-foreground",
				children: label
			}),
			children,
			hint && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-error`,
				"data-ocid": `owner.product_editor.error.${id}`,
				className: "text-xs font-medium text-destructive",
				children: error
			}) : null
		]
	});
}
function OwnerProductEditor() {
	const rawId = useParams({ strict: false }).productId ?? NEW_PRODUCT_ID;
	const isNew = rawId === NEW_PRODUCT_ID;
	const productId = (0, import_react.useMemo)(() => {
		if (isNew) return void 0;
		try {
			return BigInt(rawId);
		} catch {
			return;
		}
	}, [isNew, rawId]);
	const invalidId = !isNew && productId === void 0;
	useSeo(isNew ? "New Product" : "Edit Product", "Create or edit a catalogue product.");
	const navigate = useNavigate();
	const categoriesQuery = useCategories();
	const categories = categoriesQuery.data;
	const { data: brands } = useBrands();
	const productQuery = useAllProducts(productId !== void 0 ? { pageSize: 1000n } : {});
	const existing = (0, import_react.useMemo)(() => {
		if (productId === void 0) return null;
		const page = productQuery.data;
		if (!page) return null;
		return page.products.find((item) => item.id === productId) ?? null;
	}, [productId, productQuery.data]);
	const isLoadingProduct = productQuery.isLoading;
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const reorderImages = useReorderProductImages();
	const createCategory = useCreateCategory();
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [images, setImages] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [showCategoryForm, setShowCategoryForm] = (0, import_react.useState)(false);
	const [newCategoryName, setNewCategoryName] = (0, import_react.useState)("");
	const [categoryError, setCategoryError] = (0, import_react.useState)(null);
	const initializedRef = (0, import_react.useRef)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isNew || initializedRef.current || !existing) return;
		initializedRef.current = true;
		setForm(productToForm(existing));
		setImages(productToImages(existing));
	}, [isNew, existing]);
	const subcategories = (0, import_react.useMemo)(() => categories?.find((c) => c.id.toString() === form.categoryId), [categories, form.categoryId])?.subcategories ?? [];
	const isSaving = createProduct.isPending || updateProduct.isPending;
	function update(key, value) {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
		setSaved(false);
		setErrors((prev) => {
			if (!prev[key]) return prev;
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}
	async function handleCreateCategory() {
		const name = newCategoryName.trim();
		if (!name) {
			setCategoryError("Enter a category name.");
			return;
		}
		setCategoryError(null);
		const slug = slugify(name);
		const draft = {
			id: 0n,
			name,
			slug,
			order: BigInt(categories?.length ?? 0),
			subcategories: []
		};
		try {
			const message = errorMessage(await createCategory.mutateAsync(draft));
			if (message) {
				setCategoryError(message);
				return;
			}
			const created = ((await categoriesQuery.refetch()).data ?? []).find((category) => category.slug === slug);
			if (created) {
				update("categoryId", created.id.toString());
				update("subcategoryId", "");
			}
			setNewCategoryName("");
			setShowCategoryForm(false);
			ue.success(`Category “${name}” created.`);
		} catch {
			setCategoryError("Could not create the category. Please try again.");
		}
	}
	function addSpecification() {
		setForm((prev) => ({
			...prev,
			specifications: [...prev.specifications, {
				key: nextDraftKey("spec"),
				name: "",
				value: ""
			}]
		}));
		setSaved(false);
	}
	function updateSpecification(index, key, value) {
		setForm((prev) => ({
			...prev,
			specifications: prev.specifications.map((spec, i) => i === index ? {
				...spec,
				[key]: value
			} : spec)
		}));
		setSaved(false);
	}
	function removeSpecification(index) {
		setForm((prev) => ({
			...prev,
			specifications: prev.specifications.filter((_, i) => i !== index)
		}));
		setSaved(false);
	}
	function addVariant() {
		setForm((prev) => ({
			...prev,
			variants: [...prev.variants, {
				key: nextDraftKey("variant"),
				name: "",
				value: "",
				sku: "",
				availability: prev.availability
			}]
		}));
		setSaved(false);
	}
	function updateVariant(index, key, value) {
		setForm((prev) => ({
			...prev,
			variants: prev.variants.map((variant, i) => i === index ? {
				...variant,
				[key]: value
			} : variant)
		}));
		setSaved(false);
	}
	function removeVariant(index) {
		setForm((prev) => ({
			...prev,
			variants: prev.variants.filter((_, i) => i !== index)
		}));
		setSaved(false);
	}
	async function handleFiles(event) {
		const files = Array.from(event.target.files ?? []);
		if (files.length === 0) return;
		setUploading(true);
		try {
			const drafts = await Promise.all(files.map(async (file) => {
				const bytes = new Uint8Array(await file.arrayBuffer());
				const blob = ExternalBlob.fromBytes(bytes, file.type, file.name);
				return {
					id: BigInt(Date.now()) + BigInt(Math.floor(Math.random() * 1e5)),
					blob,
					filename: file.name,
					altText: ""
				};
			}));
			setImages((prev) => [...prev, ...drafts]);
			setSaved(false);
		} catch {
			setFormError("One or more images could not be read. Please try again.");
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}
	function moveImage(index, direction) {
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
	function removeImage(index) {
		setImages((prev) => prev.filter((_, i) => i !== index));
		setSaved(false);
	}
	function updateImageAlt(index, altText) {
		setImages((prev) => prev.map((image, i) => i === index ? {
			...image,
			altText
		} : image));
		setSaved(false);
	}
	function validate() {
		const next = {};
		if (!form.name.trim()) next.name = "Product name is required.";
		if (!form.sku.trim()) next.sku = "SKU is required.";
		if (!form.categoryId) next.categoryId = "Choose a category.";
		if (form.price.trim()) {
			const parsed = Number(form.price);
			if (!Number.isFinite(parsed) || parsed < 0) next.price = "Enter a valid non-negative price, or leave it empty.";
		}
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	async function handleSubmit(event) {
		event.preventDefault();
		setFormError(null);
		setSaved(false);
		if (!validate()) {
			setFormError("Please fix the highlighted fields before saving.");
			return;
		}
		const specifications = form.specifications.filter((spec) => spec.name.trim() || spec.value.trim()).map((spec) => ({
			name: spec.name.trim(),
			value: spec.value.trim()
		}));
		const variants = form.variants.filter((variant) => variant.name.trim() || variant.value.trim()).map((variant) => ({
			name: variant.name.trim(),
			value: variant.value.trim(),
			sku: variant.sku.trim() ? variant.sku.trim() : void 0,
			availability: variant.availability
		}));
		const productImages = images.map((image, index) => ({
			id: image.id,
			blob: image.blob,
			filename: image.filename,
			altText: image.altText.trim() ? image.altText.trim() : void 0,
			order: BigInt(index)
		}));
		const priceValue = form.price.trim() ? BigInt(form.price.trim()) : void 0;
		const payload = {
			id: existing?.id ?? 0n,
			name: form.name.trim(),
			sku: form.sku.trim(),
			brandId: form.brandId ? BigInt(form.brandId) : void 0,
			categoryId: BigInt(form.categoryId),
			subcategoryId: form.subcategoryId ? BigInt(form.subcategoryId) : void 0,
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
			updatedAt: existing?.updatedAt ?? 0n
		};
		try {
			const message = errorMessage(isNew ? await createProduct.mutateAsync(payload) : await updateProduct.mutateAsync(payload));
			if (message) {
				setFormError(message);
				ue.error(message);
				return;
			}
			if (!isNew && existing) {
				const order = productImages.map((image) => image.id);
				const reorderMessage = errorMessage(await reorderImages.mutateAsync({
					productId: existing.id,
					imageIds: order
				}));
				if (reorderMessage) {
					setFormError(reorderMessage);
					ue.error(reorderMessage);
					return;
				}
			}
			setSaved(true);
			ue.success(isNew ? "Product created." : "Product saved.");
			if (isNew) navigate({ to: "/owner/products" });
		} catch {
			const message = "Could not save the product. Please try again.";
			setFormError(message);
			ue.error(message);
		}
	}
	if (!isNew && isLoadingProduct) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "owner.product_editor.loading_state",
		className: "mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-24 text-muted-foreground md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-5 w-5 animate-spin",
			"aria-hidden": "true"
		}), "Loading product…"]
	});
	if (!isNew && (invalidId || !isLoadingProduct && !existing)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "owner.product_editor.error_state",
		className: "mx-auto w-full max-w-4xl px-4 py-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Product not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "This product could not be loaded. It may have been removed from the catalogue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/owner/products",
					"data-ocid": "owner.product_editor.back_button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), "Back to products"]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "owner.product_editor.page",
		className: "mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/owner/products",
						"data-ocid": "owner.product_editor.back_link",
						className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-smooth hover:text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "Products"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-tight md:text-4xl",
						children: isNew ? "New product" : "Edit product"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted-foreground",
						children: isNew ? "Add a new entry to the catalogue ledger." : "Update this catalogue entry and its images."
					})
				]
			}),
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
				"data-ocid": "owner.product_editor.success_state",
				className: "mt-6 flex items-center gap-2 rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm font-medium text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "h-4 w-4 text-success",
					"aria-hidden": "true"
				}), isNew ? "Product created successfully." : "Product saved successfully."]
			}) : null,
			formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ocid": "owner.product_editor.form_error",
				role: "alert",
				className: "mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive",
				children: formError
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 flex flex-col gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Identity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "name",
									label: "Product name",
									error: errors.name,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										"data-ocid": "owner.product_editor.input.name",
										value: form.name,
										onChange: (e) => update("name", e.target.value),
										"aria-invalid": Boolean(errors.name),
										"aria-describedby": errors.name ? "name-error" : void 0,
										placeholder: "e.g. Hand-bound Leather Journal"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "sku",
									label: "SKU",
									hint: "A unique stock code for this product.",
									error: errors.sku,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sku",
										"data-ocid": "owner.product_editor.input.sku",
										value: form.sku,
										onChange: (e) => update("sku", e.target.value),
										"aria-invalid": Boolean(errors.sku),
										"aria-describedby": errors.sku ? "sku-error" : void 0,
										placeholder: "e.g. ME-JRN-001",
										className: "font-mono"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Classification"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "brand",
										label: "Brand",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.brandId || "none",
											onValueChange: (value) => update("brandId", value === "none" ? "" : value),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												id: "brand",
												"data-ocid": "owner.product_editor.select.brand",
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "No brand" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "none",
												children: "No brand"
											}), (brands ?? []).map((brand) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: brand.id.toString(),
												children: brand.name
											}, brand.id.toString()))] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
										id: "category",
										label: "Category",
										error: errors.categoryId,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: form.categoryId || "none",
												onValueChange: (value) => {
													update("categoryId", value === "none" ? "" : value);
													update("subcategoryId", "");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													id: "category",
													"data-ocid": "owner.product_editor.select.category",
													className: "w-full",
													"aria-invalid": Boolean(errors.categoryId),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a category" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "none",
													children: "Choose a category"
												}), (categories ?? []).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: category.id.toString(),
													children: category.name
												}, category.id.toString()))] })]
											}),
											(categories ?? []).length === 0 && !showCategoryForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "No categories yet. Create one to classify this product."
											}) : null,
											showCategoryForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-ocid": "owner.product_editor.category_form",
												className: "mt-1 flex flex-col gap-2 rounded-md border border-border bg-muted/40 p-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "new-category-name",
														className: "label-caps text-muted-foreground",
														children: "New category"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col gap-2 sm:flex-row",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "new-category-name",
															"data-ocid": "owner.product_editor.input.new_category",
															value: newCategoryName,
															onChange: (e) => {
																setNewCategoryName(e.target.value);
																setCategoryError(null);
															},
															onKeyDown: (e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	handleCreateCategory();
																}
															},
															placeholder: "e.g. Textiles",
															"aria-invalid": Boolean(categoryError),
															"aria-describedby": categoryError ? "new-category-error" : void 0
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																type: "button",
																size: "sm",
																onClick: () => void handleCreateCategory(),
																disabled: createCategory.isPending,
																"data-ocid": "owner.product_editor.create_category_button",
																children: [createCategory.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
																	className: "h-4 w-4 animate-spin",
																	"aria-hidden": "true"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
																	className: "h-4 w-4",
																	"aria-hidden": "true"
																}), createCategory.isPending ? "Creating…" : "Create"]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																type: "button",
																variant: "ghost",
																size: "sm",
																onClick: () => {
																	setShowCategoryForm(false);
																	setNewCategoryName("");
																	setCategoryError(null);
																},
																"data-ocid": "owner.product_editor.cancel_category_button",
																children: "Cancel"
															})]
														})]
													}),
													categoryError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														id: "new-category-error",
														"data-ocid": "owner.product_editor.category_error",
														className: "text-xs font-medium text-destructive",
														children: categoryError
													}) : null
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setShowCategoryForm(true),
												"data-ocid": "owner.product_editor.new_category_button",
												className: "mt-1 w-fit",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													className: "h-4 w-4",
													"aria-hidden": "true"
												}), "New category"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "subcategory",
										label: "Subcategory",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.subcategoryId || "none",
											onValueChange: (value) => update("subcategoryId", value === "none" ? "" : value),
											disabled: subcategories.length === 0,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												id: "subcategory",
												"data-ocid": "owner.product_editor.select.subcategory",
												className: "w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: subcategories.length === 0 ? "No subcategories" : "No subcategory" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "none",
												children: "No subcategory"
											}), subcategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: sub.id.toString(),
												children: sub.name
											}, sub.id.toString()))] })]
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "shortDescription",
								label: "Short description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "shortDescription",
									"data-ocid": "owner.product_editor.textarea.short_description",
									value: form.shortDescription,
									onChange: (e) => update("shortDescription", e.target.value),
									rows: 2,
									placeholder: "A one-line summary shown on catalogue cards."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "longDescription",
								label: "Long description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "longDescription",
									"data-ocid": "owner.product_editor.textarea.long_description",
									value: form.longDescription,
									onChange: (e) => update("longDescription", e.target.value),
									rows: 5,
									placeholder: "The full description shown on the product page."
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Specifications"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							form.specifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No specifications yet. Add details such as material, size or finish."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: form.specifications.map((spec, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-ocid": `owner.product_editor.spec.${index + 1}`,
									className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: spec.name,
											onChange: (e) => updateSpecification(index, "name", e.target.value),
											placeholder: "Name (e.g. Material)",
											"aria-label": `Specification ${index + 1} name`,
											"data-ocid": `owner.product_editor.input.spec_name.${index + 1}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: spec.value,
											onChange: (e) => updateSpecification(index, "value", e.target.value),
											placeholder: "Value (e.g. Full-grain leather)",
											"aria-label": `Specification ${index + 1} value`,
											"data-ocid": `owner.product_editor.input.spec_value.${index + 1}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											onClick: () => removeSpecification(index),
											"aria-label": `Remove specification ${index + 1}`,
											"data-ocid": `owner.product_editor.delete_button.spec.${index + 1}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											})
										})
									]
								}, spec.key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: addSpecification,
								"data-ocid": "owner.product_editor.add_spec_button",
								className: "w-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), "Add specification"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Variants"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							form.variants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No variants yet. Add options such as colour, size or finish."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-4",
								children: form.variants.map((variant, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-ocid": `owner.product_editor.variant.${index + 1}`,
									className: "rounded-md border border-border bg-card p-4 shadow-subtle",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: variant.name,
												onChange: (e) => updateVariant(index, "name", e.target.value),
												placeholder: "Option (e.g. Colour)",
												"aria-label": `Variant ${index + 1} option name`,
												"data-ocid": `owner.product_editor.input.variant_name.${index + 1}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: variant.value,
												onChange: (e) => updateVariant(index, "value", e.target.value),
												placeholder: "Value (e.g. Navy)",
												"aria-label": `Variant ${index + 1} value`,
												"data-ocid": `owner.product_editor.input.variant_value.${index + 1}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: variant.sku,
												onChange: (e) => updateVariant(index, "sku", e.target.value),
												placeholder: "Variant SKU (optional)",
												"aria-label": `Variant ${index + 1} SKU`,
												className: "font-mono",
												"data-ocid": `owner.product_editor.input.variant_sku.${index + 1}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: variant.availability,
												onValueChange: (value) => updateVariant(index, "availability", value),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"aria-label": `Variant ${index + 1} availability`,
													"data-ocid": `owner.product_editor.select.variant_availability.${index + 1}`,
													className: "w-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: AVAILABILITY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: option.value,
													children: option.label
												}, option.value)) })]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => removeVariant(index),
											"data-ocid": `owner.product_editor.delete_button.variant.${index + 1}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											}), "Remove variant"]
										})
									})]
								}, variant.key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: addVariant,
								"data-ocid": "owner.product_editor.add_variant_button",
								className: "w-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), "Add variant"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Availability & price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "availability",
									label: "Availability",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.availability,
										onValueChange: (value) => update("availability", value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "availability",
											"data-ocid": "owner.product_editor.select.availability",
											className: "w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: AVAILABILITY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: option.value,
											children: option.label
										}, option.value)) })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "price",
									label: "Price (₹)",
									hint: "Leave empty to show “Enquire for price”.",
									error: errors.price,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "price",
										"data-ocid": "owner.product_editor.input.price",
										type: "number",
										min: "0",
										step: "1",
										inputMode: "numeric",
										value: form.price,
										onChange: (e) => update("price", e.target.value),
										"aria-invalid": Boolean(errors.price),
										"aria-describedby": errors.price ? "price-error" : void 0,
										placeholder: "Optional",
										className: "font-mono"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Images"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileInputRef,
										id: "product-images",
										type: "file",
										accept: "image/*",
										multiple: true,
										onChange: handleFiles,
										className: "sr-only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => fileInputRef.current?.click(),
										disabled: uploading,
										"data-ocid": "owner.product_editor.upload_button",
										className: "w-fit",
										children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-4 w-4 animate-spin",
											"aria-hidden": "true"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
											className: "h-4 w-4",
											"aria-hidden": "true"
										}), uploading ? "Reading images…" : "Add images"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "The first image is used as the catalogue thumbnail. Reorder with the arrows."
									})
								]
							}),
							images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-ocid": "owner.product_editor.images.empty_state",
								className: "rounded-md border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground",
								children: "No images yet. Add one or more product images."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-ocid": `owner.product_editor.image.${index + 1}`,
									className: "flex flex-col gap-3 rounded-md border border-border bg-card p-3 shadow-subtle",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-[4/3] overflow-hidden rounded-sm bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: image.blob.getDirectURL(),
												alt: image.altText || image.filename,
												className: "h-full w-full object-cover"
											}), index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute left-2 top-2 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground",
												children: "Thumbnail"
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: image.altText,
											onChange: (e) => updateImageAlt(index, e.target.value),
											placeholder: "Alt text (optional)",
											"aria-label": `Alt text for image ${index + 1}`,
											"data-ocid": `owner.product_editor.input.image_alt.${index + 1}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground",
												children: image.filename
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														variant: "ghost",
														size: "icon",
														onClick: () => moveImage(index, -1),
														disabled: index === 0,
														"aria-label": `Move image ${index + 1} earlier`,
														"data-ocid": `owner.product_editor.move_up_button.${index + 1}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
															className: "h-4 w-4",
															"aria-hidden": "true"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														variant: "ghost",
														size: "icon",
														onClick: () => moveImage(index, 1),
														disabled: index === images.length - 1,
														"aria-label": `Move image ${index + 1} later`,
														"data-ocid": `owner.product_editor.move_down_button.${index + 1}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
															className: "h-4 w-4",
															"aria-hidden": "true"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														variant: "ghost",
														size: "icon",
														onClick: () => removeImage(index),
														"aria-label": `Remove image ${index + 1}`,
														"data-ocid": `owner.product_editor.delete_button.image.${index + 1}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
															className: "h-4 w-4",
															"aria-hidden": "true"
														})
													})
												]
											})]
										})
									]
								}, image.id.toString()))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label-caps text-accent",
								children: "Publishing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "hairline-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "publishState",
								label: "Publishing state",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.publishState,
									onValueChange: (value) => update("publishState", value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "publishState",
										"data-ocid": "owner.product_editor.select.publish_state",
										className: "w-full md:w-64",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PUBLISH_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: option.value,
										children: option.label
									}, option.value)) })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => void navigate({ to: "/owner/products" }),
							"data-ocid": "owner.product_editor.cancel_button",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: isSaving,
							"data-ocid": "owner.product_editor.submit_button",
							children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "h-4 w-4 animate-spin",
								"aria-hidden": "true"
							}) : null, isSaving ? "Saving…" : isNew ? "Create product" : "Save changes"]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { OwnerProductEditor as default };

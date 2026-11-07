import { B as require_react, D as useUpdateBrand, O as useUpdateCategory, S as useRemoveProductFromCollection, a as useCategories, c as useCreateCategory, ct as __toESM, d as useCreateSubcategory, f as useDeleteBrand, g as useDeleteSubcategory, i as useBrands, j as useUpdateSubcategory, k as useUpdateCollection, l as useCreateCollection, m as useDeleteCollection, o as useCollections, p as useDeleteCategory, r as useAssignProductToCollection, s as useCreateBrand, t as useSeo, x as usePublishedProducts, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as Check } from "./check-C-OcsRJo.js";
import { t as ChevronDown } from "./chevron-down-Tw0gCoTO.js";
import { i as LoaderCircle, n as Trash2, r as Plus, t as Input } from "./input-B48g_3TA.js";
import { t as Pencil } from "./pencil-D0y5kNDq.js";
import { o as X } from "./index-Bipk6PsK.js";
import { r as cn, t as Button } from "./button-cWuqRO5T.js";
import { t as Label } from "./label-DJ55qAR6.js";
//#region src/pages/owner/Taxonomy.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	return "Something went wrong. Please try again.";
}
function FeedbackBanner({ feedback, ocid }) {
	if (!feedback) return null;
	const isSuccess = feedback.kind === "success";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
		"data-ocid": ocid,
		"aria-live": "polite",
		className: cn("flex items-start gap-2 rounded-md border px-3 py-2 text-sm", isSuccess ? "border-accent/50 bg-accent/10 text-foreground" : "border-destructive/40 bg-destructive/10 text-foreground"),
		children: [isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "mt-0.5 size-4 shrink-0 text-accent",
			"aria-hidden": true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
			className: "mt-0.5 size-4 shrink-0 text-destructive",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 break-words",
			children: feedback.text
		})]
	});
}
function SectionHeading({ label, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-caps text-accent",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl tracking-tight md:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "mt-3 block h-px w-16 bg-accent/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
function EmptyState({ ocid, title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": ocid,
		className: "rounded-md border border-dashed border-border bg-muted/30 px-6 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: hint
		})]
	});
}
function LoadingRows({ ocid }) {
	const ids = Array.from({ length: 3 }, (_, i) => `taxonomy-skeleton-${i}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": ocid,
		className: "space-y-3",
		"aria-hidden": true,
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-md border border-border bg-muted/40" }, id))
	});
}
function RenameField({ initialValue, pending, onCancel, onSubmit, ocid }) {
	const [value, setValue] = (0, import_react.useState)(initialValue);
	const trimmed = value.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-1 flex-wrap items-center gap-2",
		onSubmit: (event) => {
			event.preventDefault();
			if (!trimmed || pending) return;
			onSubmit(trimmed);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-ocid": `${ocid}.input`,
				value,
				onChange: (event) => setValue(event.target.value),
				"aria-label": "New name",
				className: "h-9 min-w-0 flex-1",
				autoFocus: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-ocid": `${ocid}.save_button`,
				type: "submit",
				size: "sm",
				disabled: !trimmed || pending,
				children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "size-4 animate-spin",
					"aria-hidden": true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-4",
					"aria-hidden": true
				}), "Save"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-ocid": `${ocid}.cancel_button`,
				type: "button",
				size: "sm",
				variant: "ghost",
				onClick: onCancel,
				disabled: pending,
				children: "Cancel"
			})
		]
	});
}
function CategoriesSection() {
	const categoriesQuery = useCategories();
	const createCategory = useCreateCategory();
	const updateCategory = useUpdateCategory();
	const deleteCategory = useDeleteCategory();
	const createSubcategory = useCreateSubcategory();
	const updateSubcategory = useUpdateSubcategory();
	const deleteSubcategory = useDeleteSubcategory();
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [newCategory, setNewCategory] = (0, import_react.useState)("");
	const [renamingId, setRenamingId] = (0, import_react.useState)(null);
	const [expandedId, setExpandedId] = (0, import_react.useState)(null);
	const [newSubcategory, setNewSubcategory] = (0, import_react.useState)("");
	const [renamingSubId, setRenamingSubId] = (0, import_react.useState)(null);
	const categories = categoriesQuery.data ?? [];
	function handleCreateCategory(event) {
		event.preventDefault();
		const name = newCategory.trim();
		if (!name) return;
		const draft = {
			id: 0n,
			name,
			slug: slugify(name),
			order: BigInt(categories.length),
			subcategories: []
		};
		setNewCategory("");
		createCategory.mutate(draft, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Category “${name}” created.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleRenameCategory(category, name) {
		updateCategory.mutate({
			...category,
			name,
			slug: slugify(name)
		}, {
			onSuccess: () => {
				setRenamingId(null);
				setFeedback({
					kind: "success",
					text: `Category renamed to “${name}”.`
				});
			},
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleDeleteCategory(category) {
		deleteCategory.mutate(category.id, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Category “${category.name}” deleted.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleCreateSubcategory(category, event) {
		event.preventDefault();
		const name = newSubcategory.trim();
		if (!name) return;
		const draft = {
			id: 0n,
			categoryId: category.id,
			name,
			slug: slugify(name),
			order: BigInt(category.subcategories.length)
		};
		setNewSubcategory("");
		createSubcategory.mutate(draft, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Subcategory “${name}” added.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleRenameSubcategory(subcategory, name) {
		updateSubcategory.mutate({
			...subcategory,
			name,
			slug: slugify(name)
		}, {
			onSuccess: () => {
				setRenamingSubId(null);
				setFeedback({
					kind: "success",
					text: `Subcategory renamed to “${name}”.`
				});
			},
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleDeleteSubcategory(subcategory) {
		deleteSubcategory.mutate(subcategory.id, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Subcategory “${subcategory.name}” deleted.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "taxonomy.categories.section",
		"aria-labelledby": "taxonomy-categories",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				label: "Section 01",
				title: "Categories & Subcategories",
				description: "Group the catalogue into top-level categories, then nest subcategories beneath each one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-6 flex flex-col gap-2 sm:flex-row",
				onSubmit: handleCreateCategory,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-category",
						className: "sr-only",
						children: "New category name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-category",
						"data-ocid": "taxonomy.category.input",
						value: newCategory,
						onChange: (event) => setNewCategory(event.target.value),
						placeholder: "e.g. Writing Instruments",
						className: "h-10 flex-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-ocid": "taxonomy.category.add_button",
						type: "submit",
						className: "h-10",
						disabled: !newCategory.trim() || createCategory.isPending,
						children: [createCategory.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "size-4 animate-spin",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}), "Add category"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackBanner, {
				feedback,
				ocid: "taxonomy.categories.feedback"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: categoriesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingRows, { ocid: "taxonomy.categories.loading_state" }) : categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					ocid: "taxonomy.categories.empty_state",
					title: "No categories yet",
					hint: "Add your first category above to start organising the catalogue."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-ocid": "taxonomy.categories.list",
					className: "space-y-3",
					children: categories.map((category, index) => {
						const isRenaming = renamingId === category.id;
						const isExpanded = expandedId === category.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-ocid": `taxonomy.category.item.${index + 1}`,
							className: "rounded-md border border-border bg-card shadow-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-3 px-4 py-3",
								children: isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenameField, {
									ocid: `taxonomy.category.rename.${index + 1}`,
									initialValue: category.name,
									pending: updateCategory.isPending,
									onCancel: () => setRenamingId(null),
									onSubmit: (name) => handleRenameCategory(category, name)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-lg text-foreground",
										children: category.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: [
											category.slug,
											" · ",
											category.subcategories.length,
											" ",
											"subcategor",
											category.subcategories.length === 1 ? "y" : "ies"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.category.edit_button.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											onClick: () => setRenamingId(category.id),
											"aria-label": `Rename ${category.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
												className: "size-4",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.category.delete_button.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
											onClick: () => handleDeleteCategory(category),
											disabled: deleteCategory.isPending,
											"aria-label": `Delete ${category.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "size-4",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.category.toggle.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											onClick: () => setExpandedId(isExpanded ? null : category.id),
											"aria-expanded": isExpanded,
											"aria-label": `${isExpanded ? "Hide" : "Show"} subcategories for ${category.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
												className: cn("size-4 transition-transform", isExpanded && "rotate-180"),
												"aria-hidden": true
											})
										})
									]
								})] })
							}), isExpanded && !isRenaming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border bg-muted/30 px-4 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-caps mb-3 text-muted-foreground",
										children: "Subcategories"
									}),
									category.subcategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-ocid": `taxonomy.subcategory.empty_state.${index + 1}`,
										className: "mb-3 text-sm text-muted-foreground",
										children: "No subcategories yet."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mb-3 space-y-2",
										children: category.subcategories.map((sub, subIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-ocid": `taxonomy.subcategory.item.${index + 1}.${subIndex + 1}`,
											className: "flex flex-wrap items-center gap-2 rounded-md border border-border bg-card px-3 py-2",
											children: renamingSubId === sub.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenameField, {
												ocid: `taxonomy.subcategory.rename.${index + 1}.${subIndex + 1}`,
												initialValue: sub.name,
												pending: updateSubcategory.isPending,
												onCancel: () => setRenamingSubId(null),
												onSubmit: (name) => handleRenameSubcategory(sub, name)
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-0 flex-1 truncate text-sm text-foreground",
													children: sub.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-ocid": `taxonomy.subcategory.edit_button.${index + 1}.${subIndex + 1}`,
													type: "button",
													size: "sm",
													variant: "ghost",
													onClick: () => setRenamingSubId(sub.id),
													"aria-label": `Rename ${sub.name}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
														className: "size-4",
														"aria-hidden": true
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-ocid": `taxonomy.subcategory.delete_button.${index + 1}.${subIndex + 1}`,
													type: "button",
													size: "sm",
													variant: "ghost",
													className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
													onClick: () => handleDeleteSubcategory(sub),
													disabled: deleteSubcategory.isPending,
													"aria-label": `Delete ${sub.name}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
														className: "size-4",
														"aria-hidden": true
													})
												})
											] })
										}, sub.id.toString()))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "flex flex-col gap-2 sm:flex-row",
										onSubmit: (event) => handleCreateSubcategory(category, event),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: `new-subcategory-${category.id}`,
												className: "sr-only",
												children: "New subcategory name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: `new-subcategory-${category.id}`,
												"data-ocid": `taxonomy.subcategory.input.${index + 1}`,
												value: newSubcategory,
												onChange: (event) => setNewSubcategory(event.target.value),
												placeholder: "e.g. Fountain Pens",
												className: "h-9 flex-1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-ocid": `taxonomy.subcategory.add_button.${index + 1}`,
												type: "submit",
												size: "sm",
												disabled: !newSubcategory.trim() || createSubcategory.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													className: "size-4",
													"aria-hidden": true
												}), "Add subcategory"]
											})
										]
									})
								]
							})]
						}, category.id.toString());
					})
				})
			})
		]
	});
}
function BrandsSection() {
	const brandsQuery = useBrands();
	const createBrand = useCreateBrand();
	const updateBrand = useUpdateBrand();
	const deleteBrand = useDeleteBrand();
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [newBrand, setNewBrand] = (0, import_react.useState)("");
	const [renamingId, setRenamingId] = (0, import_react.useState)(null);
	const brands = brandsQuery.data ?? [];
	function handleCreate(event) {
		event.preventDefault();
		const name = newBrand.trim();
		if (!name) return;
		const draft = {
			id: 0n,
			name,
			slug: slugify(name)
		};
		setNewBrand("");
		createBrand.mutate(draft, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Brand “${name}” created.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleRename(brand, name) {
		updateBrand.mutate({
			...brand,
			name,
			slug: slugify(name)
		}, {
			onSuccess: () => {
				setRenamingId(null);
				setFeedback({
					kind: "success",
					text: `Brand renamed to “${name}”.`
				});
			},
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleDelete(brand) {
		deleteBrand.mutate(brand.id, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Brand “${brand.name}” deleted.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "taxonomy.brands.section",
		"aria-labelledby": "taxonomy-brands",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				label: "Section 02",
				title: "Brands",
				description: "Maintain the makers and houses represented in the catalogue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-6 flex flex-col gap-2 sm:flex-row",
				onSubmit: handleCreate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-brand",
						className: "sr-only",
						children: "New brand name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-brand",
						"data-ocid": "taxonomy.brand.input",
						value: newBrand,
						onChange: (event) => setNewBrand(event.target.value),
						placeholder: "e.g. Kaweco",
						className: "h-10 flex-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-ocid": "taxonomy.brand.add_button",
						type: "submit",
						className: "h-10",
						disabled: !newBrand.trim() || createBrand.isPending,
						children: [createBrand.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "size-4 animate-spin",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}), "Add brand"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackBanner, {
				feedback,
				ocid: "taxonomy.brands.feedback"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: brandsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingRows, { ocid: "taxonomy.brands.loading_state" }) : brands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					ocid: "taxonomy.brands.empty_state",
					title: "No brands yet",
					hint: "Add the first brand above to attribute your products."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-ocid": "taxonomy.brands.list",
					className: "space-y-3",
					children: brands.map((brand, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-ocid": `taxonomy.brand.item.${index + 1}`,
						className: "flex flex-wrap items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-subtle",
						children: renamingId === brand.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenameField, {
							ocid: `taxonomy.brand.rename.${index + 1}`,
							initialValue: brand.name,
							pending: updateBrand.isPending,
							onCancel: () => setRenamingId(null),
							onSubmit: (name) => handleRename(brand, name)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-lg text-foreground",
								children: brand.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: brand.slug
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-ocid": `taxonomy.brand.edit_button.${index + 1}`,
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: () => setRenamingId(brand.id),
								"aria-label": `Rename ${brand.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
									className: "size-4",
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-ocid": `taxonomy.brand.delete_button.${index + 1}`,
								type: "button",
								size: "sm",
								variant: "ghost",
								className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
								onClick: () => handleDelete(brand),
								disabled: deleteBrand.isPending,
								"aria-label": `Delete ${brand.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									className: "size-4",
									"aria-hidden": true
								})
							})]
						})] })
					}, brand.id.toString()))
				})
			})
		]
	});
}
function CollectionsSection() {
	const collectionsQuery = useCollections();
	const productsQuery = usePublishedProducts({ pageSize: 200n });
	const createCollection = useCreateCollection();
	const updateCollection = useUpdateCollection();
	const deleteCollection = useDeleteCollection();
	const assignProduct = useAssignProductToCollection();
	const removeProduct = useRemoveProductFromCollection();
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [newCollection, setNewCollection] = (0, import_react.useState)("");
	const [renamingId, setRenamingId] = (0, import_react.useState)(null);
	const [expandedId, setExpandedId] = (0, import_react.useState)(null);
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)("");
	const collections = collectionsQuery.data ?? [];
	const products = productsQuery.data?.products ?? [];
	const productById = new Map(products.map((p) => [p.id.toString(), p]));
	function handleCreate(event) {
		event.preventDefault();
		const name = newCollection.trim();
		if (!name) return;
		const draft = {
			id: 0n,
			name,
			slug: slugify(name),
			productIds: [],
			order: BigInt(collections.length)
		};
		setNewCollection("");
		createCollection.mutate(draft, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Collection “${name}” created.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleRename(collection, name) {
		updateCollection.mutate({
			...collection,
			name,
			slug: slugify(name)
		}, {
			onSuccess: () => {
				setRenamingId(null);
				setFeedback({
					kind: "success",
					text: `Collection renamed to “${name}”.`
				});
			},
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleDelete(collection) {
		deleteCollection.mutate(collection.id, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `Collection “${collection.name}” deleted.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleAssign(collection, event) {
		event.preventDefault();
		if (!selectedProduct) return;
		const productId = BigInt(selectedProduct);
		const productName = productById.get(selectedProduct)?.name ?? "Product";
		setSelectedProduct("");
		assignProduct.mutate({
			collectionId: collection.id,
			productId
		}, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `“${productName}” added to “${collection.name}”.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	function handleRemove(collection, productId) {
		const productName = productById.get(productId.toString())?.name ?? "Product";
		removeProduct.mutate({
			collectionId: collection.id,
			productId
		}, {
			onSuccess: () => setFeedback({
				kind: "success",
				text: `“${productName}” removed from “${collection.name}”.`
			}),
			onError: (error) => setFeedback({
				kind: "error",
				text: errorMessage(error)
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "taxonomy.collections.section",
		"aria-labelledby": "taxonomy-collections",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				label: "Section 03",
				title: "Collections",
				description: "Curate editorial groupings and assign published products to each collection."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-6 flex flex-col gap-2 sm:flex-row",
				onSubmit: handleCreate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-collection",
						className: "sr-only",
						children: "New collection name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-collection",
						"data-ocid": "taxonomy.collection.input",
						value: newCollection,
						onChange: (event) => setNewCollection(event.target.value),
						placeholder: "e.g. Autumn Desk Edit",
						className: "h-10 flex-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-ocid": "taxonomy.collection.add_button",
						type: "submit",
						className: "h-10",
						disabled: !newCollection.trim() || createCollection.isPending,
						children: [createCollection.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "size-4 animate-spin",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}), "Add collection"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackBanner, {
				feedback,
				ocid: "taxonomy.collections.feedback"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: collectionsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingRows, { ocid: "taxonomy.collections.loading_state" }) : collections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					ocid: "taxonomy.collections.empty_state",
					title: "No collections yet",
					hint: "Create a collection above, then assign products to it."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-ocid": "taxonomy.collections.list",
					className: "space-y-3",
					children: collections.map((collection, index) => {
						const isRenaming = renamingId === collection.id;
						const isExpanded = expandedId === collection.id;
						const assigned = collection.productIds;
						const available = products.filter((p) => !assigned.some((id) => id === p.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-ocid": `taxonomy.collection.item.${index + 1}`,
							className: "rounded-md border border-border bg-card shadow-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-3 px-4 py-3",
								children: isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenameField, {
									ocid: `taxonomy.collection.rename.${index + 1}`,
									initialValue: collection.name,
									pending: updateCollection.isPending,
									onCancel: () => setRenamingId(null),
									onSubmit: (name) => handleRename(collection, name)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-lg text-foreground",
										children: collection.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: [
											collection.slug,
											" · ",
											assigned.length,
											" product",
											assigned.length === 1 ? "" : "s"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.collection.edit_button.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											onClick: () => setRenamingId(collection.id),
											"aria-label": `Rename ${collection.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
												className: "size-4",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.collection.delete_button.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
											onClick: () => handleDelete(collection),
											disabled: deleteCollection.isPending,
											"aria-label": `Delete ${collection.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "size-4",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-ocid": `taxonomy.collection.toggle.${index + 1}`,
											type: "button",
											size: "sm",
											variant: "ghost",
											onClick: () => setExpandedId(isExpanded ? null : collection.id),
											"aria-expanded": isExpanded,
											"aria-label": `${isExpanded ? "Hide" : "Show"} products for ${collection.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
												className: cn("size-4 transition-transform", isExpanded && "rotate-180"),
												"aria-hidden": true
											})
										})
									]
								})] })
							}), isExpanded && !isRenaming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border bg-muted/30 px-4 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-caps mb-3 text-muted-foreground",
										children: "Assigned products"
									}),
									assigned.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-ocid": `taxonomy.collection.products_empty_state.${index + 1}`,
										className: "mb-3 text-sm text-muted-foreground",
										children: "No products assigned yet."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mb-3 space-y-2",
										children: assigned.map((productId, productIndex) => {
											const product = productById.get(productId.toString());
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												"data-ocid": `taxonomy.collection.product.${index + 1}.${productIndex + 1}`,
												className: "flex flex-wrap items-center gap-2 rounded-md border border-border bg-card px-3 py-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "min-w-0 flex-1 truncate text-sm text-foreground",
														children: product?.name ?? `Product #${productId}`
													}),
													product && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-muted-foreground",
														children: product.sku
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														"data-ocid": `taxonomy.collection.remove_button.${index + 1}.${productIndex + 1}`,
														type: "button",
														size: "sm",
														variant: "ghost",
														className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
														onClick: () => handleRemove(collection, productId),
														disabled: removeProduct.isPending,
														"aria-label": `Remove ${product?.name ?? "product"} from ${collection.name}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
															className: "size-4",
															"aria-hidden": true
														}), "Remove"]
													})
												]
											}, productId.toString());
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "flex flex-col gap-2 sm:flex-row",
										onSubmit: (event) => handleAssign(collection, event),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: `assign-product-${collection.id}`,
												className: "sr-only",
												children: "Product to assign"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: `assign-product-${collection.id}`,
												"data-ocid": `taxonomy.collection.product_select.${index + 1}`,
												value: selectedProduct,
												onChange: (event) => setSelectedProduct(event.target.value),
												className: "h-9 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Select a product…"
												}), available.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: product.id.toString(),
													children: [
														product.name,
														" — ",
														product.sku
													]
												}, product.id.toString()))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												"data-ocid": `taxonomy.collection.assign_button.${index + 1}`,
												type: "submit",
												size: "sm",
												disabled: !selectedProduct || assignProduct.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													className: "size-4",
													"aria-hidden": true
												}), "Assign product"]
											})
										]
									}),
									available.length === 0 && products.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "All published products are already in this collection."
									}),
									products.length === 0 && !productsQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "No published products available to assign yet."
									})
								]
							})]
						}, collection.id.toString());
					})
				})
			})
		]
	});
}
function OwnerTaxonomy() {
	useSeo("Taxonomy", "Manage categories, subcategories, brands and collections.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "owner.taxonomy.page",
		className: "mx-auto w-full max-w-5xl px-4 py-16 md:px-8 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-12 border-b border-border pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-accent",
					children: "Owner Console"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-tight md:text-5xl",
					children: "Taxonomy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-base text-muted-foreground md:text-lg",
					children: "Shape how the catalogue is organised — categories and subcategories, the brands you carry, and the curated collections that group products for your customers."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-16 md:space-y-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandsSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionsSection, {})
			]
		})]
	});
}
//#endregion
export { OwnerTaxonomy as default };

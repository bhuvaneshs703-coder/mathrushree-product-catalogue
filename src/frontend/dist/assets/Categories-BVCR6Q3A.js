import { a as useCategories, t as useSeo, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ArrowRight } from "./arrow-right-DTG-2zZv.js";
import { t as BookOpen } from "./book-open-l2j7X9EN.js";
import { t as Layers } from "./layers-DfTNf6x0.js";
import { t as Link } from "./index-Bipk6PsK.js";
//#region src/pages/Categories.tsx
var import_jsx_runtime = require_jsx_runtime();
var SHOP_LINK_CLASS = "inline-flex items-center gap-1.5 rounded-md border border-accent/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
function SubcategoryChip({ subcategory }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/shop",
		search: { search: subcategory.name },
		"data-ocid": `categories.subcategory_link.${subcategory.id}`,
		className: SHOP_LINK_CLASS,
		children: subcategory.name
	});
}
function CategoryCard({ category }) {
	const subcategories = [...category.subcategories].sort((a, b) => Number(a.order - b.order));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `categories.card.${category.id}`,
		className: "group flex flex-col rounded-md border border-border bg-card p-6 shadow-subtle transition-smooth hover:border-accent/60 hover:shadow-elevated md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-muted-foreground",
						children: subcategories.length > 0 ? `${subcategories.length} ${subcategories.length === 1 ? "subcategory" : "subcategories"}` : "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl tracking-tight text-foreground md:text-3xl",
						children: category.name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "mt-4 block h-px w-16 origin-left bg-accent/50 transition-smooth group-hover:w-24"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted-foreground md:text-base",
				children: category.description?.trim() ? category.description : "Explore this collection of fine stationery and lifestyle goods."
			}),
			subcategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-muted-foreground",
					children: "Browse by"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-2",
					children: subcategories.map((subcategory) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubcategoryChip, { subcategory }) }, subcategory.id.toString()))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				search: { search: category.name },
				"data-ocid": `categories.view_all_link.${category.id}`,
				className: "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary transition-smooth hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				children: [
					"View all in ",
					category.name,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4 transition-transform group-hover:translate-x-1",
						"aria-hidden": "true"
					})
				]
			})
		]
	});
}
function CategorySkeleton({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "categories.loading_state",
		className: "flex flex-col rounded-md border border-border bg-card p-6 shadow-subtle md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-7 w-2/3 animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-px w-16 bg-accent/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full animate-pulse rounded bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-5/6 animate-pulse rounded bg-muted" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-24 animate-pulse rounded-md bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-20 animate-pulse rounded-md bg-muted" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: id
			})
		]
	});
}
function Categories() {
	useSeo("Categories", "Browse the Mathrushree Enterprises catalogue by category and subcategory — fine stationery and lifestyle goods.");
	const { data: categories, isLoading, isError, refetch } = useCategories();
	const sorted = categories ? [...categories].sort((a, b) => Number(a.order - b.order)) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "categories.page",
		className: "bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-accent/25 bg-muted/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-accent",
						children: "The Catalogue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "mt-3 block h-px w-20 origin-left animate-gold-sweep bg-accent/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl",
						children: "Browse by Category"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
						children: "Every entry in our ledger, organised by category and subcategory. Select a collection to view the pieces within it."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
			children: [
				isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "categories.list",
					className: "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3",
					children: Array.from({ length: 6 }, (_, i) => `category-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySkeleton, { id }, id))
				}),
				isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "categories.error_state",
					className: "mx-auto max-w-xl rounded-md border border-destructive/40 bg-card p-8 text-center shadow-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight text-foreground",
							children: "We couldn’t load the categories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Something went wrong while fetching the catalogue. Please try again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-ocid": "categories.retry_button",
							onClick: () => void refetch(),
							className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
							children: "Try again"
						})
					]
				}),
				!isLoading && !isError && sorted.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "categories.empty_state",
					className: "mx-auto max-w-xl rounded-md border border-border bg-card p-10 text-center shadow-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 font-display text-2xl tracking-tight text-foreground",
							children: "No categories yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: "The catalogue is being prepared. In the meantime, browse the full collection or get in touch with an enquiry."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: {},
								"data-ocid": "categories.browse_shop_button",
								className: "inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
								children: "Browse the shop"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								"data-ocid": "categories.contact_button",
								className: "inline-flex items-center justify-center rounded-md border border-accent/60 px-5 py-2.5 text-sm font-medium tracking-wide text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
								children: "Make an enquiry"
							})]
						})
					]
				}),
				!isLoading && !isError && sorted.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "categories.list",
					className: "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3",
					children: sorted.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, { category }, category.id.toString()))
				})
			]
		})]
	});
}
//#endregion
export { Categories as default };

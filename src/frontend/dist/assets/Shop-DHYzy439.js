import { B as require_react, F as createLucideIcon, N as ProductSort, a as useCategories, ct as __toESM, i as useBrands, t as useSeo, x as usePublishedProducts, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CGv8Q1Kf.js";
import { n as useNavigate, o as X, r as useSearch, s as Search } from "./index-Bipk6PsK.js";
import { t as ProductCard } from "./ProductCard-C2bikvGT.js";
import { t as Button } from "./button-cWuqRO5T.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["line", {
		x1: "21",
		x2: "14",
		y1: "4",
		y2: "4",
		key: "obuewd"
	}],
	["line", {
		x1: "10",
		x2: "3",
		y1: "4",
		y2: "4",
		key: "1q6298"
	}],
	["line", {
		x1: "21",
		x2: "12",
		y1: "12",
		y2: "12",
		key: "1iu8h1"
	}],
	["line", {
		x1: "8",
		x2: "3",
		y1: "12",
		y2: "12",
		key: "ntss68"
	}],
	["line", {
		x1: "21",
		x2: "16",
		y1: "20",
		y2: "20",
		key: "14d8ph"
	}],
	["line", {
		x1: "12",
		x2: "3",
		y1: "20",
		y2: "20",
		key: "m0wm8r"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "2",
		y2: "6",
		key: "14e1ph"
	}],
	["line", {
		x1: "8",
		x2: "8",
		y1: "10",
		y2: "14",
		key: "1i6ji0"
	}],
	["line", {
		x1: "16",
		x2: "16",
		y1: "18",
		y2: "22",
		key: "1lctlv"
	}]
]);
//#endregion
//#region src/pages/Shop.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 12n;
var SORT_OPTIONS = [
	{
		value: ProductSort.newest,
		label: "Newest first"
	},
	{
		value: ProductSort.nameAsc,
		label: "Name A–Z"
	},
	{
		value: ProductSort.nameDesc,
		label: "Name Z–A"
	},
	{
		value: ProductSort.priceAsc,
		label: "Price: low to high"
	},
	{
		value: ProductSort.priceDesc,
		label: "Price: high to low"
	}
];
var SORT_VALUES = new Set(SORT_OPTIONS.map((option) => option.value));
function parseId(value) {
	if (!value) return void 0;
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) && parsed >= 0 ? BigInt(parsed) : void 0;
}
function parsePage(value) {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed > 0 ? BigInt(parsed) : 1n;
}
/** Read the full query string so filter state survives a refresh. */
function readRawSearch() {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	const read = (key) => params.get(key) ?? void 0;
	return {
		search: read("search"),
		category: read("category"),
		subcategory: read("subcategory"),
		brand: read("brand"),
		sort: read("sort"),
		page: read("page")
	};
}
function Shop() {
	useSeo("Shop the Catalogue", "Browse the full catalogue of fine stationery and lifestyle goods, filtered by category, brand and price.");
	const navigate = useNavigate();
	const routeSearch = useSearch({ from: "/shop" });
	const [filters, setFilters] = (0, import_react.useState)(() => ({
		...readRawSearch(),
		search: routeSearch.search ?? readRawSearch().search
	}));
	const [searchDraft, setSearchDraft] = (0, import_react.useState)(filters.search ?? "");
	const { data: categories } = useCategories();
	const { data: brands } = useBrands();
	const categoryId = parseId(filters.category);
	const subcategoryId = parseId(filters.subcategory);
	const brandId = parseId(filters.brand);
	const page = parsePage(filters.page);
	const sort = filters.sort && SORT_VALUES.has(filters.sort) ? filters.sort : ProductSort.newest;
	const filter = (0, import_react.useMemo)(() => ({
		search: filters.search || void 0,
		categoryId,
		subcategoryId,
		brandId,
		sort,
		page,
		pageSize: PAGE_SIZE
	}), [
		filters.search,
		categoryId,
		subcategoryId,
		brandId,
		sort,
		page
	]);
	const { data, isLoading, isError, refetch } = usePublishedProducts(filter);
	(0, import_react.useEffect)(() => {
		const next = {};
		if (filters.search) next.search = filters.search;
		if (filters.category) next.category = filters.category;
		if (filters.subcategory) next.subcategory = filters.subcategory;
		if (filters.brand) next.brand = filters.brand;
		if (filters.sort) next.sort = filters.sort;
		if (filters.page && filters.page !== "1") next.page = filters.page;
		navigate({
			to: "/shop",
			search: next,
			replace: true
		});
	}, [filters, navigate]);
	const subcategories = (categories?.find((item) => item.id === categoryId))?.subcategories ?? [];
	const total = data?.total ?? 0n;
	const totalNumber = Number(total);
	const pageSize = Number(data?.pageSize ?? PAGE_SIZE) || Number(PAGE_SIZE);
	const totalPages = Math.max(1, Math.ceil(totalNumber / pageSize));
	const currentPage = Number(page);
	const products = data?.products ?? [];
	const hasActiveFilters = Boolean(filters.search) || categoryId !== void 0 || subcategoryId !== void 0 || brandId !== void 0 || filters.sort !== void 0 && filters.sort !== ProductSort.newest;
	function updateFilters(patch) {
		setFilters((current) => {
			const next = {
				...current,
				...patch
			};
			if (!("page" in patch)) next.page = void 0;
			return next;
		});
	}
	function handleSearchSubmit(event) {
		event.preventDefault();
		updateFilters({ search: searchDraft.trim() || void 0 });
	}
	function handleCategoryChange(value) {
		if (value === "all") {
			updateFilters({
				category: void 0,
				subcategory: void 0
			});
			return;
		}
		updateFilters({
			category: value,
			subcategory: void 0
		});
	}
	function handleReset() {
		setSearchDraft("");
		setFilters({});
	}
	function goToPage(nextPage) {
		updateFilters({ page: nextPage <= 1 ? void 0 : String(nextPage) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "shop.page",
		className: "mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-4 border-b border-accent/30 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-accent",
					children: "The Catalogue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight md:text-5xl",
					children: "Shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-base text-muted-foreground md:text-lg",
					children: "Every entry is presented as it is kept in our ledger — filter by category, brand or price to find the piece you are looking for."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-ocid": "shop.filters_panel",
				className: "flex flex-col gap-6 rounded-md border border-border bg-card p-5 shadow-subtle lg:sticky lg:top-24 lg:self-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
								className: "h-4 w-4 text-accent",
								"aria-hidden": "true"
							}), "Refine"]
						}), hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleReset,
							"data-ocid": "shop.reset_button",
							className: "text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
							children: "Reset"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearchSubmit,
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "shop-search",
								className: "label-caps text-muted-foreground",
								children: "Search"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "shop-search",
									type: "search",
									value: searchDraft,
									onChange: (event) => setSearchDraft(event.target.value),
									placeholder: "Name, SKU or keyword",
									"data-ocid": "shop.search_input",
									className: "w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "outline",
								size: "sm",
								"data-ocid": "shop.search_button",
								className: "mt-1 border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground",
								children: "Apply search"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "shop-category",
							className: "label-caps text-muted-foreground",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.category ?? "all",
							onValueChange: handleCategoryChange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "shop-category",
								"data-ocid": "shop.category_select",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All categories" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All categories"
							}), (categories ?? []).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: category.id.toString(),
								children: category.name
							}, category.id.toString()))] })]
						})]
					}),
					subcategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "shop-subcategory",
							className: "label-caps text-muted-foreground",
							children: "Subcategory"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.subcategory ?? "all",
							onValueChange: (value) => updateFilters({ subcategory: value === "all" ? void 0 : value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "shop-subcategory",
								"data-ocid": "shop.subcategory_select",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All subcategories" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All subcategories"
							}), subcategories.map((subcategory) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: subcategory.id.toString(),
								children: subcategory.name
							}, subcategory.id.toString()))] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "shop-brand",
							className: "label-caps text-muted-foreground",
							children: "Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.brand ?? "all",
							onValueChange: (value) => updateFilters({ brand: value === "all" ? void 0 : value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "shop-brand",
								"data-ocid": "shop.brand_select",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All brands" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All brands"
							}), (brands ?? []).map((brand) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: brand.id.toString(),
								children: brand.name
							}, brand.id.toString()))] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "shop-sort",
							className: "label-caps text-muted-foreground",
							children: "Sort by"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sort,
							onValueChange: (value) => updateFilters({ sort: value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "shop-sort",
								"data-ocid": "shop.sort_select",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Newest first" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SORT_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: option.value,
								children: option.label
							}, option.value)) })]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-ocid": "shop.result_count",
						className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
						children: isLoading ? "Loading entries…" : `${totalNumber} ${totalNumber === 1 ? "entry" : "entries"}`
					}), hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleReset,
						"data-ocid": "shop.clear_filters_button",
						className: "inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "Clear filters"]
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "shop.loading_state",
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3",
					children: Array.from({ length: 6 }, (_, i) => `shop-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] animate-pulse bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-3/4 animate-pulse rounded bg-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded bg-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full animate-pulse rounded bg-muted" })
							]
						})]
					}, id))
				}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "shop.error_state",
					className: "flex flex-col items-center gap-4 rounded-md border border-destructive/40 bg-card px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "We could not load the catalogue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm text-muted-foreground",
							children: "Something interrupted the ledger. Please try again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							"data-ocid": "shop.retry_button",
							onClick: () => void refetch(),
							className: "border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground",
							children: "Retry"
						})
					]
				}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "shop.empty_state",
					className: "flex flex-col items-center gap-4 rounded-md border border-border bg-card px-6 py-20 text-center shadow-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "h-6 w-6",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "No entries match your filters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm text-muted-foreground",
							children: "Try a broader search, or clear the filters to see the full catalogue again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							"data-ocid": "shop.empty_reset_button",
							onClick: handleReset,
							className: "bg-primary text-primary-foreground hover:bg-primary/90",
							children: "Reset filters"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "shop.product_grid",
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3",
					children: products.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						index
					}, product.id.toString()))
				}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Pagination",
					"data-ocid": "shop.pagination",
					className: "flex items-center justify-between gap-4 border-t border-accent/30 pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							"data-ocid": "shop.pagination_prev",
							disabled: currentPage <= 1,
							onClick: () => goToPage(currentPage - 1),
							className: "border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}), "Previous"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
							children: [
								"Page ",
								currentPage,
								" of ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							"data-ocid": "shop.pagination_next",
							disabled: currentPage >= totalPages,
							onClick: () => goToPage(currentPage + 1),
							className: "border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground",
							children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})]
						})
					]
				})] })]
			})]
		})]
	});
}
//#endregion
export { Shop as default };

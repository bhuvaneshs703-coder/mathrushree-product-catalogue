import { F as createLucideIcon, i as useBrands, t as useSeo, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ArrowRight } from "./arrow-right-DTG-2zZv.js";
import { t as ImageOff } from "./image-off-BW6tVGvY.js";
import { t as Link } from "./index-Bipk6PsK.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Store = createLucideIcon("store", [
	["path", {
		d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",
		key: "ztvudi"
	}],
	["path", {
		d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
		key: "1b2hhj"
	}],
	["path", {
		d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",
		key: "2ebpfo"
	}],
	["path", {
		d: "M2 7h20",
		key: "1fcdvo"
	}],
	["path", {
		d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
		key: "6c3vgh"
	}]
]);
//#endregion
//#region src/pages/Brands.tsx
var import_jsx_runtime = require_jsx_runtime();
function BrandCard({ brand, index }) {
	const logoUrl = brand.logo?.getDirectURL?.();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/shop",
		search: { search: brand.name },
		"data-ocid": `brands.item.${index + 1}`,
		className: "group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-accent/20 bg-muted",
			children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: logoUrl,
				alt: `${brand.name} logo`,
				loading: "lazy",
				className: "h-full w-full object-contain p-8 transition-smooth group-hover:scale-[1.03]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps text-[10px]",
					children: "No logo"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl leading-snug text-foreground line-clamp-2",
					children: brand.name
				}),
				brand.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground line-clamp-3",
					children: brand.description
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm italic text-muted-foreground",
					children: "Explore the collection."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent",
					children: ["View in shop", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3.5 w-3.5 transition-smooth group-hover:translate-x-0.5",
						"aria-hidden": "true"
					})]
				})
			]
		})]
	});
}
function BrandSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "brands.loading_state",
		className: "flex flex-col overflow-hidden rounded-md border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[16/10] animate-pulse bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-2/3 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-4/5 animate-pulse rounded bg-muted" })
			]
		})]
	});
}
function Brands() {
	useSeo("Brands", "Discover the makers and houses whose fine stationery and lifestyle goods we carry.");
	const { data: brands, isLoading, isError, refetch } = useBrands();
	const hasBrands = !!brands && brands.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "brands.page",
		className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-accent",
						children: "The Houses We Carry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl tracking-tight text-foreground md:text-5xl",
						children: "Brands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "A curated register of the makers behind our catalogue — each one chosen for craft, provenance and enduring quality."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10 h-px w-full bg-accent/30" }),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }, (_, i) => `brand-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandSkeleton, {}, id))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "brands.error_state",
				className: "mt-10 flex flex-col items-center gap-4 rounded-md border border-border bg-card px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-foreground",
						children: "We couldn't load the brands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm text-muted-foreground",
						children: "Something went wrong while fetching the register. Please try again."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-ocid": "brands.retry_button",
						onClick: () => void refetch(),
						className: "rounded-md border border-accent/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						children: "Try again"
					})
				]
			}) : !hasBrands ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "brands.empty_state",
				className: "mt-10 flex flex-col items-center gap-4 rounded-md border border-dashed border-accent/40 bg-card px-6 py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
							className: "h-6 w-6",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-foreground",
						children: "No brands yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm leading-relaxed text-muted-foreground",
						children: "Our register of makers is being prepared. In the meantime, browse the full catalogue or get in touch with an enquiry."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {},
							"data-ocid": "brands.browse_button",
							className: "rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
							children: "Browse the shop"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							"data-ocid": "brands.enquire_button",
							className: "rounded-md border border-accent/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
							children: "Make an enquiry"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-ocid": "brands.list",
				className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: brands.map((brand, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandCard, {
						brand,
						index
					})
				}, brand.id.toString()))
			})
		]
	});
}
//#endregion
export { Brands as default };

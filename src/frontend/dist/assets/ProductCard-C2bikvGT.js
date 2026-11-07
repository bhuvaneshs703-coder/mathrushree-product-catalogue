import { M as Availability, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ImageOff } from "./image-off-BW6tVGvY.js";
import { t as Link } from "./index-Bipk6PsK.js";
//#region src/components/ProductCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var AVAILABILITY_LABEL = {
	[Availability.inStock]: "In Stock",
	[Availability.outOfStock]: "Out of Stock",
	[Availability.madeToOrder]: "Made to Order"
};
function formatPrice(price) {
	return `₹${price.toLocaleString("en-IN")}`;
}
/** Ledger-entry product card used by every product listing. */
function ProductCard({ product, index }) {
	const image = [...product.images].sort((a, b) => Number(a.order - b.order))[0];
	const imageUrl = image?.blob?.getDirectURL?.();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$productId",
		params: { productId: product.id.toString() },
		"data-ocid": index !== void 0 ? `product.card.${index + 1}` : "product.card",
		className: "group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] overflow-hidden bg-muted",
			children: [imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: image?.altText ?? product.name,
				loading: "lazy",
				className: "h-full w-full object-cover transition-smooth group-hover:scale-[1.03]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full items-center justify-center text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
					className: "h-8 w-8",
					"aria-hidden": "true"
				})
			}), (product.isNewArrival || product.isBestseller || product.isTrending) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-3 flex flex-wrap gap-1.5",
				children: [
					product.isNewArrival && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground",
						children: "New"
					}),
					product.isBestseller && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground",
						children: "Bestseller"
					}),
					product.isTrending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground",
						children: "Trending"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg leading-snug text-foreground line-clamp-2",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
					children: product.sku
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground line-clamp-2",
					children: product.shortDescription
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: AVAILABILITY_LABEL[product.availability]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm font-semibold text-foreground",
						children: product.price !== void 0 ? formatPrice(product.price) : "Enquire for price"
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };

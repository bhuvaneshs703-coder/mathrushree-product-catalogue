import { B as require_react, F as createLucideIcon, M as Availability, a as useCategories, b as usePublishedProduct, ct as __toESM, i as useBrands, t as useSeo, x as usePublishedProducts, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ArrowLeft } from "./arrow-left-AUJPrEEP.js";
import { t as Check } from "./check-C-OcsRJo.js";
import { t as ImageOff } from "./image-off-BW6tVGvY.js";
import { t as Sparkles } from "./sparkles-CVUm89co.js";
import { a as EnquiryButtons, i as useParams, t as Link } from "./index-Bipk6PsK.js";
import { t as ProductCard } from "./ProductCard-C2bikvGT.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PackageX = createLucideIcon("package-x", [
	["path", {
		d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
		key: "e7tb2h"
	}],
	["path", {
		d: "m7.5 4.27 9 5.15",
		key: "1c824w"
	}],
	["polyline", {
		points: "3.29 7 12 12 20.71 7",
		key: "ousv84"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "22",
		y2: "12",
		key: "a4e8g8"
	}],
	["path", {
		d: "m17 13 5 5m-5 0 5-5",
		key: "im3w4b"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
//#endregion
//#region src/pages/ProductDetail.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AVAILABILITY_LABEL = {
	[Availability.inStock]: "In Stock",
	[Availability.outOfStock]: "Out of Stock",
	[Availability.madeToOrder]: "Made to Order"
};
var AVAILABILITY_TONE = {
	[Availability.inStock]: "text-success",
	[Availability.outOfStock]: "text-destructive",
	[Availability.madeToOrder]: "text-accent"
};
function formatPrice(price) {
	return `₹${price.toLocaleString("en-IN")}`;
}
function parseProductId(raw) {
	if (!raw) return void 0;
	try {
		const value = BigInt(raw);
		return value >= 0n ? value : void 0;
	} catch {
		return;
	}
}
function ProductGallery({ product }) {
	const images = (0, import_react.useMemo)(() => [...product.images].sort((a, b) => Number(a.order - b.order)), [product.images]);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const active = images[activeIndex];
	const activeUrl = active?.blob?.getDirectURL?.();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ocid": "product.gallery",
			className: "relative aspect-[4/5] overflow-hidden rounded-md border border-accent/40 bg-muted",
			children: activeUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: activeUrl,
				alt: active?.altText ?? product.name,
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
					className: "h-10 w-10",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wider",
					children: "Image coming soon"
				})]
			})
		}), images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ocid": "product.thumbnail_list",
			className: "grid grid-cols-4 gap-3 sm:grid-cols-5",
			children: images.map((image, index) => {
				const url = image.blob?.getDirectURL?.();
				const isActive = index === activeIndex;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-ocid": `product.thumbnail.${index + 1}`,
					onClick: () => setActiveIndex(index),
					"aria-label": `View image ${index + 1} of ${images.length}`,
					"aria-pressed": isActive,
					className: `aspect-square w-full overflow-hidden rounded-md border bg-muted transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isActive ? "border-accent ring-1 ring-accent" : "border-border hover:border-accent/60"}`,
					children: url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: url,
						alt: image.altText ?? `${product.name} image ${index + 1}`,
						loading: "lazy",
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-full w-full items-center justify-center text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					})
				}) }, image.id.toString());
			})
		})]
	});
}
function DetailRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-0.5 border-b border-border/70 py-3 sm:flex-row sm:items-baseline sm:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "label-caps w-40 shrink-0 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-sm text-foreground",
			children: value
		})]
	});
}
function ProductDetailContent({ product }) {
	const { data: categories } = useCategories();
	const { data: brands } = useBrands();
	const category = categories?.find((item) => item.id === product.categoryId);
	const subcategory = category?.subcategories.find((item) => item.id === product.subcategoryId);
	const brand = brands?.find((item) => item.id === product.brandId);
	const relatedFilter = (0, import_react.useMemo)(() => product.brandId !== void 0 ? {
		brandId: product.brandId,
		pageSize: 5n
	} : {
		categoryId: product.categoryId,
		pageSize: 5n
	}, [product.brandId, product.categoryId]);
	const { data: relatedPage } = usePublishedProducts(relatedFilter);
	const related = (relatedPage?.products ?? []).filter((item) => item.id !== product.id).slice(0, 4);
	const categoryLabel = subcategory ? `${category?.name ?? ""} · ${subcategory.name}` : category?.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Breadcrumb",
				className: "text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "flex flex-wrap items-center gap-2 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							"data-ocid": "product.breadcrumb_shop_link",
							className: "transition-smooth hover:text-accent",
							children: "Shop"
						}) }),
						category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"aria-hidden": "true",
							children: "/"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: { search: category.name },
							"data-ocid": "product.breadcrumb_category_link",
							className: "transition-smooth hover:text-accent",
							children: category.name
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-foreground",
							children: product.name
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGallery, { product }, product.id.toString()), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/brands",
									"data-ocid": "product.brand_link",
									className: "label-caps w-fit text-accent transition-smooth hover:text-primary",
									children: brand.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
											className: "h-3.5 w-3.5",
											"aria-hidden": "true"
										}), product.sku]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-ocid": "product.availability",
										className: `inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${AVAILABILITY_TONE[product.availability]}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "h-3.5 w-3.5",
											"aria-hidden": "true"
										}), AVAILABILITY_LABEL[product.availability]]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-relaxed text-muted-foreground",
							children: product.shortDescription
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-baseline gap-3 border-y border-accent/30 py-5",
							children: product.price !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-ocid": "product.price",
								className: "font-display text-3xl text-foreground",
								children: formatPrice(product.price)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-ocid": "product.enquire_price",
								className: "font-display text-2xl text-accent",
								children: "Enquire for price"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "label-caps text-muted-foreground",
								children: "Enquire about this piece"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { product })]
						}),
						categoryLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Category",
									value: categoryLabel
								}),
								brand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Brand",
									value: brand.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "SKU",
									value: product.sku
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Availability",
									value: AVAILABILITY_LABEL[product.availability]
								})
							]
						})
					]
				})]
			}),
			product.longDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "product.description_section",
				className: "grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground",
					children: product.longDescription
				})]
			}),
			product.specifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "product.specifications_section",
				className: "grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Specifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "max-w-3xl",
					children: product.specifications.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						label: spec.name,
						value: spec.value
					}, `${spec.name}-${spec.value}`))
				})]
			}),
			product.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "product.variants_section",
				className: "grid gap-6 border-t border-accent/30 pt-10 lg:grid-cols-[220px_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Available Variants"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: product.variants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1 rounded-md border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps text-muted-foreground",
								children: variant.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-foreground",
								children: variant.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
								children: [variant.sku && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono uppercase tracking-wider",
									children: variant.sku
								}), variant.availability !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: AVAILABILITY_TONE[variant.availability] ?? void 0,
									children: AVAILABILITY_LABEL[variant.availability]
								})]
							})
						]
					}, `${variant.name}-${variant.value}`))
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "product.related_section",
				className: "border-t border-accent/30 pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "h-5 w-5 text-accent",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "You may also like"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: related.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: item,
						index
					}, item.id.toString()))
				})]
			})
		]
	});
}
function NotFoundState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "product.not_found_state",
		className: "mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageX, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Product not available"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm leading-relaxed text-muted-foreground",
				children: "This piece is not part of the published catalogue. It may have been removed or is not yet available."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				"data-ocid": "product.back_to_shop_button",
				className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				}), "Back to the catalogue"]
			})
		]
	});
}
function LoadingState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "product.loading_state",
		className: "mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] animate-pulse rounded-md bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-3/4 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-40 animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-full animate-pulse rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-48 animate-pulse rounded bg-muted" })
			]
		})]
	});
}
function ProductDetail() {
	const productId = parseProductId(useParams({ strict: false }).productId);
	const { data: product, isLoading } = usePublishedProduct(productId);
	const isNotFound = !isLoading && (productId === void 0 || !product);
	useSeo(product ? product.name : "Product not available", product ? product.shortDescription || `Enquire about ${product.name}.` : "This product is not part of the published catalogue.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "product.page",
		className: "mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {}) : isNotFound || !product ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailContent, { product })
	});
}
//#endregion
export { ProductDetail as default };

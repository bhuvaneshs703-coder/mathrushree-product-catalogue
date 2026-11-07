import { F as createLucideIcon, a as useCategories, t as useSeo, v as useHomepageSections, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as ArrowRight } from "./arrow-right-DTG-2zZv.js";
import { t as BookOpen } from "./book-open-l2j7X9EN.js";
import { t as Mail } from "./mail-BidDLVoV.js";
import { t as Sparkles } from "./sparkles-CVUm89co.js";
import { a as EnquiryButtons, c as Phone, d as formatPhoneNumber, t as Link, u as BUSINESS_NAME } from "./index-Bipk6PsK.js";
import { t as ProductCard } from "./ProductCard-C2bikvGT.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gift = createLucideIcon("gift", [
	["rect", {
		x: "3",
		y: "8",
		width: "18",
		height: "4",
		rx: "1",
		key: "bkv52"
	}],
	["path", {
		d: "M12 8v13",
		key: "1c76mn"
	}],
	["path", {
		d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
		key: "6wjy6b"
	}],
	["path", {
		d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
		key: "1ihvrl"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PenTool = createLucideIcon("pen-tool", [
	["path", {
		d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
		key: "nt11vn"
	}],
	["path", {
		d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
		key: "15qc1e"
	}],
	["path", {
		d: "m2.3 2.3 7.286 7.286",
		key: "1wuzzi"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "2",
		key: "xmgehs"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
//#endregion
//#region src/pages/Home.tsx
var import_jsx_runtime = require_jsx_runtime();
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "relative inline-block pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "label-caps text-accent",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "absolute bottom-0 left-0 h-px w-16 origin-left animate-gold-sweep bg-accent"
		})]
	});
}
function SectionHeading({ label, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight text-foreground md:text-4xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-base text-muted-foreground",
				children: description
			}) : null
		]
	});
}
function ProductGrid({ products, ocidPrefix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": `${ocidPrefix}.list`,
		className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
		children: products.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
			product,
			index
		}, product.id.toString()))
	});
}
function SectionEmptyState({ ocid, message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": ocid,
		className: "flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-accent/40 bg-muted/40 px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
				className: "h-6 w-6 text-accent",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted-foreground",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				search: {},
				"data-ocid": `${ocid}.link`,
				className: "text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:text-primary",
				children: "Browse the catalogue"
			})
		]
	});
}
function ProductSection({ ocid, label, title, description, products, emptyMessage, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": `${ocid}.section`,
		className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-10 flex flex-wrap items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 hidden text-accent sm:block",
					"aria-hidden": "true",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					label,
					title,
					description
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				search: {},
				"data-ocid": `${ocid}.view_all_link`,
				className: "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary transition-smooth hover:text-accent",
				children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
					"aria-hidden": "true"
				})]
			})]
		}), products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, {
			products,
			ocidPrefix: ocid
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEmptyState, {
			ocid: `${ocid}.empty_state`,
			message: emptyMessage
		})]
	});
}
var CATEGORY_ICONS = [
	BookOpen,
	PenTool,
	Gift,
	Sparkles,
	Star,
	TrendingUp
];
function CategoryGrid({ categories }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "home.categories.section",
		className: "border-y border-accent/20 bg-muted/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					label: "Browse",
					title: "Shop by category",
					description: "Explore the catalogue by the collections our house is known for."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categories",
					"data-ocid": "home.categories.view_all_link",
					className: "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary transition-smooth hover:text-accent",
					children: ["All categories", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
						"aria-hidden": "true"
					})]
				})]
			}), categories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ocid": "home.categories.list",
				className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
				children: categories.map((category, index) => {
					const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: { search: category.name },
						"data-ocid": `home.category.card.${index + 1}`,
						className: "group flex flex-col items-center gap-4 rounded-md border border-accent/40 bg-card px-4 py-8 text-center shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg leading-snug text-foreground",
								children: category.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: category.subcategories.length > 0 ? `${category.subcategories.length} subcategories` : "Explore"
							})
						]
					}, category.id.toString());
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEmptyState, {
				ocid: "home.categories.empty_state",
				message: "Our category shelves are being catalogued. Please check back shortly."
			})]
		})
	});
}
function CollectionCard({ collection, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/shop",
		search: {},
		"data-ocid": `home.collection.card.${index + 1}`,
		className: "group flex flex-col justify-between gap-6 rounded-md border border-accent/40 bg-primary p-6 text-primary-foreground shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-caps text-accent",
					children: "Collection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl leading-snug text-primary-foreground",
					children: collection.name
				}),
				collection.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary-foreground/70 line-clamp-3",
					children: collection.description
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent",
			children: [collection.productIds.length > 0 ? `${collection.productIds.length} pieces` : "Discover", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
				className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
				"aria-hidden": "true"
			})]
		})]
	});
}
function FeaturedCollections({ collections }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "home.collections.section",
		className: "border-y border-accent/20 bg-muted/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					label: "Curated",
					title: "Featured collections",
					description: "Hand-assembled groupings from the house, arranged for the season."
				})
			}), collections.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ocid": "home.collections.list",
				className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: collections.map((collection, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionCard, {
					collection,
					index
				}, collection.id.toString()))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEmptyState, {
				ocid: "home.collections.empty_state",
				message: "Featured collections are being prepared. In the meantime, browse the full catalogue."
			})]
		})
	});
}
function ContactBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "home.contact.section",
		className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 rounded-md border border-accent/40 bg-card p-8 shadow-subtle md:grid-cols-2 md:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Enquiries" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl tracking-tight text-foreground md:text-4xl",
						children: ["Speak with ", BUSINESS_NAME]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-base text-muted-foreground",
						children: "Prices are shared on enquiry. Message us on WhatsApp or call the house directly and we will help you find the right piece."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { className: "mt-2" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center gap-6 border-t border-accent/20 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps text-muted-foreground",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:+91${formatPhoneNumber().replace(/\D/g, "").slice(-10)}`,
							"data-ocid": "home.contact.phone_link",
							className: "font-mono text-base text-foreground transition-smooth hover:text-accent",
							children: formatPhoneNumber()
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-caps text-muted-foreground",
							children: "Enquiry desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							"data-ocid": "home.contact.enquiry_link",
							className: "text-base text-foreground transition-smooth hover:text-accent",
							children: "Send a written enquiry"
						})]
					})]
				})]
			})]
		})
	});
}
function Home() {
	useSeo("Fine Stationery & Lifestyle", "A curated catalogue of fine stationery and lifestyle goods from Mathrushree Enterprises — enquire by phone or WhatsApp.");
	const categoriesQuery = useCategories();
	const sectionsQuery = useHomepageSections();
	const categories = categoriesQuery.data ?? [];
	const sections = sectionsQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "home.page",
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-accent/20 bg-background paper-texture",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex animate-fade-up flex-col gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Est. catalogue house" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl",
								children: "Fine stationery & lifestyle, catalogued with care."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "max-w-xl text-base text-muted-foreground md:text-lg",
								children: [BUSINESS_NAME, " presents a premium editorial catalogue of notebooks, writing instruments and desk objects — each entry finished in ink on paper, with prices shared on enquiry."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									search: {},
									"data-ocid": "home.hero.shop_button",
									className: "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
									children: ["Browse the catalogue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { variant: "outline" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-md border border-accent/40 shadow-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/generated/hero-stationery.dim_1600x1200.jpg",
								alt: "Overhead flat-lay of navy and ivory journals, a black and gold fountain pen and a brass wax seal stamp on natural linen.",
								className: "h-full w-full object-cover",
								width: 1600,
								height: 1200
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "absolute -bottom-3 -left-3 hidden h-24 w-24 border-b border-l border-accent/60 md:block"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGrid, { categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSection, {
				ocid: "home.trending",
				label: "In demand",
				title: "Trending now",
				description: "The pieces our clients are asking about this week.",
				products: sections?.trending ?? [],
				emptyMessage: "Nothing is trending just yet. New pieces are added regularly — check back soon.",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-y border-accent/20 bg-muted/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSection, {
					ocid: "home.new_arrivals",
					label: "Just in",
					title: "New arrivals",
					description: "Freshly catalogued additions to the house shelves.",
					products: sections?.newArrivals ?? [],
					emptyMessage: "No new arrivals have been catalogued yet. Please check back shortly.",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSection, {
				ocid: "home.bestsellers",
				label: "House favourites",
				title: "Bestsellers",
				description: "The entries our clients return to again and again.",
				products: sections?.bestsellers ?? [],
				emptyMessage: "Bestsellers will appear here once the catalogue is populated.",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedCollections, { collections: sections?.featuredCollections ?? [] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactBlock, {})
		]
	});
}
//#endregion
export { Home as default };

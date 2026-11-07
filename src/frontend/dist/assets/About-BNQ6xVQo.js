import { a as useCategories, t as useSeo, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as BookOpen } from "./book-open-l2j7X9EN.js";
import { t as Layers } from "./layers-DfTNf6x0.js";
import { t as Sparkles } from "./sparkles-CVUm89co.js";
import { a as EnquiryButtons, d as formatPhoneNumber, t as Link, u as BUSINESS_NAME } from "./index-Bipk6PsK.js";
//#region src/pages/About.tsx
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	{
		icon: Layers,
		title: "A considered range",
		body: "Stationery and lifestyle goods gathered into clear categories, so the right piece is easy to find."
	},
	{
		icon: BookOpen,
		title: "Presented like a ledger",
		body: "Every entry is listed with the same care a heritage ledger gives its pages — ordered, legible and unhurried."
	},
	{
		icon: Sparkles,
		title: "Enquire, don't guess",
		body: "Prices are shown only when provided. For anything else, a quick call or message gets you a straight answer."
	}
];
function About() {
	useSeo("About", `About ${BUSINESS_NAME} — a curated catalogue of stationery and lifestyle products, with phone and WhatsApp enquiries.`);
	const { data: categories, isLoading } = useCategories();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "about.page",
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-accent/25 bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-accent",
							children: "About the house"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-5xl",
							children: BUSINESS_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg",
							children: "A curated catalogue of stationery and lifestyle products. We gather the range into clear categories and present each entry plainly, so you can browse at your own pace and enquire directly when something catches your eye."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { variant: "outline" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "paper-texture border-b border-accent/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-caps text-accent",
								children: "What we supply"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-3xl tracking-tight md:text-4xl",
								children: "The range, by category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "These are the categories our catalogue currently holds. Each one opens into the products we carry."
							})
						]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ocid": "about.categories.loading_state",
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: Array.from({ length: 6 }, (_, i) => `about-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-lg border border-border bg-muted" }, id))
					}) : categories && categories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "about.categories.list",
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: categories.map((category, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categories",
							"data-ocid": `about.category.item.${index + 1}`,
							className: "group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-smooth hover:border-accent/60 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl tracking-tight text-foreground",
								children: category.name
							}), category.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: category.description
							}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-smooth group-hover:text-primary",
								children: "View category"
							})]
						}) }, category.id.toString()))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "about.categories.empty_state",
						className: "mt-10 rounded-lg border border-dashed border-border bg-card p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-foreground",
								children: "The catalogue is being prepared"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
								children: "Categories will appear here as the range is listed. In the meantime, call or message us and we will help you directly."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { size: "sm" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-accent/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-accent",
							children: "How we work"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl tracking-tight md:text-4xl",
							children: "Plainly presented, directly answered"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-6 md:grid-cols-3",
						children: PILLARS.map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillar.icon, {
										className: "h-5 w-5",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg tracking-tight text-foreground",
									children: pillar.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: pillar.body
								})
							]
						}, pillar.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-accent",
							children: "Enquiries"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl tracking-tight md:text-3xl",
							children: "Talk to us about the range"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-primary-foreground/75",
							children: [
								"Call or message us at",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-primary-foreground",
									children: formatPhoneNumber()
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, { variant: "outline" })]
				})
			})
		]
	});
}
//#endregion
export { About as default };

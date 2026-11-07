import { B as require_react, F as createLucideIcon, P as PublishState, ct as __toESM, t as useSeo, v as useHomepageSections, w as useSetProductFlag, x as usePublishedProducts, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as CircleCheck } from "./circle-check-Hhwq11bV.js";
import { n as Badge, r as PackageOpen, t as Skeleton } from "./skeleton-BI1IfxoR.js";
import { c as useComposedRefs, r as cn, t as Button } from "./button-cWuqRO5T.js";
import { a as Primitive, d as composeEventHandlers, n as useControllableState, r as useSize, t as usePrevious, u as createContextScope } from "./dist-Cw4vAE1R.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutGrid = createLucideIcon("layout-grid", [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "1g98yp"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1",
		key: "6d4xhi"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}]
]);
//#endregion
//#region src/components/ui/card.tsx
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("leading-none font-semibold", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("px-6", className),
		...props
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.1.11_@types+react@19.1.17__@types+reac_d28b9ab4436ff6508f78f61d6091c188/node_modules/@radix-ui/react-switch/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "switch",
		className: cn("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			"data-slot": "switch-thumb",
			className: cn("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
		})
	});
}
//#endregion
//#region src/pages/owner/HomepageCuration.tsx
var FLAGS = [
	{
		key: "showOnHomepage",
		apiFlag: "showOnHomepage",
		label: "On homepage",
		short: "Homepage"
	},
	{
		key: "isTrending",
		apiFlag: "trending",
		label: "Trending",
		short: "Trending"
	},
	{
		key: "isNewArrival",
		apiFlag: "newArrival",
		label: "New Arrival",
		short: "New"
	},
	{
		key: "isBestseller",
		apiFlag: "bestseller",
		label: "Bestseller",
		short: "Bestseller"
	},
	{
		key: "isFeatured",
		apiFlag: "featured",
		label: "Featured",
		short: "Featured"
	}
];
var SECTIONS = [
	{
		key: "trending",
		title: "Trending",
		description: "Products flagged as trending."
	},
	{
		key: "newArrivals",
		title: "New Arrivals",
		description: "Products flagged as new arrivals."
	},
	{
		key: "bestsellers",
		title: "Bestsellers",
		description: "Products flagged as bestsellers."
	},
	{
		key: "featured",
		title: "Featured",
		description: "Products flagged as featured."
	}
];
function FeedbackBanner({ feedback }) {
	if (!feedback) return null;
	const isSuccess = feedback.kind === "success";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
		"aria-live": "polite",
		"data-ocid": isSuccess ? "homepage.success_state" : "homepage.error_state",
		className: cn("flex items-start gap-3 rounded-md border px-4 py-3 text-sm", isSuccess ? "border-success/40 bg-success/10 text-foreground" : "border-destructive/40 bg-destructive/10 text-foreground"),
		children: [isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
			className: "mt-0.5 h-4 w-4 shrink-0 text-success",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
			className: "mt-0.5 h-4 w-4 shrink-0 text-destructive",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "min-w-0",
			children: feedback.message
		})]
	});
}
function ProductFlagRow({ product, index, onToggle, pendingFlag }) {
	const isDraft = product.publishState !== PublishState.published;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": `homepage.product.item.${index}`,
		className: "flex flex-col gap-4 border-b border-border/70 py-5 last:border-b-0 lg:flex-row lg:items-center lg:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 lg:max-w-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-display text-lg text-foreground",
					children: product.name
				}), isDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "label-caps",
					children: product.publishState === PublishState.draft ? "Draft" : "Archived"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: product.sku
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-x-6",
			children: FLAGS.map((flag) => {
				const checked = product[flag.key];
				const isPending = pendingFlag === `${product.id}-${flag.key}`;
				const inputId = `flag-${product.id}-${flag.key}`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: inputId,
						checked,
						disabled: isPending,
						onCheckedChange: (value) => onToggle(product, flag, value),
						"data-ocid": `homepage.toggle.${flag.key}.${index}`,
						"aria-label": `${flag.label} for ${product.name}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: inputId,
						className: "cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: flag.short
					})]
				}, flag.key);
			})
		})]
	});
}
function SectionPreview({ section, products }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-ocid": `homepage.section.${section.key}`,
		className: "rounded-lg border-border/70 shadow-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-display text-xl",
					children: section.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "label-caps",
					children: [
						products.length,
						" ",
						products.length === 1 ? "item" : "items"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: section.description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-ocid": `homepage.section.${section.key}.empty_state`,
			className: "rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground",
			children: "Nothing here yet. Toggle a product flag to populate this section."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: products.map((product, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-ocid": `homepage.section.${section.key}.item.${i}`,
				className: "flex items-center justify-between gap-3 rounded-md bg-muted/40 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-sm text-foreground",
					children: product.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground",
					children: product.sku
				})]
			}, product.id.toString()))
		}) })]
	});
}
function OwnerHomepageCuration() {
	useSeo("Homepage Curation", "Curate the homepage sections and product flags.");
	const filter = (0, import_react.useMemo)(() => ({ pageSize: 100n }), []);
	const productsQuery = usePublishedProducts(filter);
	const sectionsQuery = useHomepageSections();
	const setFlag = useSetProductFlag();
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [pendingFlag, setPendingFlag] = (0, import_react.useState)(null);
	const products = productsQuery.data?.products ?? [];
	function handleToggle(product, flag, value) {
		setFeedback(null);
		setPendingFlag(`${product.id}-${flag.key}`);
		setFlag.mutate({
			id: product.id,
			flag: flag.apiFlag,
			value
		}, {
			onSuccess: (result) => {
				setPendingFlag(null);
				if (result.__kind__ === "ok") setFeedback({
					kind: "success",
					message: `${product.name} — ${flag.label} ${value ? "enabled" : "disabled"}.`
				});
				else setFeedback({
					kind: "error",
					message: result.__kind__ === "unauthorized" ? "You do not have permission to change homepage flags." : `Could not update ${flag.label} for ${product.name}.`
				});
			},
			onError: () => {
				setPendingFlag(null);
				setFeedback({
					kind: "error",
					message: `Could not update ${flag.label} for ${product.name}. Please try again.`
				});
			}
		});
	}
	const sections = sectionsQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "homepage.page",
		className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-accent",
						children: "Owner dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl tracking-tight md:text-5xl",
						children: "Homepage Curation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base text-muted-foreground",
						children: "Control which products appear on the homepage and in each featured section. Changes are saved immediately."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackBanner, { feedback })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, {
							className: "h-5 w-5 text-accent",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight",
							children: "Product flags"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "Toggle a flag to place the product in the matching homepage section. A product must be published and marked “On homepage” to appear."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "mt-6 rounded-lg border-border/70 shadow-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-4 py-2 md:px-6",
							children: productsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-ocid": "homepage.loading_state",
								className: "flex flex-col gap-4 py-6",
								children: Array.from({ length: 4 }, (_, i) => `homepage-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-64" })]
								}, id))
							}) : productsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-ocid": "homepage.error_state",
								className: "flex flex-col items-center gap-3 py-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
										className: "h-8 w-8 text-destructive",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "We could not load the catalogue. Please try again."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										"data-ocid": "homepage.retry_button",
										onClick: () => void productsQuery.refetch(),
										children: "Retry"
									})
								]
							}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-ocid": "homepage.empty_state",
								className: "flex flex-col items-center gap-3 py-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
										className: "h-8 w-8 text-muted-foreground",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg",
										children: "No published products yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-sm text-sm text-muted-foreground",
										children: "Publish products in the catalogue to curate the homepage."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-ocid": "homepage.product.list",
								children: products.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFlagRow, {
									product,
									index,
									onToggle: handleToggle,
									pendingFlag
								}, product.id.toString()))
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Current homepage sections"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "A live preview of what visitors see in each section right now."
					}),
					sectionsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 md:grid-cols-2",
						children: Array.from({ length: 4 }, (_, i) => `section-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 w-full rounded-lg" }, id))
					}) : sectionsQuery.isError || !sections ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "homepage.sections.error_state",
						className: "mt-6 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								className: "h-8 w-8 text-destructive",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "We could not load the homepage sections."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								"data-ocid": "homepage.sections.retry_button",
								onClick: () => void sectionsQuery.refetch(),
								children: "Retry"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 md:grid-cols-2",
						children: SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionPreview, {
							section,
							products: sections[section.key]
						}, section.key))
					})
				]
			})
		]
	});
}
//#endregion
export { OwnerHomepageCuration as default };

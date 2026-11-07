import { B as require_react, F as createLucideIcon, P as PublishState, T as useSetPublishState, _ as useDuplicateProduct, ct as __toESM, h as useDeleteProduct, n as useAllProducts, t as useSeo, y as useIsCallerAdmin, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { a as SelectValue, c as Portal$1, d as useFocusGuards, f as DismissableLayer, i as SelectTrigger, l as useId, n as SelectContent, o as ReactRemoveScroll, r as SelectItem, s as hideOthers, t as Select, u as FocusScope } from "./select-CGv8Q1Kf.js";
import { i as LoaderCircle, n as Trash2, r as Plus, t as Input } from "./input-B48g_3TA.js";
import { n as Badge, r as PackageOpen, t as Skeleton } from "./skeleton-BI1IfxoR.js";
import { t as Pencil } from "./pencil-D0y5kNDq.js";
import { s as Search, t as Link } from "./index-Bipk6PsK.js";
import { c as useComposedRefs, n as buttonVariants, r as cn, t as Button } from "./button-cWuqRO5T.js";
import { a as Primitive, c as createSlottable, d as composeEventHandlers, i as useLayoutEffect2, l as createContext2, n as useControllableState, s as createSlot, u as createContextScope } from "./dist-Cw4vAE1R.js";
import { t as ue } from "./dist-BN4kFDjX.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArchiveRestore = createLucideIcon("archive-restore", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h2",
		key: "tvwodi"
	}],
	["path", {
		d: "M20 8v11a2 2 0 0 1-2 2h-2",
		key: "1gkqxj"
	}],
	["path", {
		d: "m9 15 3-3 3 3",
		key: "1pd0qc"
	}],
	["path", {
		d: "M12 12v9",
		key: "192myk"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Archive = createLucideIcon("archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.1.11_@types+react@19.1.17__@types+re_21e2bb85425f53f6c7108cfe0018fd7c/node_modules/@radix-ui/react-presence/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var Presence = (props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useComposedRefs(presence.ref, getElementRef(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		const currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) send("MOUNT");
			else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = (event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			};
			const handleAnimationStart = (event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			};
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			stylesRef.current = node2 ? getComputedStyle(node2) : null;
			setNode(node2);
		}, [])
	};
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-dialog@1.1.15_@types+react-dom@19.1.11_@types+react@19.1.17__@types+rea_8cda88dee65e27ab93300d895457061b/node_modules/@radix-ui/react-dialog/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
	const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const triggerRef = import_react.useRef(null);
	const contentRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DIALOG_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		scope: __scopeDialog,
		triggerRef,
		contentRef,
		contentId: useId(),
		titleId: useId(),
		descriptionId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children
	});
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME$1 = "DialogTrigger";
var DialogTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...triggerProps } = props;
	const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.contentId,
		"data-state": getState(context.open),
		...triggerProps,
		ref: composedTriggerRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
DialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME$1 = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME$1, { forceMount: void 0 });
var DialogPortal = (props) => {
	const { __scopeDialog, forceMount, children, container } = props;
	const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeDialog,
		forceMount,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
				asChild: true,
				container,
				children: child
			})
		}))
	});
};
DialogPortal.displayName = PORTAL_NAME$1;
var OVERLAY_NAME$1 = "DialogOverlay";
var DialogOverlay = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(OVERLAY_NAME$1, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME$1, props.__scopeDialog);
	return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
			...overlayProps,
			ref: forwardedRef
		})
	}) : null;
});
DialogOverlay.displayName = OVERLAY_NAME$1;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME$1, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
		as: Slot,
		allowPinchZoom: true,
		shards: [context.contentRef],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState(context.open),
			...overlayProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "auto",
				...overlayProps.style
			}
		})
	});
});
var CONTENT_NAME$1 = "DialogContent";
var DialogContent = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
});
DialogContent.displayName = CONTENT_NAME$1;
var DialogContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: true,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			event.preventDefault();
			context.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
		}),
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
	});
});
var DialogContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
});
var DialogContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$1, __scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			role: "dialog",
			id: context.contentId,
			"aria-describedby": context.descriptionId,
			"aria-labelledby": context.titleId,
			"data-state": getState(context.open),
			...contentProps,
			ref: composedRefs,
			onDismiss: () => context.onOpenChange(false)
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleWarning, { titleId: context.titleId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning$1, {
		contentRef,
		descriptionId: context.descriptionId
	})] })] });
});
var TITLE_NAME$1 = "DialogTitle";
var DialogTitle = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...titleProps } = props;
	const context = useDialogContext(TITLE_NAME$1, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h2, {
		id: context.titleId,
		...titleProps,
		ref: forwardedRef
	});
});
DialogTitle.displayName = TITLE_NAME$1;
var DESCRIPTION_NAME$1 = "DialogDescription";
var DialogDescription = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...descriptionProps } = props;
	const context = useDialogContext(DESCRIPTION_NAME$1, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.p, {
		id: context.descriptionId,
		...descriptionProps,
		ref: forwardedRef
	});
});
DialogDescription.displayName = DESCRIPTION_NAME$1;
var CLOSE_NAME = "DialogClose";
var DialogClose = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...closeProps } = props;
	const context = useDialogContext(CLOSE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
	});
});
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
	contentName: CONTENT_NAME$1,
	titleName: TITLE_NAME$1,
	docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
	const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
	const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
	import_react.useEffect(() => {
		if (titleId) {
			if (!document.getElementById(titleId)) console.error(MESSAGE);
		}
	}, [MESSAGE, titleId]);
	return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning$1 = ({ contentRef, descriptionId }) => {
	const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
	import_react.useEffect(() => {
		const describedById = contentRef.current?.getAttribute("aria-describedby");
		if (descriptionId && describedById) {
			if (!document.getElementById(descriptionId)) console.warn(MESSAGE);
		}
	}, [
		MESSAGE,
		contentRef,
		descriptionId
	]);
	return null;
};
var Root = Dialog;
var Trigger = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.15_@types+react-dom@19.1.11_@types+react@19.1.17__@typ_3c56a406df72e8770bda4f7e201f7394/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "alert-dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
			scope: __scopeAlertDialog,
			cancelRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				role: "alertdialog",
				...dialogScope,
				...contentProps,
				ref: composedRefs,
				onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
					event.preventDefault();
					cancelRef.current?.focus({ preventScroll: true });
				}),
				onPointerDownOutside: (event) => event.preventDefault(),
				onInteractOutside: (event) => event.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef })]
			})
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
	const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
	import_react.useEffect(() => {
		if (!document.getElementById(contentRef.current?.getAttribute("aria-describedby"))) console.warn(MESSAGE);
	}, [MESSAGE, contentRef]);
	return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		"data-slot": "alert-dialog-overlay",
		className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "alert-dialog-content",
		className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		"data-slot": "alert-dialog-title",
		className: cn("text-lg font-semibold", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		"data-slot": "alert-dialog-description",
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
//#endregion
//#region src/pages/owner/Products.tsx
var STATE_FILTERS = [
	{
		value: "all",
		label: "All states"
	},
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
var PUBLISH_LABEL = {
	[PublishState.draft]: "Draft",
	[PublishState.published]: "Published",
	[PublishState.archived]: "Archived"
};
var PUBLISH_BADGE_CLASS = {
	[PublishState.draft]: "border-warning/50 bg-warning/10 text-foreground",
	[PublishState.published]: "border-success/50 bg-success/10 text-foreground",
	[PublishState.archived]: "border-border bg-muted text-muted-foreground"
};
function errorMessage(error) {
	switch (error.__kind__) {
		case "ok": return null;
		case "duplicateSku": return `SKU "${error.duplicateSku}" is already in use.`;
		case "invalidInput": return error.invalidInput;
		case "notFound": return "This product could not be found. It may have been removed.";
		case "unauthorized": return "You do not have permission to change products.";
	}
}
function formatPrice(price) {
	if (price === void 0) return "Enquire for price";
	return `₹${price.toLocaleString("en-IN")}`;
}
function PublishActions({ product, position, onSetState, pending }) {
	const state = product.publishState;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-1.5",
		children: [
			state !== PublishState.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: pending,
				onClick: () => onSetState(PublishState.published),
				"data-ocid": `owner.products.publish_button.${position}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
					className: "h-3.5 w-3.5",
					"aria-hidden": "true"
				}), "Publish"]
			}) : null,
			state !== PublishState.draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: pending,
				onClick: () => onSetState(PublishState.draft),
				"data-ocid": `owner.products.draft_button.${position}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					className: "h-3.5 w-3.5",
					"aria-hidden": "true"
				}), "Move to draft"]
			}) : null,
			state !== PublishState.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: pending,
				onClick: () => onSetState(PublishState.archived),
				"data-ocid": `owner.products.archive_button.${position}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {
					className: "h-3.5 w-3.5",
					"aria-hidden": "true"
				}), "Archive"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: pending,
				onClick: () => onSetState(PublishState.draft),
				"data-ocid": `owner.products.restore_button.${position}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, {
					className: "h-3.5 w-3.5",
					"aria-hidden": "true"
				}), "Restore"]
			})
		]
	});
}
function OwnerProducts() {
	useSeo("Products", "Manage every catalogue product, including drafts.");
	const adminQuery = useIsCallerAdmin();
	const isAdmin = adminQuery.data === true;
	const [search, setSearch] = (0, import_react.useState)("");
	const [stateFilter, setStateFilter] = (0, import_react.useState)("all");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const filter = (0, import_react.useMemo)(() => {
		const next = {};
		const trimmed = search.trim();
		if (trimmed) next.search = trimmed;
		if (stateFilter !== "all") next.publishState = stateFilter;
		return next;
	}, [search, stateFilter]);
	const productsQuery = useAllProducts(filter);
	const deleteProduct = useDeleteProduct();
	const duplicateProduct = useDuplicateProduct();
	const setPublishState = useSetPublishState();
	const products = productsQuery.data?.products ?? [];
	const isFiltered = search.trim().length > 0 || stateFilter !== "all";
	function handleDelete() {
		if (!pendingDelete) return;
		const target = pendingDelete;
		deleteProduct.mutate(target.id, {
			onSuccess: (result) => {
				const message = errorMessage(result);
				if (message) {
					ue.error(message);
					return;
				}
				ue.success(`Deleted “${target.name}”.`);
				setPendingDelete(null);
			},
			onError: () => {
				ue.error("Could not delete the product. Please try again.");
			}
		});
	}
	function handleDuplicate(product) {
		duplicateProduct.mutate(product.id, {
			onSuccess: (result) => {
				const message = errorMessage(result);
				if (message) {
					ue.error(message);
					return;
				}
				ue.success(`Duplicated “${product.name}”.`);
			},
			onError: () => {
				ue.error("Could not duplicate the product. Please try again.");
			}
		});
	}
	function handleSetState(product, state) {
		setPublishState.mutate({
			id: product.id,
			state
		}, {
			onSuccess: (result) => {
				const message = errorMessage(result);
				if (message) {
					ue.error(message);
					return;
				}
				ue.success(`“${product.name}” is now ${PUBLISH_LABEL[state].toLowerCase()}.`);
			},
			onError: () => {
				ue.error("Could not update the publish state. Please try again.");
			}
		});
	}
	if (adminQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "owner.products.loading_state",
		className: "mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-24 text-muted-foreground md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-5 w-5 animate-spin",
			"aria-hidden": "true"
		}), "Checking owner access…"]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "owner.products.denied_state",
		className: "mx-auto w-full max-w-3xl px-4 py-24 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-destructive/40 bg-destructive/5 px-6 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					className: "h-6 w-6 text-destructive",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-3xl tracking-tight",
					children: "Owner access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: "The product list is reserved for the signed-in owner. Sign in with the approved Internet Identity to manage the catalogue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/owner/sign-in",
						"data-ocid": "owner.products.signin_link",
						children: "Go to owner sign in"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "owner.products.page",
		className: "mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 border-b border-accent/30 pb-8 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-accent",
							children: "Private Ledger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl tracking-tight md:text-5xl",
							children: "Products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-sm text-muted-foreground",
							children: "Every catalogue entry, including drafts and archived products."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					"data-ocid": "owner.products.add_button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/owner/products/$productId",
						params: { productId: "new" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), "Add product"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full md:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "Search by name or SKU",
						"aria-label": "Search products by name or SKU",
						"data-ocid": "owner.products.search_input",
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "publish-filter",
						className: "label-caps text-muted-foreground",
						children: "State"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: stateFilter,
						onValueChange: (value) => setStateFilter(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "publish-filter",
							"data-ocid": "owner.products.state_filter",
							className: "w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATE_FILTERS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option.value,
							children: option.label
						}, option.value)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: productsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ocid": "owner.products.loading_state",
					className: "flex flex-col gap-3",
					children: Array.from({ length: 5 }, (_, i) => `product-skeleton-${i}`).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full rounded-md" }, id))
				}) : productsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "owner.products.error_state",
					role: "alert",
					className: "border border-destructive/40 bg-destructive/5 px-6 py-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Could not load products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Something went wrong while fetching the catalogue. Please try again."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-5",
							onClick: () => void productsQuery.refetch(),
							"data-ocid": "owner.products.retry_button",
							children: "Retry"
						})
					]
				}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "owner.products.empty_state",
					className: "border border-dashed border-border bg-muted/30 px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
							className: "mx-auto h-8 w-8 text-muted-foreground",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl",
							children: isFiltered ? "No matching products" : "No products yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
							children: isFiltered ? "No products match your search or filter. Try a different term or state." : "Your catalogue is empty. Add your first product to get started."
						}),
						isFiltered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-6",
							onClick: () => {
								setSearch("");
								setStateFilter("all");
							},
							"data-ocid": "owner.products.clear_filters_button",
							children: "Clear filters"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/owner/products/$productId",
								params: { productId: "new" },
								"data-ocid": "owner.products.empty_add_button",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), "Add product"]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-ocid": "owner.products.list",
					className: "flex flex-col gap-3",
					children: products.map((product, index) => {
						const rowPending = duplicateProduct.isPending && duplicateProduct.variables === product.id || deleteProduct.isPending && deleteProduct.variables === product.id || setPublishState.isPending && setPublishState.variables?.id === product.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-ocid": `owner.products.item.${index + 1}`,
							className: "flex flex-col gap-4 border border-border bg-card p-4 shadow-subtle md:flex-row md:items-center md:justify-between md:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "min-w-0 truncate font-display text-lg",
										children: product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: PUBLISH_BADGE_CLASS[product.publishState],
										"data-ocid": `owner.products.state_badge.${index + 1}`,
										children: PUBLISH_LABEL[product.publishState]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs",
										children: ["SKU ", product.sku]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: formatPrice(product.price)
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 md:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											size: "sm",
											"data-ocid": `owner.products.edit_button.${index + 1}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/owner/products/$productId",
												params: { productId: product.id.toString() },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
													className: "h-3.5 w-3.5",
													"aria-hidden": "true"
												}), "Rename / Edit"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											disabled: rowPending,
											onClick: () => handleDuplicate(product),
											"data-ocid": `owner.products.duplicate_button.${index + 1}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
												className: "h-3.5 w-3.5",
												"aria-hidden": "true"
											}), "Duplicate"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											disabled: rowPending,
											onClick: () => setPendingDelete(product),
											"data-ocid": `owner.products.delete_button.${index + 1}`,
											className: "text-destructive hover:text-destructive",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "h-3.5 w-3.5",
												"aria-hidden": "true"
											}), "Delete"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishActions, {
									product,
									position: index + 1,
									pending: rowPending,
									onSetState: (state) => handleSetState(product, state)
								})]
							})]
						}, product.id.toString());
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: pendingDelete !== null,
				onOpenChange: (open) => {
					if (!open) setPendingDelete(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-ocid": "owner.products.delete_dialog",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this product?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingDelete ? `“${pendingDelete.name}” (SKU ${pendingDelete.sku}) will be permanently removed from the catalogue. This cannot be undone.` : "" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						"data-ocid": "owner.products.delete_cancel_button",
						disabled: deleteProduct.isPending,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogAction, {
						"data-ocid": "owner.products.delete_confirm_button",
						disabled: deleteProduct.isPending,
						onClick: (event) => {
							event.preventDefault();
							handleDelete();
						},
						className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
						children: [deleteProduct.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "h-4 w-4 animate-spin",
							"aria-hidden": "true"
						}) : null, "Delete product"]
					})] })]
				})
			})
		]
	});
}
//#endregion
export { OwnerProducts as default };

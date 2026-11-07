import { B as require_react, ct as __toESM, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as require_react_dom } from "./react-dom-CQTnd9pZ.js";
import { o as createSlot, r as cn } from "./button-cWuqRO5T.js";
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.1.11_@types+react@19.1.17__@types+r_de8c80ca3f5e88f6f5c9b47d921af618/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_react_dom();
var import_jsx_runtime = require_jsx_runtime();
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = createSlot(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-label@2.1.8_@types+react-dom@19.1.11_@types+react@19.1.17__@types+react_e586ba67b9b1a3f07b8b4aab729b3189/node_modules/@radix-ui/react-label/dist/index.mjs
var NAME = "Label";
var Label$1 = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.label, {
		...props,
		ref: forwardedRef,
		onMouseDown: (event) => {
			if (event.target.closest("button, input, select, textarea")) return;
			props.onMouseDown?.(event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		}
	});
});
Label$1.displayName = NAME;
var Root = Label$1;
//#endregion
//#region src/components/ui/label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Primitive as n, Label as t };

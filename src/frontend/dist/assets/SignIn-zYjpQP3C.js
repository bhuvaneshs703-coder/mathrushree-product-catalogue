import { B as require_react, F as createLucideIcon, L as useInternetIdentity, ct as __toESM, t as useSeo, y as useIsCallerAdmin, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { n as useNavigate, t as Link } from "./index-Bipk6PsK.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region src/pages/owner/SignIn.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Owner sign-in. Internet Identity only — no password field, no hardcoded
* credential and no public registration control. A signed-in visitor who is
* not the approved owner sees an access-not-granted notice and no dashboard.
*/
function OwnerSignIn() {
	useSeo("Owner Sign In", "Secure sign-in for the business owner to manage the catalogue.");
	const navigate = useNavigate();
	const { isAuthenticated, isInitializing, isLoggingIn, isLoginError, login } = useInternetIdentity();
	const adminQuery = useIsCallerAdmin();
	const isAdmin = adminQuery.data === true;
	const checkingAccess = isAuthenticated && adminQuery.isLoading;
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && isAdmin) navigate({ to: "/owner/products" });
	}, [
		isAuthenticated,
		isAdmin,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "owner.signin.page",
		className: "paper-texture relative flex min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-16 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-accent/40 bg-card shadow-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-accent/30 bg-primary px-6 py-5 text-primary-foreground md:px-10 md:py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-accent",
						children: "Private Ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl tracking-tight md:text-4xl",
						children: "Owner Sign In"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 py-8 md:px-10 md:py-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "This dashboard is reserved for the business owner. Sign in with Internet Identity to manage the catalogue. There is no password to remember and no public registration — access is granted only to the approved owner."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: isInitializing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
								"data-ocid": "owner.signin.loading_state",
								className: "block text-sm text-muted-foreground",
								children: "Loading your session…"
							}) : !isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-ocid": "owner.signin.submit_button",
									disabled: isLoggingIn,
									onClick: () => login(),
									className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									}), isLoggingIn ? "Signing in…" : "Sign in with Internet Identity"]
								}), isLoginError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									"data-ocid": "owner.signin.error_state",
									className: "text-sm text-destructive",
									children: "Sign-in did not complete. Please try again."
								})]
							}) : checkingAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
								"data-ocid": "owner.signin.checking_state",
								className: "block text-sm text-muted-foreground",
								children: "Verifying owner access…"
							}) : isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
								"data-ocid": "owner.signin.success_state",
								className: "flex items-center gap-2 text-sm text-success",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), "Access granted. Taking you to the product list…"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-ocid": "owner.signin.denied_state",
								role: "alert",
								className: "border border-destructive/40 bg-destructive/5 px-5 py-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg text-foreground",
										children: "Access not granted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: "You are signed in, but this account is not the approved owner of this catalogue. No dashboard content is available for this identity."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground",
										children: "If you believe this is a mistake, please contact the business owner directly."
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 border-t border-accent/25 pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								"data-ocid": "owner.signin.back_link",
								className: "text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-smooth hover:text-accent",
								children: "← Return to the catalogue"
							})
						})
					]
				})]
			})
		})
	});
}
//#endregion
export { OwnerSignIn as default };

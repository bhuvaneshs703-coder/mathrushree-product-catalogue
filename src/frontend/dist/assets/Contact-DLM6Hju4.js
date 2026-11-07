import { B as require_react, E as useSubmitEnquiry, ct as __toESM, t as useSeo, z as require_jsx_runtime } from "./seo-DrMj1QHg.js";
import { t as CircleCheck } from "./circle-check-Hhwq11bV.js";
import { t as Mail } from "./mail-BidDLVoV.js";
import { a as EnquiryButtons, c as Phone, d as formatPhoneNumber, l as MessageCircle, u as BUSINESS_NAME } from "./index-Bipk6PsK.js";
//#region src/pages/Contact.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CONTACT_METHODS = [{
	icon: MessageCircle,
	label: "WhatsApp",
	value: formatPhoneNumber(),
	hint: "Fastest response — message us directly."
}, {
	icon: Phone,
	label: "Phone",
	value: formatPhoneNumber(),
	hint: "Speak with our team during business hours."
}];
function Contact() {
	useSeo("Contact", `Enquire about the ${BUSINESS_NAME} catalogue by phone, WhatsApp or the general enquiry form.`);
	const submitEnquiry = useSubmitEnquiry();
	const [name, setName] = (0, import_react.useState)("");
	const [contact, setContact] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	function validate() {
		const next = {};
		if (!name.trim()) next.name = "Please enter your name.";
		if (!contact.trim()) next.contact = "Please add a phone number or email so we can reply.";
		if (!message.trim()) next.message = "Please tell us what you would like to enquire about.";
		return next;
	}
	function handleSubmit(event) {
		event.preventDefault();
		setSubmitted(false);
		const nextErrors = validate();
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		const draft = {
			name: name.trim(),
			contact: contact.trim(),
			message: message.trim()
		};
		submitEnquiry.mutate(draft, { onSuccess: (result) => {
			if (result.__kind__ === "ok") {
				setName("");
				setContact("");
				setMessage("");
				setErrors({});
				setSubmitted(true);
			}
		} });
	}
	const serverError = submitEnquiry.isError || submitEnquiry.data && submitEnquiry.data.__kind__ === "err" ? submitEnquiry.data && submitEnquiry.data.__kind__ === "err" ? submitEnquiry.data.err : "We could not send your enquiry just now. Please try again." : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "contact.page",
		className: "paper-texture",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-accent/25 bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-accent",
						children: "Get in touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-5xl",
						children: [
							"Enquire about the ",
							BUSINESS_NAME,
							" catalogue"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg",
						children: "Reach us directly by phone or WhatsApp, or send a general enquiry and our team will respond with the details you need."
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "contact.direct_section",
				"aria-labelledby": "contact-direct-heading",
				className: "flex flex-col gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "contact-direct-heading",
						className: "font-display text-2xl tracking-tight md:text-3xl",
						children: "Speak with us directly"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-muted-foreground",
						children: "The quickest way to reach the team is by phone or WhatsApp. Both connect to the same number."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-4",
						children: CONTACT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(method.icon, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-caps text-muted-foreground",
										children: method.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-lg text-foreground",
										children: method.value
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: method.hint
									})
								]
							})]
						}, method.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-accent/40 bg-secondary/60 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-caps text-muted-foreground",
								children: "Start an enquiry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-foreground",
								children: "Message us on WhatsApp or call the number above — we will help with availability, pricing and product details."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryButtons, {})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-ocid": "contact.form_section",
				"aria-labelledby": "contact-form-heading",
				className: "rounded-lg border border-border bg-card p-6 shadow-none md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "contact-form-heading",
						className: "font-display text-2xl tracking-tight md:text-3xl",
						children: "Send a general enquiry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Share a few details and we will get back to you. Fields marked with an asterisk are required."
					}),
					submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
						"data-ocid": "contact.success_state",
						className: "mt-6 flex items-start gap-3 rounded-md border border-success/40 bg-success/10 p-4 text-sm text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							className: "mt-0.5 h-5 w-5 shrink-0 text-success",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Thank you — your enquiry has been received. We will be in touch shortly." })]
					}),
					serverError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-ocid": "contact.error_state",
						role: "alert",
						className: "mt-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground",
						children: serverError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						noValidate: true,
						className: "mt-6 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "contact-name",
										className: "text-sm font-medium text-foreground",
										children: ["Your name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "contact-name",
										name: "name",
										type: "text",
										autoComplete: "name",
										value: name,
										onChange: (event) => setName(event.target.value),
										"aria-required": "true",
										"aria-invalid": errors.name ? true : void 0,
										"aria-describedby": errors.name ? "contact-name-error" : void 0,
										"data-ocid": "contact.name_input",
										className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
										placeholder: "e.g. Ananya Rao"
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										id: "contact-name-error",
										"data-ocid": "contact.name_error",
										className: "text-sm text-destructive",
										children: errors.name
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "contact-detail",
										className: "text-sm font-medium text-foreground",
										children: ["Phone or email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "contact-detail",
										name: "contact",
										type: "text",
										autoComplete: "email",
										value: contact,
										onChange: (event) => setContact(event.target.value),
										"aria-required": "true",
										"aria-invalid": errors.contact ? true : void 0,
										"aria-describedby": errors.contact ? "contact-detail-error" : void 0,
										"data-ocid": "contact.contact_input",
										className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
										placeholder: "Phone number or email address"
									}),
									errors.contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										id: "contact-detail-error",
										"data-ocid": "contact.contact_error",
										className: "text-sm text-destructive",
										children: errors.contact
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "contact-message",
										className: "text-sm font-medium text-foreground",
										children: ["Message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "contact-message",
										name: "message",
										rows: 5,
										value: message,
										onChange: (event) => setMessage(event.target.value),
										"aria-required": "true",
										"aria-invalid": errors.message ? true : void 0,
										"aria-describedby": errors.message ? "contact-message-error" : void 0,
										"data-ocid": "contact.message_textarea",
										className: "w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
										placeholder: "Tell us what you would like to enquire about."
									}),
									errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										id: "contact-message-error",
										"data-ocid": "contact.message_error",
										className: "text-sm text-destructive",
										children: errors.message
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitEnquiry.isPending,
								"data-ocid": "contact.submit_button",
								className: "inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), submitEnquiry.isPending ? "Sending…" : "Send enquiry"]
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Contact as default };

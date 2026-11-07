import { EnquiryButtons } from "@/components/EnquiryButtons";
import { useSubmitEnquiry } from "@/hooks/useCatalogue";
import { BUSINESS_NAME, formatPhoneNumber } from "@/lib/enquiry";
import { useSeo } from "@/lib/seo";
import { CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

type FieldErrors = {
  name?: string;
  contact?: string;
  message?: string;
};

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: formatPhoneNumber(),
    hint: "Fastest response — message us directly.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: formatPhoneNumber(),
    hint: "Speak with our team during business hours.",
  },
] as const;

export default function Contact() {
  useSeo(
    "Contact",
    `Enquire about the ${BUSINESS_NAME} catalogue by phone, WhatsApp or the general enquiry form.`,
  );

  const submitEnquiry = useSubmitEnquiry();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = "Please enter your name.";
    }
    if (!contact.trim()) {
      next.contact = "Please add a phone number or email so we can reply.";
    }
    if (!message.trim()) {
      next.message = "Please tell us what you would like to enquire about.";
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const draft = {
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    };

    submitEnquiry.mutate(draft, {
      onSuccess: (result) => {
        if (result.__kind__ === "ok") {
          setName("");
          setContact("");
          setMessage("");
          setErrors({});
          setSubmitted(true);
        }
      },
    });
  }

  const serverError =
    submitEnquiry.isError ||
    (submitEnquiry.data && submitEnquiry.data.__kind__ === "err")
      ? submitEnquiry.data && submitEnquiry.data.__kind__ === "err"
        ? submitEnquiry.data.err
        : "We could not send your enquiry just now. Please try again."
      : null;

  return (
    <div data-ocid="contact.page" className="paper-texture">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="border-b border-accent/25 bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <p className="label-caps text-accent">Get in touch</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Enquire about the {BUSINESS_NAME} catalogue
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
            Reach us directly by phone or WhatsApp, or send a general enquiry
            and our team will respond with the details you need.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ── Direct contact column ─────────────────────────── */}
        <section
          data-ocid="contact.direct_section"
          aria-labelledby="contact-direct-heading"
          className="flex flex-col gap-8"
        >
          <div>
            <h2
              id="contact-direct-heading"
              className="font-display text-2xl tracking-tight md:text-3xl"
            >
              Speak with us directly
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              The quickest way to reach the team is by phone or WhatsApp. Both
              connect to the same number.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {CONTACT_METHODS.map((method) => (
              <li
                key={method.label}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-none"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent">
                  <method.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="label-caps text-muted-foreground">
                    {method.label}
                  </p>
                  <p className="mt-1 font-mono text-lg text-foreground">
                    {method.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {method.hint}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-accent/40 bg-secondary/60 p-6">
            <p className="label-caps text-muted-foreground">Start an enquiry</p>
            <p className="mt-2 text-sm text-foreground">
              Message us on WhatsApp or call the number above — we will help
              with availability, pricing and product details.
            </p>
            <div className="mt-5">
              <EnquiryButtons />
            </div>
          </div>
        </section>

        {/* ── Enquiry form column ───────────────────────────── */}
        <section
          data-ocid="contact.form_section"
          aria-labelledby="contact-form-heading"
          className="rounded-lg border border-border bg-card p-6 shadow-none md:p-8"
        >
          <h2
            id="contact-form-heading"
            className="font-display text-2xl tracking-tight md:text-3xl"
          >
            Send a general enquiry
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Share a few details and we will get back to you. Fields marked with
            an asterisk are required.
          </p>

          {submitted && (
            <output
              data-ocid="contact.success_state"
              className="mt-6 flex items-start gap-3 rounded-md border border-success/40 bg-success/10 p-4 text-sm text-foreground"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-success"
                aria-hidden="true"
              />
              <p>
                Thank you — your enquiry has been received. We will be in touch
                shortly.
              </p>
            </output>
          )}

          {serverError && (
            <div
              data-ocid="contact.error_state"
              role="alert"
              className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground"
            >
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-foreground"
              >
                Your name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-required="true"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                data-ocid="contact.name_input"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                placeholder="e.g. Ananya Rao"
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  data-ocid="contact.name_error"
                  className="text-sm text-destructive"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-detail"
                className="text-sm font-medium text-foreground"
              >
                Phone or email <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-detail"
                name="contact"
                type="text"
                autoComplete="email"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                aria-required="true"
                aria-invalid={errors.contact ? true : undefined}
                aria-describedby={
                  errors.contact ? "contact-detail-error" : undefined
                }
                data-ocid="contact.contact_input"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                placeholder="Phone number or email address"
              />
              {errors.contact && (
                <p
                  id="contact-detail-error"
                  data-ocid="contact.contact_error"
                  className="text-sm text-destructive"
                >
                  {errors.contact}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-foreground"
              >
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-required="true"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                data-ocid="contact.message_textarea"
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                placeholder="Tell us what you would like to enquire about."
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  data-ocid="contact.message_error"
                  className="text-sm text-destructive"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitEnquiry.isPending}
              data-ocid="contact.submit_button"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {submitEnquiry.isPending ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

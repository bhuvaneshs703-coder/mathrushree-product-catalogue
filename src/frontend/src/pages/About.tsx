import { EnquiryButtons } from "@/components/EnquiryButtons";
import { useCategories } from "@/hooks/useCatalogue";
import { BUSINESS_NAME, formatPhoneNumber } from "@/lib/enquiry";
import { useSeo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import { BookOpen, Layers, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Layers,
    title: "A considered range",
    body: "Stationery and lifestyle goods gathered into clear categories, so the right piece is easy to find.",
  },
  {
    icon: BookOpen,
    title: "Presented like a ledger",
    body: "Every entry is listed with the same care a heritage ledger gives its pages — ordered, legible and unhurried.",
  },
  {
    icon: Sparkles,
    title: "Enquire, don't guess",
    body: "Prices are shown only when provided. For anything else, a quick call or message gets you a straight answer.",
  },
] as const;

export default function About() {
  useSeo(
    "About",
    `About ${BUSINESS_NAME} — a curated catalogue of stationery and lifestyle products, with phone and WhatsApp enquiries.`,
  );

  const { data: categories, isLoading } = useCategories();

  return (
    <div data-ocid="about.page" className="bg-background">
      {/* ── Masthead ─────────────────────────────────────────── */}
      <section className="border-b border-accent/25 bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="label-caps text-accent">About the house</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
            {BUSINESS_NAME}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            A curated catalogue of stationery and lifestyle products. We gather
            the range into clear categories and present each entry plainly, so
            you can browse at your own pace and enquire directly when something
            catches your eye.
          </p>
          <div className="mt-8">
            <EnquiryButtons variant="outline" />
          </div>
        </div>
      </section>

      {/* ── What we supply ───────────────────────────────────── */}
      <section className="paper-texture border-b border-accent/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="label-caps text-accent">What we supply</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              The range, by category
            </h2>
            <p className="mt-4 text-muted-foreground">
              These are the categories our catalogue currently holds. Each one
              opens into the products we carry.
            </p>
          </div>

          {isLoading ? (
            <div
              data-ocid="about.categories.loading_state"
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 6 }, (_, i) => `about-skeleton-${i}`).map(
                (id) => (
                  <div
                    key={id}
                    className="h-32 animate-pulse rounded-lg border border-border bg-muted"
                  />
                ),
              )}
            </div>
          ) : categories && categories.length > 0 ? (
            <ul
              data-ocid="about.categories.list"
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories.map((category, index) => (
                <li key={category.id.toString()}>
                  <Link
                    to="/categories"
                    data-ocid={`about.category.item.${index + 1}`}
                    className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-smooth hover:border-accent/60 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div>
                      <h3 className="font-display text-xl tracking-tight text-foreground">
                        {category.name}
                      </h3>
                      {category.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-smooth group-hover:text-primary">
                      View category
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div
              data-ocid="about.categories.empty_state"
              className="mt-10 rounded-lg border border-dashed border-border bg-card p-10 text-center"
            >
              <p className="font-display text-xl text-foreground">
                The catalogue is being prepared
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Categories will appear here as the range is listed. In the
                meantime, call or message us and we will help you directly.
              </p>
              <div className="mt-6 flex justify-center">
                <EnquiryButtons size="sm" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── How we work ──────────────────────────────────────── */}
      <section className="border-b border-accent/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="label-caps text-accent">How we work</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              Plainly presented, directly answered
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary text-accent">
                  <pillar.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry band ─────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="label-caps text-accent">Enquiries</p>
            <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
              Talk to us about the range
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Call or message us at{" "}
              <span className="font-mono text-primary-foreground">
                {formatPhoneNumber()}
              </span>
            </p>
          </div>
          <EnquiryButtons variant="outline" />
        </div>
      </section>
    </div>
  );
}

import type { Category, Collection, Product } from "@/backend";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { ProductCard } from "@/components/ProductCard";
import { useCategories, useHomepageSections } from "@/hooks/useCatalogue";
import { BUSINESS_NAME, formatPhoneNumber } from "@/lib/enquiry";
import { useSeo } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Gift,
  Mail,
  PenTool,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";

/* ── Section scaffolding ────────────────────────────────────── */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block pb-3">
      <span className="label-caps text-accent">{children}</span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-16 origin-left animate-gold-sweep bg-accent"
      />
    </span>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProductGrid({
  products,
  ocidPrefix,
}: {
  products: Product[];
  ocidPrefix: string;
}) {
  return (
    <div
      data-ocid={`${ocidPrefix}.list`}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id.toString()}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}

function SectionEmptyState({
  ocid,
  message,
}: {
  ocid: string;
  message: string;
}) {
  return (
    <div
      data-ocid={ocid}
      className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-accent/40 bg-muted/40 px-6 py-14 text-center"
    >
      <Sparkles className="h-6 w-6 text-accent" aria-hidden="true" />
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <Link
        to="/shop"
        search={{}}
        data-ocid={`${ocid}.link`}
        className="text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:text-primary"
      >
        Browse the catalogue
      </Link>
    </div>
  );
}

function ProductSection({
  ocid,
  label,
  title,
  description,
  products,
  emptyMessage,
  icon,
}: {
  ocid: string;
  label: string;
  title: string;
  description?: string;
  products: Product[];
  emptyMessage: string;
  icon: ReactNode;
}) {
  return (
    <section
      data-ocid={`${ocid}.section`}
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 hidden text-accent sm:block" aria-hidden="true">
            {icon}
          </span>
          <SectionHeading
            label={label}
            title={title}
            description={description}
          />
        </div>
        <Link
          to="/shop"
          search={{}}
          data-ocid={`${ocid}.view_all_link`}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary transition-smooth hover:text-accent"
        >
          View all
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} ocidPrefix={ocid} />
      ) : (
        <SectionEmptyState
          ocid={`${ocid}.empty_state`}
          message={emptyMessage}
        />
      )}
    </section>
  );
}

/* ── Category grid ──────────────────────────────────────────── */

const CATEGORY_ICONS = [BookOpen, PenTool, Gift, Sparkles, Star, TrendingUp];

function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section
      data-ocid="home.categories.section"
      className="border-y border-accent/20 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Browse"
            title="Shop by category"
            description="Explore the catalogue by the collections our house is known for."
          />
          <Link
            to="/categories"
            data-ocid="home.categories.view_all_link"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary transition-smooth hover:text-accent"
          >
            All categories
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {categories.length > 0 ? (
          <div
            data-ocid="home.categories.list"
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {categories.map((category, index) => {
              const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
              return (
                <Link
                  key={category.id.toString()}
                  to="/shop"
                  search={{ search: category.name }}
                  data-ocid={`home.category.card.${index + 1}`}
                  className="group flex flex-col items-center gap-4 rounded-md border border-accent/40 bg-card px-4 py-8 text-center shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg leading-snug text-foreground">
                    {category.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {category.subcategories.length > 0
                      ? `${category.subcategories.length} subcategories`
                      : "Explore"}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <SectionEmptyState
            ocid="home.categories.empty_state"
            message="Our category shelves are being catalogued. Please check back shortly."
          />
        )}
      </div>
    </section>
  );
}

/* ── Featured collections ───────────────────────────────────── */

function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  return (
    <Link
      to="/shop"
      search={{}}
      data-ocid={`home.collection.card.${index + 1}`}
      className="group flex flex-col justify-between gap-6 rounded-md border border-accent/40 bg-primary p-6 text-primary-foreground shadow-subtle transition-smooth hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:p-8"
    >
      <div className="flex flex-col gap-3">
        <span className="label-caps text-accent">Collection</span>
        <h3 className="font-display text-2xl leading-snug text-primary-foreground">
          {collection.name}
        </h3>
        {collection.description ? (
          <p className="text-sm text-primary-foreground/70 line-clamp-3">
            {collection.description}
          </p>
        ) : null}
      </div>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
        {collection.productIds.length > 0
          ? `${collection.productIds.length} pieces`
          : "Discover"}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section
      data-ocid="home.collections.section"
      className="border-y border-accent/20 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10">
          <SectionHeading
            label="Curated"
            title="Featured collections"
            description="Hand-assembled groupings from the house, arranged for the season."
          />
        </div>

        {collections.length > 0 ? (
          <div
            data-ocid="home.collections.list"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id.toString()}
                collection={collection}
                index={index}
              />
            ))}
          </div>
        ) : (
          <SectionEmptyState
            ocid="home.collections.empty_state"
            message="Featured collections are being prepared. In the meantime, browse the full catalogue."
          />
        )}
      </div>
    </section>
  );
}

/* ── Contact block ──────────────────────────────────────────── */

function ContactBlock() {
  return (
    <section
      data-ocid="home.contact.section"
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <div className="grid gap-10 rounded-md border border-accent/40 bg-card p-8 shadow-subtle md:grid-cols-2 md:p-12">
        <div className="flex flex-col gap-4">
          <SectionLabel>Enquiries</SectionLabel>
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
            Speak with {BUSINESS_NAME}
          </h2>
          <p className="max-w-md text-base text-muted-foreground">
            Prices are shared on enquiry. Message us on WhatsApp or call the
            house directly and we will help you find the right piece.
          </p>
          <EnquiryButtons className="mt-2" />
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-accent/20 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="label-caps text-muted-foreground">Phone</span>
              <a
                href={`tel:+91${formatPhoneNumber().replace(/\D/g, "").slice(-10)}`}
                data-ocid="home.contact.phone_link"
                className="font-mono text-base text-foreground transition-smooth hover:text-accent"
              >
                {formatPhoneNumber()}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="label-caps text-muted-foreground">
                Enquiry desk
              </span>
              <Link
                to="/contact"
                data-ocid="home.contact.enquiry_link"
                className="text-base text-foreground transition-smooth hover:text-accent"
              >
                Send a written enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function Home() {
  useSeo(
    "Fine Stationery & Lifestyle",
    "A curated catalogue of fine stationery and lifestyle goods from Mathrushree Enterprises — enquire by phone or WhatsApp.",
  );

  const categoriesQuery = useCategories();
  const sectionsQuery = useHomepageSections();

  const categories = categoriesQuery.data ?? [];
  const sections = sectionsQuery.data;

  return (
    <div data-ocid="home.page" className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-accent/20 bg-background paper-texture">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="flex animate-fade-up flex-col gap-6">
            <SectionLabel>Est. catalogue house</SectionLabel>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Fine stationery &amp; lifestyle, catalogued with care.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              {BUSINESS_NAME} presents a premium editorial catalogue of
              notebooks, writing instruments and desk objects — each entry
              finished in ink on paper, with prices shared on enquiry.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                search={{}}
                data-ocid="home.hero.shop_button"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Browse the catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <EnquiryButtons variant="outline" />
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="overflow-hidden rounded-md border border-accent/40 shadow-elevated">
              <img
                src="/assets/generated/hero-stationery.dim_1600x1200.jpg"
                alt="Overhead flat-lay of navy and ivory journals, a black and gold fountain pen and a brass wax seal stamp on natural linen."
                className="h-full w-full object-cover"
                width={1600}
                height={1200}
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 hidden h-24 w-24 border-b border-l border-accent/60 md:block"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryGrid categories={categories} />

      {/* Trending */}
      <ProductSection
        ocid="home.trending"
        label="In demand"
        title="Trending now"
        description="The pieces our clients are asking about this week."
        products={sections?.trending ?? []}
        emptyMessage="Nothing is trending just yet. New pieces are added regularly — check back soon."
        icon={<TrendingUp className="h-6 w-6" />}
      />

      {/* New arrivals */}
      <div className="border-y border-accent/20 bg-muted/40">
        <ProductSection
          ocid="home.new_arrivals"
          label="Just in"
          title="New arrivals"
          description="Freshly catalogued additions to the house shelves."
          products={sections?.newArrivals ?? []}
          emptyMessage="No new arrivals have been catalogued yet. Please check back shortly."
          icon={<Sparkles className="h-6 w-6" />}
        />
      </div>

      {/* Bestsellers */}
      <ProductSection
        ocid="home.bestsellers"
        label="House favourites"
        title="Bestsellers"
        description="The entries our clients return to again and again."
        products={sections?.bestsellers ?? []}
        emptyMessage="Bestsellers will appear here once the catalogue is populated."
        icon={<Star className="h-6 w-6" />}
      />

      {/* Featured collections */}
      <FeaturedCollections collections={sections?.featuredCollections ?? []} />

      {/* Contact */}
      <ContactBlock />
    </div>
  );
}

import { EnquiryButtons } from "@/components/EnquiryButtons";
import { useIsCallerAdmin } from "@/hooks/useCatalogue";
import { BUSINESS_NAME, formatPhoneNumber } from "@/lib/enquiry";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      data-ocid="nav.brand_link"
      className={`font-display text-xl font-semibold tracking-[0.18em] uppercase ${className ?? ""}`}
    >
      {BUSINESS_NAME}
    </Link>
  );
}

function SearchForm({
  onSubmitted,
  className,
}: {
  onSubmitted?: () => void;
  className?: string;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    void navigate({
      to: "/shop",
      search: trimmed ? { search: trimmed } : {},
    });
    onSubmitted?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the catalogue"
          data-ocid="nav.search_input"
          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>
      <button
        type="submit"
        data-ocid="nav.search_button"
        className="rounded-md border border-accent/60 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Search
      </button>
    </form>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const adminQuery = useIsCallerAdmin();
  const adminTarget =
    adminQuery.data === true ? "/owner/products" : "/owner/sign-in";

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-accent/30 bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Wordmark className="text-primary-foreground" />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.link.${link.label.toLowerCase()}`}
                activeOptions={{ exact: link.to === "/" }}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80 transition-smooth hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <SearchForm className="w-56" />
            <Link
              to={adminTarget}
              data-ocid="nav.admin_link"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80 transition-smooth hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Admin
            </Link>
            <Link
              to="/contact"
              data-ocid="nav.enquire_button"
              className="rounded-md border border-accent/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Enquire
            </Link>
          </div>

          <button
            type="button"
            data-ocid="nav.mobile_menu_button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-md p-2 text-primary-foreground transition-smooth hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            data-ocid="nav.mobile_menu"
            className="border-t border-accent/20 bg-primary px-4 pb-6 pt-4 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.mobile_link.${link.label.toLowerCase()}`}
                  activeOptions={{ exact: link.to === "/" }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/85 transition-smooth hover:bg-primary-foreground/10 hover:text-accent"
                  activeProps={{ className: "text-accent" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Link
                to={adminTarget}
                data-ocid="nav.mobile_admin_link"
                onClick={() => setMenuOpen(false)}
                className="block rounded-md border border-accent/40 px-3 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-accent transition-smooth hover:bg-accent hover:text-accent-foreground"
              >
                Admin
              </Link>
            </div>
            <div className="mt-4">
              <SearchForm onSubmitted={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-accent/30 bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
          <div className="flex flex-col gap-3">
            <Wordmark className="text-accent" />
            <p className="max-w-xs text-sm text-primary-foreground/70">
              A curated catalogue of fine stationery and lifestyle goods,
              presented with the care of a heritage ledger.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label-caps text-accent">Explore</h2>
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`footer.link.${link.label.toLowerCase()}`}
                  className="text-sm text-primary-foreground/75 transition-smooth hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="label-caps text-accent">Enquiries</h2>
            <p className="text-sm text-primary-foreground/75">
              Call or message us at{" "}
              <span className="font-mono text-primary-foreground">
                {formatPhoneNumber()}
              </span>
            </p>
            <EnquiryButtons variant="outline" size="sm" />
          </div>
        </div>

        <div className="border-t border-accent/20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 md:flex-row md:px-8">
            <p>
              © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:text-accent"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

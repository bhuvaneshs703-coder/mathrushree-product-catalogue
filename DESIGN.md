# Design Brief

## Direction

Heritage Ledger — a fine stationer's catalogue rendered as ink on warm paper, where every product is presented like a curated entry in a bound ledger.

## Tone

Luxury/refined: quiet, editorial, and trustworthy — the restraint of a heritage Indian stationery house, never playful or loud.

## Differentiation

Deep navy bands frame warm ivory paper pages, with hairline gold rules and mono SKU captions turning every product card into a catalogued ledger entry.

## Color Palette

| Token      | OKLCH          | Role                                     |
| ---------- | -------------- | ---------------------------------------- |
| background | 0.955 0.012 85 | Warm Ivory paper content ground          |
| foreground | 0.24 0.045 250 | Deep Navy ink text                       |
| card       | 0.975 0.009 85 | Lifted paper card surface                |
| primary    | 0.24 0.045 250 | Deep Navy #0B1F33 — header, footer, CTA  |
| accent     | 0.74 0.09 85   | Gold #C8A45D — rules, labels, highlights |
| muted      | 0.915 0.014 85 | Recessed ivory section bands             |

## Typography

- Display: Fraunces — hero and section headings, high-contrast serif with tight tracking
- Body: General Sans — paragraphs, nav, buttons, UI labels
- Mono: Geist Mono — SKU codes, category captions, price/enquiry tags
- Scale: hero `text-5xl md:text-7xl font-semibold tracking-tight`, h2 `text-3xl md:text-5xl tracking-tight`, label `text-xs font-semibold uppercase tracking-[0.2em]`, body `text-base md:text-lg`

## Elevation & Depth

Flat paper planes with hairline gold/navy borders; depth comes from layered ivory bands and restrained `shadow-subtle` / `shadow-elevated` on cards, never heavy blur.

## Structural Zones

| Zone    | Background        | Border                   | Notes                                        |
| ------- | ----------------- | ------------------------ | -------------------------------------------- |
| Header  | `bg-primary` navy | `border-b` gold hairline | Serif wordmark, small-caps nav, gold Enquire |
| Content | `bg-background`   | —                        | Alternate `bg-muted/40` bands between rows   |
| Footer  | `bg-primary` navy | `border-t` gold hairline | Gold wordmark, phone + WhatsApp enquiry CTAs |

## Spacing & Rhythm

Generous vertical rhythm — sections `py-16 md:py-24`, content grouped in `gap-6 md:gap-8` grids, micro-spacing `gap-2` for labels and captions.

## Component Patterns

- Buttons: subtle radius (`rounded-md`), navy fill with ivory text for primary, gold-outline ghost for enquiry; hover shifts to gold fill with navy text
- Cards: `rounded-md`, ivory `bg-card`, hairline `border`, `shadow-subtle` rising to `shadow-elevated` on hover
- Badges: pill `rounded-full`, gold-tinted background with navy text for flags (New, Bestseller, Trending)

## Motion

- Entrance: `animate-fade-up` staggered across hero and grid items, 0.6s ease-out
- Hover: `transition-smooth` on cards and buttons — border warms to gold, shadow lifts
- Decorative: gold hairline `animate-gold-sweep` underline on section labels; no bounce

## Constraints

- Catalogue only — no cart, checkout, payments, accounts, wishlists, or reviews
- Prices render only when owner-provided; otherwise show "Enquire for price"
- WhatsApp enquiries use https://wa.me/917975948750 with product name + SKU pre-filled; phone dials 7975948750
- Never invent prices, reviews, ratings, discounts, business history, or store address
- Use semantic tokens only — no raw hex or arbitrary color classes in components

## Signature Detail

An engraved gold hairline rule that sweeps beneath each section label, paired with mono SKU captions — a ledger-entry signature unique to this catalogue.

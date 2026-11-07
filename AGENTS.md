# Project Guidance

## User Preferences

- Premium design using Deep Navy #0B1F33, Warm Ivory #F7F2E8 and Gold #C8A45D
- Playfair Display for headings and Inter for body text
- Catalogue website only — no shopping cart, checkout, online payments, customer accounts, wishlists or order management
- Prices shown only when provided; otherwise display 'Enquire for price'
- WhatsApp enquiries use https://wa.me/917975948750 with a pre-filled message containing the product name and SKU
- Phone enquiries dial 7975948750
- Never invent product prices, reviews, ratings, discounts, business history or store address

## Accepted Requirements

- A discoverable admin entry point in the site navigation
- An admin product list showing all products including drafts and archived
- Add new products from the admin area
- Rename/edit existing products from the admin area
- Delete products from the admin area

## Verified Commands

- **typecheck**: `cd src/frontend && pnpm typecheck`
- **fix**: `cd src/frontend && pnpm fix`
- **build**: `cd src/frontend && pnpm build`

## Learnings

- src/frontend/src/App.tsx owns all routes; page tasks must not edit it.
- Shared catalogue hooks live in src/frontend/src/hooks/useCatalogue.ts (catalogueKeys, usePublishedProducts, usePublishedProduct, useCategories, useBrands, useCollections, useHomepageSections, useSubmitEnquiry, useIsCallerAdmin plus owner mutation hooks).
- Shared components: src/frontend/src/components/ProductCard.tsx, components/EnquiryButtons.tsx, components/Layout.tsx. Business contact helpers: src/frontend/src/lib/enquiry.ts. SEO helper: src/frontend/src/lib/seo.ts (useSeo).
- Owner pages live under src/frontend/src/pages/owner/.
- Backend catalogue reads are published-only: listPublishedProducts and getPublishedProduct; getPublishedProduct returns null for draft and archived products, and ProductFilter in src/backend/types/catalogue.mo has no publishState field. An owner-facing all-states product read is still missing.
- src/frontend/index.html social meta tags must be preserved, only updated (og:title matches <title>, og:description matches description).
- Missing caffeineai-* M0010 errors are fixed with mops add <pkg> from src/backend/.
- Shared catalogue hooks live in src/frontend/src/hooks/useCatalogue.ts (catalogueKeys, useAllProducts, usePublishedProducts, usePublishedProduct, useCategories, useBrands, useCollections, useHomepageSections, useCreateProduct, useUpdateProduct, useDuplicateProduct, useDeleteProduct, useSetPublishState, useSetProductFlag, useReorderProductImages, useSubmitEnquiry, useIsCallerAdmin).
- Product mutations must invalidate the ['allProducts'] prefix as well as ['products'], or the admin list stays stale after delete, duplicate and publish-state changes.
- The owner-only all-states product read is listAllProducts in src/backend/lib/catalogue.mo and src/backend/mixins/catalogue-api.mo; it returns null for a non-owner caller.
- The product editor's Category select must use a non-empty string sentinel value; value={x || undefined} makes the Radix Select uncontrolled and its options fail to render in the accessibility tree.
- The product editor's Category select offers no options when the catalogue has no categories yet, so a product cannot be created until a category exists.
- The product editor's Category field offers an inline New category form, so the owner can create their first category and product without leaving the form.

import { Layout } from "@/components/Layout";
import { useSeo } from "@/lib/seo";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

/* ── Page components (implemented by page tasks) ────────────── */
const HomePage = lazy(() => import("@/pages/Home"));
const ShopPage = lazy(() => import("@/pages/Shop"));
const CategoriesPage = lazy(() => import("@/pages/Categories"));
const BrandsPage = lazy(() => import("@/pages/Brands"));
const AboutPage = lazy(() => import("@/pages/About"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const SignInPage = lazy(() => import("@/pages/owner/SignIn"));
const OwnerProductsPage = lazy(() => import("@/pages/owner/Products"));
const OwnerProductEditorPage = lazy(
  () => import("@/pages/owner/ProductEditor"),
);
const OwnerTaxonomyPage = lazy(() => import("@/pages/owner/Taxonomy"));
const OwnerHomepagePage = lazy(() => import("@/pages/owner/HomepageCuration"));

function PageFallback() {
  return (
    <div
      data-ocid="page.loading_state"
      className="mx-auto w-full max-w-7xl px-4 py-24 text-center text-muted-foreground md:px-8"
    >
      Loading…
    </div>
  );
}

function RootLayout() {
  useSeo(
    "Fine Stationery & Lifestyle",
    "A curated catalogue of fine stationery and lifestyle goods.",
  );
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  validateSearch: (search: Record<string, unknown>): { search?: string } => ({
    search: typeof search.search === "string" ? search.search : undefined,
  }),
  component: ShopPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoriesPage,
});

const brandsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brands",
  component: BrandsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetailPage,
});

const ownerSignInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/sign-in",
  component: SignInPage,
});

const ownerProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/products",
  component: OwnerProductsPage,
});

const ownerProductEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/products/$productId",
  component: OwnerProductEditorPage,
});

const ownerTaxonomyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/taxonomy",
  component: OwnerTaxonomyPage,
});

const ownerHomepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/homepage",
  component: OwnerHomepagePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  shopRoute,
  categoriesRoute,
  brandsRoute,
  aboutRoute,
  contactRoute,
  productDetailRoute,
  ownerSignInRoute,
  ownerProductsRoute,
  ownerProductEditorRoute,
  ownerTaxonomyRoute,
  ownerHomepageRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

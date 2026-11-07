import {
  type Brand,
  type Category,
  type Collection,
  type HomepageSections,
  type Id,
  type Product,
  type ProductFilter,
  type ProductPage,
  type ProductSort,
  type PublishState,
  type Subcategory,
  createActor,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ── Query keys ─────────────────────────────────────────────── */
export const catalogueKeys = {
  products: (filter: ProductFilter) => ["products", filter] as const,
  allProducts: (filter: ProductFilter) => ["allProducts", filter] as const,
  product: (id: Id) => ["product", id.toString()] as const,
  categories: ["categories"] as const,
  brands: ["brands"] as const,
  collections: ["collections"] as const,
  homepage: ["homepage"] as const,
};

/* ── Public reads ───────────────────────────────────────────── */

export function usePublishedProducts(filter: ProductFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProductPage>({
    queryKey: catalogueKeys.products(filter),
    queryFn: async () => {
      if (!actor) {
        return { products: [], total: 0n, page: 0n, pageSize: 0n };
      }
      return actor.listPublishedProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublishedProduct(id: Id | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: catalogueKeys.product(id ?? 0n),
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getPublishedProduct(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

/**
 * Owner-only read of every product regardless of publish state. Accepts a
 * search term, an optional publish-state filter and paging through the shared
 * `ProductFilter`. Returns `null` when the caller is not the owner.
 */
export function useAllProducts(filter: ProductFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProductPage | null>({
    queryKey: catalogueKeys.allProducts(filter),
    queryFn: async () => {
      if (!actor) return null;
      return actor.listAllProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Category[]>({
    queryKey: catalogueKeys.categories,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBrands() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Brand[]>({
    queryKey: catalogueKeys.brands,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBrands();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCollections() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Collection[]>({
    queryKey: catalogueKeys.collections,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHomepageSections() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HomepageSections>({
    queryKey: catalogueKeys.homepage,
    queryFn: async () => {
      if (!actor) {
        return {
          trending: [],
          newArrivals: [],
          bestsellers: [],
          featured: [],
          featuredCollections: [],
        };
      }
      return actor.listHomepageSections();
    },
    enabled: !!actor && !isFetching,
  });
}

/* ── Owner: products ────────────────────────────────────────── */

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createProduct(product);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateProduct(product);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["product"] });
      void queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

export function useDuplicateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.duplicateProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

export function useSetPublishState() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, state }: { id: Id; state: PublishState }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setPublishState(id, state);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      void queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

export function useSetProductFlag() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      flag,
      value,
    }: { id: Id; flag: string; value: boolean }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setProductFlag(id, flag, value);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["products"] });
      void queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

export function useReorderProductImages() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      imageIds,
    }: { productId: Id; imageIds: Id[] }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.reorderProductImages(productId, imageIds);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

/* ── Owner: taxonomy ────────────────────────────────────────── */

export function useCreateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Category) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createCategory(category);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useUpdateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Category) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateCategory(category);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useDeleteCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteCategory(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useCreateSubcategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subcategory: Subcategory) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createSubcategory(subcategory);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useUpdateSubcategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subcategory: Subcategory) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateSubcategory(subcategory);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useDeleteSubcategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteSubcategory(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.categories,
      });
    },
  });
}

export function useCreateBrand() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brand: Brand) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createBrand(brand);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
    },
  });
}

export function useUpdateBrand() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brand: Brand) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateBrand(brand);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
    },
  });
}

export function useDeleteBrand() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteBrand(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.brands });
    },
  });
}

/* ── Owner: collections & homepage curation ─────────────────── */

export function useCreateCollection() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (collection: Collection) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createCollection(collection);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.collections,
      });
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
    },
  });
}

export function useUpdateCollection() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (collection: Collection) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateCollection(collection);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.collections,
      });
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
    },
  });
}

export function useDeleteCollection() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.deleteCollection(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.collections,
      });
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
    },
  });
}

export function useAssignProductToCollection() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      productId,
    }: { collectionId: Id; productId: Id }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.assignProductToCollection(collectionId, productId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.collections,
      });
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
    },
  });
}

export function useRemoveProductFromCollection() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      productId,
    }: { collectionId: Id; productId: Id }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.removeProductFromCollection(collectionId, productId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: catalogueKeys.collections,
      });
      void queryClient.invalidateQueries({ queryKey: catalogueKeys.homepage });
    },
  });
}

/* ── Enquiries ──────────────────────────────────────────────── */

export function useSubmitEnquiry() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (enquiry: {
      name: string;
      contact: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitEnquiry(enquiry);
    },
  });
}

/* ── Owner access ───────────────────────────────────────────── */

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export type { ProductSort };

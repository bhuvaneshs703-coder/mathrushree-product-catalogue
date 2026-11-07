import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
import type { ExternalBlob } from "@caffeineai/object-storage";
export type { ExternalBlob } from "@caffeineai/object-storage";
export interface Brand {
    id: Id;
    logo?: ExternalBlob;
    name: string;
    slug: string;
    description?: string;
}
export type CatalogueError = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "duplicateSku";
    duplicateSku: string;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export interface Category {
    id: Id;
    order: bigint;
    name: string;
    slug: string;
    description?: string;
    subcategories: Array<Subcategory>;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface Collection {
    id: Id;
    productIds: Array<Id>;
    order: bigint;
    name: string;
    slug: string;
    description?: string;
}
export interface Enquiry {
    contact: string;
    name: string;
    message: string;
}
export type EnquiryResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface HomepageSections {
    featured: Array<Product>;
    bestsellers: Array<Product>;
    featuredCollections: Array<Collection>;
    trending: Array<Product>;
    newArrivals: Array<Product>;
}
export type Id = bigint;
export interface InviteInfo {
    expiresAt?: Time;
    revoked: boolean;
    code: string;
    name: string;
    createdAt: Time;
    createdBy: Principal;
    redemptions: Array<Redemption>;
    maxUses?: bigint;
}
export interface Product {
    id: Id;
    sku: string;
    categoryId: Id;
    specifications: Array<Specification>;
    publishState: PublishState;
    name: string;
    createdAt: Timestamp;
    isNewArrival: boolean;
    showOnHomepage: boolean;
    variants: Array<Variant>;
    availability: Availability;
    updatedAt: Timestamp;
    shortDescription: string;
    isFeatured: boolean;
    isBestseller: boolean;
    brandId?: Id;
    subcategoryId?: Id;
    price?: bigint;
    isTrending: boolean;
    longDescription: string;
    images: Array<ProductImage>;
}
export interface ProductFilter {
    categoryId?: Id;
    publishState?: PublishState;
    page?: bigint;
    sort?: ProductSort;
    pageSize?: bigint;
    search?: string;
    brandId?: Id;
    subcategoryId?: Id;
}
export interface ProductImage {
    id: Id;
    order: bigint;
    blob: ExternalBlob;
    filename: string;
    altText?: string;
}
export interface ProductPage {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    products: Array<Product>;
}
export interface Redemption {
    at: Time;
    user: Principal;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Specification {
    value: string;
    name: string;
}
export interface Subcategory {
    id: Id;
    categoryId: Id;
    order: bigint;
    name: string;
    slug: string;
}
export type Time = bigint;
export type Timestamp = bigint;
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Variant {
    sku?: string;
    value: string;
    name: string;
    availability?: Availability;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Availability {
    inStock = "inStock",
    outOfStock = "outOfStock",
    madeToOrder = "madeToOrder"
}
export enum InviteStatus {
    revoked = "revoked",
    expired = "expired",
    valid = "valid",
    invalid = "invalid",
    usedUp = "usedUp"
}
export enum ProductSort {
    nameDesc = "nameDesc",
    newest = "newest",
    nameAsc = "nameAsc",
    priceDesc = "priceDesc",
    priceAsc = "priceAsc"
}
export enum PublishState {
    published = "published",
    draft = "draft",
    archived = "archived"
}
export enum RedeemResult {
    revoked = "revoked",
    expired = "expired",
    invalid = "invalid",
    usedUp = "usedUp",
    blocked = "blocked",
    joined = "joined",
    alreadyMember = "alreadyMember"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignProductToCollection(collectionId: Id, productId: Id): Promise<CatalogueError>;
    checkInvite(code: string): Promise<InviteStatus>;
    createBrand(brand: Brand): Promise<CatalogueError>;
    createCategory(category: Category): Promise<CatalogueError>;
    createCollection(collection: Collection): Promise<CatalogueError>;
    createInvite(name: string, maxUses: bigint | null, expiresAt: Time | null): Promise<string>;
    createProduct(product: Product): Promise<CatalogueError>;
    createSubcategory(subcategory: Subcategory): Promise<CatalogueError>;
    deleteBrand(id: Id): Promise<CatalogueError>;
    deleteCategory(id: Id): Promise<CatalogueError>;
    deleteCollection(id: Id): Promise<CatalogueError>;
    deleteProduct(id: Id): Promise<CatalogueError>;
    deleteSubcategory(id: Id): Promise<CatalogueError>;
    duplicateProduct(id: Id): Promise<CatalogueError>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getPublishedProduct(id: Id): Promise<Product | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    /**
     * / Owner-only read of every product regardless of publish state.
     * / Returns null when the caller is not the signed-in owner.
     */
    listAllProducts(filter: ProductFilter): Promise<ProductPage | null>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listBrands(): Promise<Array<Brand>>;
    listCategories(): Promise<Array<Category>>;
    listCollections(): Promise<Array<Collection>>;
    listHomepageSections(): Promise<HomepageSections>;
    listInvites(): Promise<Array<InviteInfo>>;
    listPublishedProducts(filter: ProductFilter): Promise<ProductPage>;
    redeemInvite(code: string): Promise<RedeemResult>;
    removeApproval(user: Principal): Promise<void>;
    removeProductFromCollection(collectionId: Id, productId: Id): Promise<CatalogueError>;
    reorderProductImages(productId: Id, imageIds: Array<Id>): Promise<CatalogueError>;
    requestApproval(): Promise<void>;
    revokeInvite(code: string): Promise<void>;
    schema(): Promise<string>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setProductFlag(id: Id, flag: string, value: boolean): Promise<CatalogueError>;
    setPublishState(id: Id, state: PublishState): Promise<CatalogueError>;
    submitEnquiry(enquiry: Enquiry): Promise<EnquiryResult>;
    updateBrand(brand: Brand): Promise<CatalogueError>;
    updateCategory(category: Category): Promise<CatalogueError>;
    updateCollection(collection: Collection): Promise<CatalogueError>;
    updateProduct(product: Product): Promise<CatalogueError>;
    updateSubcategory(subcategory: Subcategory): Promise<CatalogueError>;
}

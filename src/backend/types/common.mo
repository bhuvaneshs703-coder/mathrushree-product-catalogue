import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// Identifier for a catalogue entity (product, category, brand, collection).
  public type Id = Nat;

  /// Signed nanosecond timestamp from `Time.now()`.
  public type Timestamp = Int;

  /// Publishing state of a product. Draft and Archived are hidden from customers.
  public type PublishState = {
    #draft;
    #published;
    #archived;
  };

  /// Availability of a product shown to customers.
  public type Availability = {
    #inStock;
    #outOfStock;
    #madeToOrder;
  };

  /// A single product image with its display order and alt text.
  public type ProductImage = {
    id : Id;
    blob : Storage.ExternalBlob;
    filename : Text;
    altText : ?Text;
    order : Nat;
  };

  /// A named specification row shown on the product page.
  public type Specification = {
    name : Text;
    value : Text;
  };

  /// A purchasable variant of a product (for example a colour or pack size).
  public type Variant = {
    name : Text;
    value : Text;
    sku : ?Text;
    availability : ?Availability;
  };

  /// A product as stored and returned to the owner dashboard.
  public type Product = {
    id : Id;
    name : Text;
    sku : Text;
    brandId : ?Id;
    categoryId : Id;
    subcategoryId : ?Id;
    shortDescription : Text;
    longDescription : Text;
    specifications : [Specification];
    variants : [Variant];
    availability : Availability;
    price : ?Nat;
    images : [ProductImage];
    publishState : PublishState;
    isTrending : Bool;
    isNewArrival : Bool;
    isBestseller : Bool;
    isFeatured : Bool;
    showOnHomepage : Bool;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  /// A category, optionally with subcategories.
  public type Category = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    order : Nat;
    subcategories : [Subcategory];
  };

  /// A subcategory belonging to a category.
  public type Subcategory = {
    id : Id;
    categoryId : Id;
    name : Text;
    slug : Text;
    order : Nat;
  };

  /// A product brand.
  public type Brand = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    logo : ?Storage.ExternalBlob;
  };

  /// A curated collection of products.
  public type Collection = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    productIds : [Id];
    order : Nat;
  };

  /// A contact-form enquiry submitted from the public website.
  public type Enquiry = {
    name : Text;
    contact : Text;
    message : Text;
  };

  /// Result of submitting an enquiry.
  public type EnquiryResult = {
    #ok;
    #err : Text;
  };

  /// Result of an owner-only write operation: `#ok` on success, otherwise the failure.
  public type CatalogueError = {
    #ok;
    #notFound;
    #duplicateSku : Text;
    #invalidInput : Text;
    #unauthorized;
  };

  /// A page of products plus the total count for pagination.
  public type ProductPage = {
    products : [Product];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };

  /// Sort order for product listings.
  public type ProductSort = {
    #newest;
    #nameAsc;
    #nameDesc;
    #priceAsc;
    #priceDesc;
  };

  /// Filters applied to a product listing.
  public type ProductFilter = {
    search : ?Text;
    categoryId : ?Id;
    subcategoryId : ?Id;
    brandId : ?Id;
    sort : ?ProductSort;
    page : ?Nat;
    pageSize : ?Nat;
    /// Restrict to one publishing state. `null` means every state.
    /// Only honoured by the owner-only all-states read; the public read
    /// always returns published products regardless of this field.
    publishState : ?PublishState;
  };

  /// The curated homepage sections.
  public type HomepageSections = {
    trending : [Product];
    newArrivals : [Product];
    bestsellers : [Product];
    featured : [Product];
    featuredCollections : [Collection];
  };
};

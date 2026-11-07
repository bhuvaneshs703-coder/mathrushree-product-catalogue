import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";

module {
  /// Internal mutable catalogue state shared by the catalogue mixin.
  public type CatalogueState = {
    var nextProductId : Nat;
    var nextCategoryId : Nat;
    var nextSubcategoryId : Nat;
    var nextBrandId : Nat;
    var nextCollectionId : Nat;
    var nextImageId : Nat;
    products : Map.Map<Types.Id, Types.Product>;
    categories : Map.Map<Types.Id, Types.Category>;
    brands : Map.Map<Types.Id, Types.Brand>;
    collections : Map.Map<Types.Id, Types.Collection>;
  };

  // ---- Internal helpers ----

  func isPublished(product : Types.Product) : Bool {
    switch (product.publishState) {
      case (#published) { true };
      case (_) { false };
    };
  };

  func normalizeSku(sku : Text) : Text {
    sku.trim(#predicate(func c = c == ' ')).toLower();
  };

  /// True when `sku` is already used by a product other than `exceptId`.
  func skuTaken(catalogue : CatalogueState, sku : Text, exceptId : ?Types.Id) : Bool {
    let target = normalizeSku(sku);
    catalogue.products.values().any(func(p) {
      let same = normalizeSku(p.sku) == target;
      switch (exceptId) {
        case (?id) { same and p.id != id };
        case null { same };
      };
    });
  };

  func brandName(catalogue : CatalogueState, brandId : ?Types.Id) : Text {
    switch (brandId) {
      case (?id) {
        switch (catalogue.brands.get(id)) {
          case (?b) { b.name };
          case null { "" };
        };
      };
      case null { "" };
    };
  };

  /// True when the product's subcategory belongs to `categoryId`.
  func subcategoryInCategory(catalogue : CatalogueState, subcategoryId : ?Types.Id, categoryId : Types.Id) : Bool {
    switch (subcategoryId) {
      case (?sid) {
        switch (catalogue.categories.get(categoryId)) {
          case (?cat) { cat.subcategories.any(func(s) = s.id == sid) };
          case null { false };
        };
      };
      case null { false };
    };
  };

  func matchesSearch(catalogue : CatalogueState, product : Types.Product, term : Text) : Bool {
    let q = term.trim(#predicate(func c = c == ' ')).toLower();
    if (q == "") { return true };
    let inName = product.name.toLower().contains(#text q);
    let inDesc = product.shortDescription.toLower().contains(#text q)
      or product.longDescription.toLower().contains(#text q);
    let inBrand = brandName(catalogue, product.brandId).toLower().contains(#text q);
    inName or inDesc or inBrand;
  };

  func matchesFilter(catalogue : CatalogueState, product : Types.Product, filter : Types.ProductFilter) : Bool {
    if (not isPublished(product)) { return false };
    switch (filter.search) {
      case (?term) { if (not matchesSearch(catalogue, product, term)) { return false } };
      case null {};
    };
    switch (filter.categoryId) {
      case (?cid) {
        let direct = product.categoryId == cid;
        let viaSub = subcategoryInCategory(catalogue, product.subcategoryId, cid);
        if (not (direct or viaSub)) { return false };
      };
      case null {};
    };
    switch (filter.subcategoryId) {
      case (?sid) {
        switch (product.subcategoryId) {
          case (?psid) { if (psid != sid) { return false } };
          case null { return false };
        };
      };
      case null {};
    };
    switch (filter.brandId) {
      case (?bid) {
        switch (product.brandId) {
          case (?pbid) { if (pbid != bid) { return false } };
          case null { return false };
        };
      };
      case null {};
    };
    true;
  };

  func compareProducts(a : Types.Product, b : Types.Product, sort : Types.ProductSort) : { #less; #equal; #greater } {
    switch (sort) {
      case (#newest) {
        if (a.createdAt > b.createdAt) { #less }
        else if (a.createdAt < b.createdAt) { #greater }
        else { #equal };
      };
      case (#nameAsc) { a.name.toLower().compare(b.name.toLower()) };
      case (#nameDesc) { b.name.toLower().compare(a.name.toLower()) };
      case (#priceAsc) { comparePrice(a.price, b.price, true) };
      case (#priceDesc) { comparePrice(a.price, b.price, false) };
    };
  };

  /// Products without a price sort last in both directions.
  func comparePrice(a : ?Nat, b : ?Nat, ascending : Bool) : { #less; #equal; #greater } {
    switch (a, b) {
      case (?pa, ?pb) {
        if (pa == pb) { #equal }
        else if (ascending) { if (pa < pb) { #less } else { #greater } }
        else { if (pa > pb) { #less } else { #greater } };
      };
      case (?_, null) { #less };
      case (null, ?_) { #greater };
      case (null, null) { #equal };
    };
  };

  // ---- Public API ----

  /// True when the caller is an admin (the business owner).
  public func isOwner(state : AccessControl.AccessControlState, caller : Principal) : Bool {
    AccessControl.isAdmin(state, caller);
  };

  /// List published products matching the filter, with sorting and pagination.
  public func listPublishedProducts(catalogue : CatalogueState, filter : Types.ProductFilter) : Types.ProductPage {
    let matched = catalogue.products.values()
      .filter(func(p) = matchesFilter(catalogue, p, filter))
      .toArray();
    let sort = filter.sort ?? #newest;
    let sorted = matched.sort(func(a, b) = compareProducts(a, b, sort));
    let total = sorted.size();
    let pageSize = switch (filter.pageSize) {
      case (?ps) { if (ps == 0) { 12 } else { ps } };
      case null { 12 };
    };
    let page = filter.page ?? 0;
    let start = page * pageSize;
    let products = if (start >= total) {
      ([] : [Types.Product]);
    } else {
      let pageList = List.empty<Types.Product>();
      var i = start;
      var taken = 0;
      while (i < total and taken < pageSize) {
        pageList.add(sorted[i]);
        i += 1;
        taken += 1;
      };
      pageList.toArray();
    };
    { products; total; page; pageSize };
  };

  /// Fetch one published product by id; null when absent or not published.
  public func getPublishedProduct(catalogue : CatalogueState, id : Types.Id) : ?Types.Product {
    switch (catalogue.products.get(id)) {
      case (?p) { if (isPublished(p)) { ?p } else { null } };
      case null { null };
    };
  };

  /// True when the product matches the owner-facing search term (name or SKU).
  func matchesOwnerSearch(product : Types.Product, term : Text) : Bool {
    let q = term.trim(#predicate(func c = c == ' ')).toLower();
    if (q == "") { return true };
    product.name.toLower().contains(#text q) or product.sku.toLower().contains(#text q);
  };

  /// True when the product matches the owner-facing publish-state filter.
  func matchesPublishState(product : Types.Product, wanted : ?Types.PublishState) : Bool {
    switch (wanted) {
      case (?state) { product.publishState == state };
      case null { true };
    };
  };

  /// Owner-only read: every product regardless of publish state, filtered by
  /// search term (name or SKU) and publish state, with sorting and pagination.
  public func listAllProducts(catalogue : CatalogueState, filter : Types.ProductFilter) : Types.ProductPage {
    let matched = catalogue.products.values()
      .filter(func(p) {
        switch (filter.search) {
          case (?term) { if (not matchesOwnerSearch(p, term)) { return false } };
          case null {};
        };
        matchesPublishState(p, filter.publishState);
      })
      .toArray();
    let sort = filter.sort ?? #newest;
    let sorted = matched.sort(func(a, b) = compareProducts(a, b, sort));
    let total = sorted.size();
    let pageSize = switch (filter.pageSize) {
      case (?ps) { if (ps == 0) { 12 } else { ps } };
      case null { 12 };
    };
    let page = filter.page ?? 0;
    let start = page * pageSize;
    let products = if (start >= total) {
      ([] : [Types.Product]);
    } else {
      let pageList = List.empty<Types.Product>();
      var i = start;
      var taken = 0;
      while (i < total and taken < pageSize) {
        pageList.add(sorted[i]);
        i += 1;
        taken += 1;
      };
      pageList.toArray();
    };
    { products; total; page; pageSize };
  };

  /// List all categories with their subcategories.
  public func listCategories(catalogue : CatalogueState) : [Types.Category] {
    catalogue.categories.values().toArray().sort(func(a, b) = Nat.compare(a.order, b.order));
  };

  /// List all brands.
  public func listBrands(catalogue : CatalogueState) : [Types.Brand] {
    catalogue.brands.values().toArray().sort(func(a, b) = a.name.toLower().compare(b.name.toLower()));
  };

  /// List all collections with their product ids.
  public func listCollections(catalogue : CatalogueState) : [Types.Collection] {
    catalogue.collections.values().toArray().sort(func(a, b) = Nat.compare(a.order, b.order));
  };

  /// Published products flagged for a homepage section, newest first.
  func flagged(catalogue : CatalogueState, pick : Types.Product -> Bool) : [Types.Product] {
    catalogue.products.values()
      .filter(func(p) = isPublished(p) and p.showOnHomepage and pick(p))
      .toArray()
      .sort(func(a, b) = compareProducts(a, b, #newest));
  };

  /// List the curated homepage sections.
  public func listHomepageSections(catalogue : CatalogueState) : Types.HomepageSections {
    let featuredCollections = catalogue.collections.values()
      .filter(func(c) {
        c.productIds.any(func(pid) {
          switch (catalogue.products.get(pid)) {
            case (?p) { isPublished(p) };
            case null { false };
          };
        });
      })
      .toArray()
      .sort(func(a, b) = Nat.compare(a.order, b.order));
    {
      trending = flagged(catalogue, func(p) = p.isTrending);
      newArrivals = flagged(catalogue, func(p) = p.isNewArrival);
      bestsellers = flagged(catalogue, func(p) = p.isBestseller);
      featured = flagged(catalogue, func(p) = p.isFeatured);
      featuredCollections;
    };
  };

  /// Create a product; rejects a duplicate SKU.
  public func createProduct(catalogue : CatalogueState, product : Types.Product) : Types.CatalogueError {
    if (product.name.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Product name is required");
    };
    if (product.sku.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Product SKU is required");
    };
    if (skuTaken(catalogue, product.sku, null)) {
      return #duplicateSku(product.sku);
    };
    let id = catalogue.nextProductId;
    catalogue.nextProductId := id + 1;
    let now = Time.now();
    let stored : Types.Product = {
      product with
      id = id;
      createdAt = now;
      updatedAt = now;
    };
    catalogue.products.add(id, stored);
    #ok;
  };

  /// Update an existing product; rejects a duplicate SKU.
  public func updateProduct(catalogue : CatalogueState, product : Types.Product) : Types.CatalogueError {
    switch (catalogue.products.get(product.id)) {
      case null { return #notFound };
      case (?_) {};
    };
    if (product.name.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Product name is required");
    };
    if (product.sku.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Product SKU is required");
    };
    if (skuTaken(catalogue, product.sku, ?product.id)) {
      return #duplicateSku(product.sku);
    };
    let updated : Types.Product = {
      product with
      updatedAt = Time.now();
    };
    catalogue.products.add(product.id, updated);
    #ok;
  };

  /// Derive a non-colliding SKU from `base`.
  func deriveSku(catalogue : CatalogueState, base : Text) : Text {
    var n = 1;
    var candidate = base # "-COPY";
    while (skuTaken(catalogue, candidate, null)) {
      n += 1;
      candidate := base # "-COPY-" # n.toText();
    };
    candidate;
  };

  /// Duplicate a product under a new id and SKU.
  public func duplicateProduct(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    switch (catalogue.products.get(id)) {
      case null { return #notFound };
      case (?original) {
        let newId = catalogue.nextProductId;
        catalogue.nextProductId := newId + 1;
        let now = Time.now();
        let copy : Types.Product = {
          original with
          id = newId;
          sku = deriveSku(catalogue, original.sku);
          publishState = #draft;
          createdAt = now;
          updatedAt = now;
        };
        catalogue.products.add(newId, copy);
        #ok;
      };
    };
  };

  /// Delete a product and remove it from every collection.
  public func deleteProduct(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    switch (catalogue.products.get(id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.products.remove(id);
    let snapshot = catalogue.collections.values().toArray();
    for (collection in snapshot.values()) {
      if (collection.productIds.any(func(pid) = pid == id)) {
        let remaining = collection.productIds.filter(func(pid) = pid != id);
        catalogue.collections.add(collection.id, { collection with productIds = remaining });
      };
    };
    #ok;
  };

  /// Set a product's publishing state.
  public func setPublishState(catalogue : CatalogueState, id : Types.Id, state : Types.PublishState) : Types.CatalogueError {
    switch (catalogue.products.get(id)) {
      case null { return #notFound };
      case (?p) {
        catalogue.products.add(id, { p with publishState = state; updatedAt = Time.now() });
        #ok;
      };
    };
  };

  /// Toggle one of the product's homepage flags.
  public func setProductFlag(catalogue : CatalogueState, id : Types.Id, flag : Text, value : Bool) : Types.CatalogueError {
    switch (catalogue.products.get(id)) {
      case null { return #notFound };
      case (?p) {
        let updated : Types.Product = switch (flag) {
          case ("trending") { { p with isTrending = value } };
          case ("newArrival") { { p with isNewArrival = value } };
          case ("bestseller") { { p with isBestseller = value } };
          case ("featured") { { p with isFeatured = value } };
          case ("showOnHomepage") { { p with showOnHomepage = value } };
          case (_) { return #invalidInput("Unknown flag: " # flag) };
        };
        catalogue.products.add(id, { updated with updatedAt = Time.now() });
        #ok;
      };
    };
  };

  // ---- Categories ----

  /// Create a category.
  public func createCategory(catalogue : CatalogueState, category : Types.Category) : Types.CatalogueError {
    if (category.name.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Category name is required");
    };
    let id = catalogue.nextCategoryId;
    catalogue.nextCategoryId := id + 1;
    catalogue.categories.add(id, { category with id = id });
    #ok;
  };

  /// Update a category.
  public func updateCategory(catalogue : CatalogueState, category : Types.Category) : Types.CatalogueError {
    switch (catalogue.categories.get(category.id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.categories.add(category.id, category);
    #ok;
  };

  /// Delete a category.
  public func deleteCategory(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    switch (catalogue.categories.get(id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.categories.remove(id);
    #ok;
  };

  // ---- Subcategories ----

  /// Create a subcategory under a category.
  public func createSubcategory(catalogue : CatalogueState, subcategory : Types.Subcategory) : Types.CatalogueError {
    switch (catalogue.categories.get(subcategory.categoryId)) {
      case null { return #notFound };
      case (?cat) {
        let id = catalogue.nextSubcategoryId;
        catalogue.nextSubcategoryId := id + 1;
        let stored = { subcategory with id = id };
        catalogue.categories.add(cat.id, { cat with subcategories = cat.subcategories.concat([stored]) });
        #ok;
      };
    };
  };

  /// Update a subcategory.
  public func updateSubcategory(catalogue : CatalogueState, subcategory : Types.Subcategory) : Types.CatalogueError {
    switch (catalogue.categories.get(subcategory.categoryId)) {
      case null { return #notFound };
      case (?cat) {
        let exists = cat.subcategories.any(func(s) = s.id == subcategory.id);
        if (not exists) { return #notFound };
        let updated = cat.subcategories.map(func(s) = if (s.id == subcategory.id) { subcategory } else { s });
        catalogue.categories.add(cat.id, { cat with subcategories = updated });
        #ok;
      };
    };
  };

  /// Delete a subcategory.
  public func deleteSubcategory(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    var found = false;
    let snapshot = catalogue.categories.values().toArray();
    for (cat in snapshot.values()) {
      if (cat.subcategories.any(func(s) = s.id == id)) {
        found := true;
        let remaining = cat.subcategories.filter(func(s) = s.id != id);
        catalogue.categories.add(cat.id, { cat with subcategories = remaining });
      };
    };
    if (found) { #ok } else { #notFound };
  };

  // ---- Brands ----

  /// Create a brand.
  public func createBrand(catalogue : CatalogueState, brand : Types.Brand) : Types.CatalogueError {
    if (brand.name.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Brand name is required");
    };
    let id = catalogue.nextBrandId;
    catalogue.nextBrandId := id + 1;
    catalogue.brands.add(id, { brand with id = id });
    #ok;
  };

  /// Update a brand.
  public func updateBrand(catalogue : CatalogueState, brand : Types.Brand) : Types.CatalogueError {
    switch (catalogue.brands.get(brand.id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.brands.add(brand.id, brand);
    #ok;
  };

  /// Delete a brand.
  public func deleteBrand(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    switch (catalogue.brands.get(id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.brands.remove(id);
    #ok;
  };

  // ---- Collections ----

  /// Create a collection.
  public func createCollection(catalogue : CatalogueState, collection : Types.Collection) : Types.CatalogueError {
    if (collection.name.trim(#predicate(func c = c == ' ')) == "") {
      return #invalidInput("Collection name is required");
    };
    let id = catalogue.nextCollectionId;
    catalogue.nextCollectionId := id + 1;
    catalogue.collections.add(id, { collection with id = id });
    #ok;
  };

  /// Update a collection.
  public func updateCollection(catalogue : CatalogueState, collection : Types.Collection) : Types.CatalogueError {
    switch (catalogue.collections.get(collection.id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.collections.add(collection.id, collection);
    #ok;
  };

  /// Delete a collection.
  public func deleteCollection(catalogue : CatalogueState, id : Types.Id) : Types.CatalogueError {
    switch (catalogue.collections.get(id)) {
      case null { return #notFound };
      case (?_) {};
    };
    catalogue.collections.remove(id);
    #ok;
  };

  /// Assign a product to a collection.
  public func assignProductToCollection(catalogue : CatalogueState, collectionId : Types.Id, productId : Types.Id) : Types.CatalogueError {
    switch (catalogue.collections.get(collectionId)) {
      case null { return #notFound };
      case (?collection) {
        switch (catalogue.products.get(productId)) {
          case null { return #notFound };
          case (?_) {};
        };
        if (collection.productIds.any(func(pid) = pid == productId)) {
          return #ok;
        };
        catalogue.collections.add(collectionId, { collection with productIds = collection.productIds.concat([productId]) });
        #ok;
      };
    };
  };

  /// Remove a product from a collection.
  public func removeProductFromCollection(catalogue : CatalogueState, collectionId : Types.Id, productId : Types.Id) : Types.CatalogueError {
    switch (catalogue.collections.get(collectionId)) {
      case null { return #notFound };
      case (?collection) {
        let remaining = collection.productIds.filter(func(pid) = pid != productId);
        catalogue.collections.add(collectionId, { collection with productIds = remaining });
        #ok;
      };
    };
  };

  /// Reorder a product's images by the given id order.
  public func reorderProductImages(catalogue : CatalogueState, productId : Types.Id, imageIds : [Types.Id]) : Types.CatalogueError {
    switch (catalogue.products.get(productId)) {
      case null { return #notFound };
      case (?product) {
        let ordered = List.empty<Types.ProductImage>();
        var order = 0;
        for (imageId in imageIds.values()) {
          switch (product.images.find(func(img) = img.id == imageId)) {
            case (?img) {
              ordered.add({ img with order = order });
              order += 1;
            };
            case null {};
          };
        };
        // Append any images not named in the order, preserving their relative order.
        for (img in product.images.values()) {
          if (not imageIds.any(func(iid) = iid == img.id)) {
            ordered.add({ img with order = order });
            order += 1;
          };
        };
        catalogue.products.add(productId, { product with images = ordered.toArray(); updatedAt = Time.now() });
        #ok;
      };
    };
  };
};

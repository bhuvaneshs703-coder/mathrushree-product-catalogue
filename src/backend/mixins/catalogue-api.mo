import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/common";
import CatalogueLib "../lib/catalogue";

mixin (
  accessControlState : AccessControl.AccessControlState,
  catalogue : CatalogueLib.CatalogueState,
) {
  // ---- Public read operations ----

  public query func listPublishedProducts(filter : Types.ProductFilter) : async Types.ProductPage {
    CatalogueLib.listPublishedProducts(catalogue, filter);
  };

  public query func getPublishedProduct(id : Types.Id) : async ?Types.Product {
    CatalogueLib.getPublishedProduct(catalogue, id);
  };

  /// Owner-only read of every product regardless of publish state.
  /// Returns null when the caller is not the signed-in owner.
  public query ({ caller }) func listAllProducts(filter : Types.ProductFilter) : async ?Types.ProductPage {
    if (not CatalogueLib.isOwner(accessControlState, caller)) {
      return null;
    };
    ?CatalogueLib.listAllProducts(catalogue, filter);
  };

  public query func listCategories() : async [Types.Category] {
    CatalogueLib.listCategories(catalogue);
  };

  public query func listBrands() : async [Types.Brand] {
    CatalogueLib.listBrands(catalogue);
  };

  public query func listCollections() : async [Types.Collection] {
    CatalogueLib.listCollections(catalogue);
  };

  public query func listHomepageSections() : async Types.HomepageSections {
    CatalogueLib.listHomepageSections(catalogue);
  };

  // ---- Owner-only write operations ----

  func requireOwner(caller : Principal) : ?Types.CatalogueError {
    if (CatalogueLib.isOwner(accessControlState, caller)) { null } else { ?#unauthorized };
  };

  public shared ({ caller }) func createProduct(product : Types.Product) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.createProduct(catalogue, product) };
    };
  };

  public shared ({ caller }) func updateProduct(product : Types.Product) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.updateProduct(catalogue, product) };
    };
  };

  public shared ({ caller }) func duplicateProduct(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.duplicateProduct(catalogue, id) };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.deleteProduct(catalogue, id) };
    };
  };

  public shared ({ caller }) func setPublishState(id : Types.Id, state : Types.PublishState) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.setPublishState(catalogue, id, state) };
    };
  };

  public shared ({ caller }) func setProductFlag(id : Types.Id, flag : Text, value : Bool) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.setProductFlag(catalogue, id, flag, value) };
    };
  };

  public shared ({ caller }) func createCategory(category : Types.Category) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.createCategory(catalogue, category) };
    };
  };

  public shared ({ caller }) func updateCategory(category : Types.Category) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.updateCategory(catalogue, category) };
    };
  };

  public shared ({ caller }) func deleteCategory(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.deleteCategory(catalogue, id) };
    };
  };

  public shared ({ caller }) func createSubcategory(subcategory : Types.Subcategory) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.createSubcategory(catalogue, subcategory) };
    };
  };

  public shared ({ caller }) func updateSubcategory(subcategory : Types.Subcategory) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.updateSubcategory(catalogue, subcategory) };
    };
  };

  public shared ({ caller }) func deleteSubcategory(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.deleteSubcategory(catalogue, id) };
    };
  };

  public shared ({ caller }) func createBrand(brand : Types.Brand) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.createBrand(catalogue, brand) };
    };
  };

  public shared ({ caller }) func updateBrand(brand : Types.Brand) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.updateBrand(catalogue, brand) };
    };
  };

  public shared ({ caller }) func deleteBrand(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.deleteBrand(catalogue, id) };
    };
  };

  public shared ({ caller }) func createCollection(collection : Types.Collection) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.createCollection(catalogue, collection) };
    };
  };

  public shared ({ caller }) func updateCollection(collection : Types.Collection) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.updateCollection(catalogue, collection) };
    };
  };

  public shared ({ caller }) func deleteCollection(id : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.deleteCollection(catalogue, id) };
    };
  };

  public shared ({ caller }) func assignProductToCollection(collectionId : Types.Id, productId : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.assignProductToCollection(catalogue, collectionId, productId) };
    };
  };

  public shared ({ caller }) func removeProductFromCollection(collectionId : Types.Id, productId : Types.Id) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.removeProductFromCollection(catalogue, collectionId, productId) };
    };
  };

  public shared ({ caller }) func reorderProductImages(productId : Types.Id, imageIds : [Types.Id]) : async Types.CatalogueError {
    switch (requireOwner(caller)) {
      case (?err) { err };
      case null { CatalogueLib.reorderProductImages(catalogue, productId, imageIds) };
    };
  };
};

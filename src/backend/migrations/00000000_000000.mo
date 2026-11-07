import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import Invites "mo:caffeineai-user-approval/invites";

module {
  type Id = Nat;
  type Timestamp = Int;

  type PublishState = { #draft; #published; #archived };
  type Availability = { #inStock; #outOfStock; #madeToOrder };

  type ProductImage = {
    id : Id;
    blob : Blob;
    filename : Text;
    altText : ?Text;
    order : Nat;
  };

  type Specification = { name : Text; value : Text };

  type Variant = {
    name : Text;
    value : Text;
    sku : ?Text;
    availability : ?Availability;
  };

  type Product = {
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

  type Subcategory = {
    id : Id;
    categoryId : Id;
    name : Text;
    slug : Text;
    order : Nat;
  };

  type Category = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    order : Nat;
    subcategories : [Subcategory];
  };

  type Brand = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    logo : ?Blob;
  };

  type Collection = {
    id : Id;
    name : Text;
    slug : Text;
    description : ?Text;
    productIds : [Id];
    order : Nat;
  };

  type Enquiry = {
    name : Text;
    contact : Text;
    message : Text;
  };

  type CatalogueState = {
    var nextProductId : Nat;
    var nextCategoryId : Nat;
    var nextSubcategoryId : Nat;
    var nextBrandId : Nat;
    var nextCollectionId : Nat;
    var nextImageId : Nat;
    products : Map.Map<Id, Product>;
    categories : Map.Map<Id, Category>;
    brands : Map.Map<Id, Brand>;
    collections : Map.Map<Id, Collection>;
  };

  type EnquiryState = {
    var nextEnquiryId : Nat;
    enquiries : List.List<Enquiry>;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    approvalState : UserApproval.UserApprovalState;
    invitesState : Invites.InvitesState;
    catalogue : CatalogueState;
    enquiries : EnquiryState;
  };

  public func migration(_ : {}) : NewActor {
    let accessControlState = AccessControl.initState();
    {
      accessControlState;
      approvalState = UserApproval.initState(accessControlState);
      invitesState = Invites.initState();
      catalogue = {
        var nextProductId = 0;
        var nextCategoryId = 0;
        var nextSubcategoryId = 0;
        var nextBrandId = 0;
        var nextCollectionId = 0;
        var nextImageId = 0;
        products = Map.empty();
        categories = Map.empty();
        brands = Map.empty();
        collections = Map.empty();
      };
      enquiries = {
        var nextEnquiryId = 0;
        enquiries = List.empty();
      };
    };
  };
};

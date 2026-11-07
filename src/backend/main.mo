import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MixinUserApproval "mo:caffeineai-user-approval/MixinUserApproval";
import MixinMemberInvites "mo:caffeineai-user-approval/MixinMemberInvites";
import UserApproval "mo:caffeineai-user-approval/approval";
import Invites "mo:caffeineai-user-approval/invites";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import NatValue "mo:caffeineai-oql/NatValue";
import IntValue "mo:caffeineai-oql/IntValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import CatalogueMixin "mixins/catalogue-api";
import EnquiriesMixin "mixins/enquiries-api";
import ApiDocMixin "mixins/api-doc";
import CatalogueLib "lib/catalogue";
import EnquiriesLib "lib/enquiries";
import Types "types/common";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let approvalState : UserApproval.UserApprovalState;
  include MixinUserApproval(accessControlState, approvalState);

  let invitesState : Invites.InvitesState;
  include MixinMemberInvites(accessControlState, approvalState, invitesState);

  include MixinObjectStorage();

  let catalogue : CatalogueLib.CatalogueState;
  include CatalogueMixin(accessControlState, catalogue);

  let enquiries : EnquiriesLib.EnquiryState;
  include EnquiriesMixin(enquiries);

  include ApiDocMixin();

  // ---- OQL entities ----
  // Products and enquiries are owner/agent-only (they include drafts, archived
  // rows and private customer messages). Taxonomy is public catalogue data.

  func publishStateText(state : Types.PublishState) : Text {
    switch (state) {
      case (#draft) { "draft" };
      case (#published) { "published" };
      case (#archived) { "archived" };
    };
  };

  func availabilityText(availability : Types.Availability) : Text {
    switch (availability) {
      case (#inStock) { "inStock" };
      case (#outOfStock) { "outOfStock" };
      case (#madeToOrder) { "madeToOrder" };
    };
  };

  include Expose({
    entities = [
      catalogue.products.toEntityManual("product", "Product", "id")
        .sample({
          id = 0;
          name = "";
          sku = "";
          brandId = null;
          categoryId = 0;
          subcategoryId = null;
          shortDescription = "";
          longDescription = "";
          specifications = [];
          variants = [];
          availability = #inStock;
          price = ?0;
          images = [];
          publishState = #draft;
          isTrending = false;
          isNewArrival = false;
          isBestseller = false;
          isFeatured = false;
          showOnHomepage = false;
          createdAt = 0;
          updatedAt = 0;
        })
        .payload("id", func p = p.id)
        .payload("name", func p = p.name)
        .payload("sku", func p = p.sku)
        .payload("brandId", func p = p.brandId)
        .payload("categoryId", func p = p.categoryId)
        .payload("subcategoryId", func p = p.subcategoryId)
        .payload("shortDescription", func p = p.shortDescription)
        .payload("longDescription", func p = p.longDescription)
        .payload("availability", func p = availabilityText(p.availability))
        .payload("price", func p = p.price)
        .payload("publishState", func p = publishStateText(p.publishState))
        .payload("isTrending", func p = p.isTrending)
        .payload("isNewArrival", func p = p.isNewArrival)
        .payload("isBestseller", func p = p.isBestseller)
        .payload("isFeatured", func p = p.isFeatured)
        .payload("showOnHomepage", func p = p.showOnHomepage)
        .payload("createdAt", func p = p.createdAt)
        .payload("updatedAt", func p = p.updatedAt)
        .controllerOnly()
        .build(),
      catalogue.categories.toEntityManual("category", "Category", "id")
        .sample({
          id = 0;
          name = "";
          slug = "";
          description = null;
          order = 0;
          subcategories = [];
        })
        .payload("id", func c = c.id)
        .payload("name", func c = c.name)
        .payload("slug", func c = c.slug)
        .payload("description", func c = c.description)
        .payload("order", func c = c.order)
        .payload("subcategoryCount", func c = c.subcategories.size())
        .public_()
        .build(),
      catalogue.brands.toEntityManual("brand", "Brand", "id")
        .sample({ id = 0; name = ""; slug = ""; description = null; logo = null })
        .payload("id", func b = b.id)
        .payload("name", func b = b.name)
        .payload("slug", func b = b.slug)
        .payload("description", func b = b.description)
        .public_()
        .build(),
      catalogue.collections.toEntityManual("collection", "Collection", "id")
        .sample({
          id = 0;
          name = "";
          slug = "";
          description = null;
          productIds = [];
          order = 0;
        })
        .payload("id", func c = c.id)
        .payload("name", func c = c.name)
        .payload("slug", func c = c.slug)
        .payload("description", func c = c.description)
        .payload("productCount", func c = c.productIds.size())
        .payload("order", func c = c.order)
        .public_()
        .build(),
      enquiries.enquiries.toEntityManual("enquiry", "Enquiry", "name")
        .sample({ name = ""; contact = ""; message = "" })
        .payload("name", func e = e.name)
        .payload("contact", func e = e.contact)
        .payload("message", func e = e.message)
        .controllerOnly()
        .build(),
    ];
  });
};

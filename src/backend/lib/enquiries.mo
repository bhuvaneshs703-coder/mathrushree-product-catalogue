import List "mo:core/List";
import Text "mo:core/Text";
import Types "../types/common";

module {
  /// Internal enquiry state.
  public type EnquiryState = {
    var nextEnquiryId : Nat;
    enquiries : List.List<Types.Enquiry>;
  };

  func isBlank(value : Text) : Bool {
    value.trim(#predicate(func c = c == ' ')) == "";
  };

  /// Validate an enquiry server-side; returns an error message when invalid.
  public func validate(enquiry : Types.Enquiry) : ?Text {
    if (isBlank(enquiry.name)) { return ?"Please enter your name" };
    if (enquiry.name.size() > 120) { return ?"Name is too long" };
    if (isBlank(enquiry.contact)) { return ?"Please enter a phone number or email address" };
    if (enquiry.contact.size() > 200) { return ?"Contact detail is too long" };
    if (isBlank(enquiry.message)) { return ?"Please enter a message" };
    if (enquiry.message.size() > 4000) { return ?"Message is too long" };
    null;
  };

  /// Record an enquiry after validation. Returns the validation error, if any.
  public func record(state : EnquiryState, enquiry : Types.Enquiry) : ?Text {
    switch (validate(enquiry)) {
      case (?err) { ?err };
      case null {
        state.enquiries.add(enquiry);
        state.nextEnquiryId += 1;
        null;
      };
    };
  };
};

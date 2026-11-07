import Runtime "mo:core/Runtime";
import Types "../types/common";
import EnquiriesLib "../lib/enquiries";
import EmailClient "mo:caffeineai-email/emailClient";

mixin (enquiries : EnquiriesLib.EnquiryState) {
  public shared func submitEnquiry(enquiry : Types.Enquiry) : async Types.EnquiryResult {
    switch (EnquiriesLib.record(enquiries, enquiry)) {
      case (?err) { #err(err) };
      case null {
        // Owner address that receives enquiry notifications. Configured at
        // deploy time; when unset the enquiry is still recorded and no email
        // is sent.
        switch (Runtime.envVar<system>("OWNER_EMAIL")) {
          case (?address) {
            let subject = "New enquiry from " # enquiry.name;
            let body = "Name: " # enquiry.name # "\nContact: " # enquiry.contact
              # "\n\nMessage:\n" # enquiry.message;
            ignore await EmailClient.sendServiceEmail("no-reply", [address], subject, body);
          };
          case null {};
        };
        #ok;
      };
    };
  };
};

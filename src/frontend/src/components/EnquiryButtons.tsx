import type { Product } from "@/backend";
import {
  buildPhoneLink,
  buildWhatsAppLink,
  formatPhoneNumber,
} from "@/lib/enquiry";
import { MessageCircle, Phone } from "lucide-react";

type EnquiryButtonsProps = {
  product?: Pick<Product, "name" | "sku">;
  className?: string;
  size?: "sm" | "md";
  variant?: "solid" | "outline";
};

/**
 * Working WhatsApp and phone enquiry actions used across the site.
 * When a product is supplied the WhatsApp message names the product and SKU.
 */
export function EnquiryButtons({
  product,
  className,
  size = "md",
  variant = "solid",
}: EnquiryButtonsProps) {
  const pad = size === "sm" ? "px-3.5 py-2 text-xs" : "px-5 py-2.5 text-sm";
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

  const whatsappClass =
    variant === "solid"
      ? `${base} ${pad} bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground`
      : `${base} ${pad} border border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground`;

  const phoneClass =
    variant === "solid"
      ? `${base} ${pad} bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground`
      : `${base} ${pad} border border-primary/30 text-primary hover:border-accent hover:text-accent`;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <a
        href={buildWhatsAppLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="enquiry.whatsapp_button"
        className={whatsappClass}
        aria-label={
          product
            ? `Enquire about ${product.name} on WhatsApp`
            : "Enquire on WhatsApp"
        }
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp Enquiry
      </a>
      <a
        href={buildPhoneLink()}
        data-ocid="enquiry.phone_button"
        className={phoneClass}
        aria-label={`Call ${formatPhoneNumber()}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Phone Enquiry
      </a>
    </div>
  );
}

import type { Product } from "@/backend";

/** Business contact details — the single source of truth for enquiry actions. */
export const BUSINESS_NAME = "Mathrushree Enterprises";
export const PHONE_NUMBER = "7975948750";
export const WHATSAPP_NUMBER = "917975948750";

/**
 * Build a WhatsApp deep link. When a product is supplied the pre-filled
 * message names the product and its SKU so the owner knows exactly what the
 * enquiry is about; otherwise a plain catalogue enquiry message is used.
 */
export function buildWhatsAppLink(
  product?: Pick<Product, "name" | "sku">,
): string {
  const message = product
    ? `Hello ${BUSINESS_NAME}, I would like to enquire about "${product.name}" (SKU: ${product.sku}).`
    : `Hello ${BUSINESS_NAME}, I would like to make an enquiry about your catalogue.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Build a tel: link for the business phone number. */
export function buildPhoneLink(): string {
  return `tel:+91${PHONE_NUMBER}`;
}

/** Human-readable phone number for display. */
export function formatPhoneNumber(): string {
  return `+91 ${PHONE_NUMBER}`;
}

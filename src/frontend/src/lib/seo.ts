import { useEffect } from "react";

const SITE_NAME = "Mathrushree Enterprises";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Set the document title and description for a page, keeping the
 * social-sharing meta tags consistent with the visible page metadata.
 */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
  }, [title, description]);
}

/** Imperative variant for non-component call sites. */
export function setSeo(title: string, description: string) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  document.title = fullTitle;
  setMetaTag("name", "description", description);
  setMetaTag("property", "og:title", fullTitle);
  setMetaTag("property", "og:description", description);
}

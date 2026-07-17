import { useEffect } from "react";
import { APP_NAME, APP_DESCRIPTION } from "@/constants";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export function SEOHead({
  title,
  description = APP_DESCRIPTION,
  path = "/",
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${APP_NAME}`
      : APP_NAME;

    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        "href",
        `${window.location.origin}${path}`
      );
    }
  }, [title, description, path]);

  return null;
}

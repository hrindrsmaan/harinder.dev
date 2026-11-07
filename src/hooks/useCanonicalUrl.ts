import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://harinder.dev";

// Every route needs an entry here, or it canonicalizes to the site root.
const canonicalUrls: Record<string, string> = {
  "/": BASE_URL,
};

export const useCanonicalUrl = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = canonicalUrls[location.pathname] ?? BASE_URL;

    // Remove existing canonical link if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Create and add new canonical link
    const canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    canonicalLink.href = canonicalUrl;
    document.head.appendChild(canonicalLink);

    // Cleanup function to remove the canonical link when component unmounts
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.remove();
      }
    };
  }, [location.pathname]);
};

// Component wrapper for useCanonicalUrl hook
export const CanonicalUrlManager = () => {
  useCanonicalUrl();
  return null;
};

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCanonicalUrl = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = "https://harinder.dev";
    let canonicalUrl: string;

    // Set canonical URL based on current route
    switch (location.pathname) {
      case "/js-compiler":
        canonicalUrl = `${baseUrl}/js-compiler`;
        break;
      case "/":
      default:
        canonicalUrl = baseUrl;
        break;
    }

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

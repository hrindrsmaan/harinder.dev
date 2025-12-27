// Analytics utility to conditionally load Google Analytics based on IP address

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const BLOCKED_IP = "173.35.162.117";

// Function to get client IP address
export const getClientIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn("Could not fetch client IP:", error);
    return null;
  }
};

// Function to check if analytics should be loaded
export const shouldLoadAnalytics = async (): Promise<boolean> => {
  const clientIP = await getClientIP();

  if (!clientIP) {
    // If we can't determine IP, default to loading analytics
    return true;
  }

  // Don't load analytics for the specified IP
  return clientIP !== BLOCKED_IP;
};

// Function to initialize Google Analytics
export const initializeAnalytics = async (
  trackingId: string
): Promise<void> => {
  const shouldLoad = await shouldLoadAnalytics();

  if (!shouldLoad) {
    console.log("Analytics disabled for IP:", BLOCKED_IP);
    return;
  }

  // Load Google Analytics script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trackingId}');
  `;
  document.head.appendChild(script2);

  console.log("Google Analytics loaded successfully");
};

// Function to track events
export const trackEvent = (
  action: string,
  category: string = "User Interaction",
  label: string = "",
  value: number = 0
): void => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

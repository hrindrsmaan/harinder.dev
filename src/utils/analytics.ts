const BLOCKED_IP = "173.35.162.117";

const getClientIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn("Could not fetch client IP:", error);
    return null;
  }
};

const shouldLoadAnalytics = async (): Promise<boolean> => {
  const clientIP = await getClientIP();

  if (!clientIP) {
    return true;
  }

  return clientIP !== BLOCKED_IP;
};

export const initializeAnalytics = async (
  trackingId: string
): Promise<void> => {
  const shouldLoad = await shouldLoadAnalytics();

  if (!shouldLoad) {
    console.log("Analytics disabled for IP:", BLOCKED_IP);
    return;
  }

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

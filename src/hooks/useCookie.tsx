"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Typ
interface CookieConsentContextType {
  consent: boolean | null;
  setConsent: (value: boolean) => void;
}

// Context
const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    setConsentState(
      stored === "true" ? true : stored === "false" ? false : null
    );
  }, []);

  const setConsent = (value: boolean) => {
    localStorage.setItem("cookie_consent", String(value));
    setConsentState(value);
    // updateHtmlConsentAttribute(value);
    if (value === true) injectGTM();
    console.log(value);
  };

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

// Hook
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context)
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  return context;
}



// helper: dynamicznie wstrzykuje GTM
export function injectGTM() {
  if (document.getElementById("gtm-script")) return; // unikamy duplikatu

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KP7FHG3C');
  `;
  document.head.appendChild(script);

  // noscript fallback
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP7FHG3C"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;
  document.body.prepend(noscript);
}

export function updateHtmlConsentAttribute(consent: boolean | null) {
  if (typeof document === "undefined") return;

  if (consent === true) {
    document.documentElement.setAttribute(
      "data-google-analytics-opt-out",
      "false"
    );
  } else if (consent === false) {
    document.documentElement.setAttribute(
      "data-google-analytics-opt-out",
      "true"
    );
  } else {
    document.documentElement.setAttribute("data-google-analytics-opt-out", "");
  }
}
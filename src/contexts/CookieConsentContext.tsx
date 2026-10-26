"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
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

// The consent lives in localStorage, read through useSyncExternalStore: the server and the hydration render get
// null (getServerSnapshot), the next render the stored value, so the markup still matches the server HTML
const consentListeners = new Set<() => void>();

function subscribeConsent(listener: () => void) {
  consentListeners.add(listener);
  return () => {
    consentListeners.delete(listener);
  };
}

function getConsentSnapshot(): boolean | null {
  const stored = localStorage.getItem("cookie_consent");
  return stored === "true" ? true : stored === "false" ? false : null;
}

function getServerConsentSnapshot(): boolean | null {
  return null;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const setConsent = (value: boolean) => {
    localStorage.setItem("cookie_consent", String(value));
    consentListeners.forEach((listener) => listener());
    // updateHtmlConsentAttribute(value);
    if (value === true) injectGTM();
    console.log(value);
  };

  return (
    <CookieConsentContext value={{ consent, setConsent }}>
      {children}
    </CookieConsentContext>
  );
}

// Hook
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context)
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
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
      "false",
    );
  } else if (consent === false) {
    document.documentElement.setAttribute(
      "data-google-analytics-opt-out",
      "true",
    );
  } else {
    document.documentElement.setAttribute("data-google-analytics-opt-out", "");
  }
}

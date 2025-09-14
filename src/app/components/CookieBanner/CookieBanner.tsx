"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import Link from "next/link";
import styles from "./CookieBanner.module.scss";
import { Button } from "@/components/Button/Button";

// helper: aktualizuje <html data-google-analytics-opt-out="...">
function updateHtmlConsentAttribute(consent: boolean | null) {
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

// helper: dynamicznie wstrzykuje GTM
function injectGTM() {
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

// CookieBanner component
export function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage, GTM status and <html> attribute when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
      updateHtmlConsentAttribute(cookieConsent);

      if (cookieConsent === true) {
        injectGTM(); // tylko przy akceptacji
      }
    }
    injectGTM();
  }, [cookieConsent]);

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null;
  }

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.cookieBanner__wrapper}>
        <div className={styles.cookieBanner__text}>
          <p>
            Serwis wykorzystuje pliki cookies. Korzystając ze strony wyrażasz
            zgodę na wykorzystywanie plików cookies. Więcej informacji
            znajdziesz w naszej:
          </p>
          <Link href="/regulaminy/polityka-prywatnosci">
            polityce prywatności
          </Link>
          <Link href="/regulaminy/polityka-cookies">
            polityce plików cookie
          </Link>
        </div>

        <div className={styles.cookieBanner__buttons}>
          <Button type="button" onClick={() => setCookieConsent(false)}>
            Odrzuć
          </Button>
          <Button type="button" onClick={() => setCookieConsent(true)}>
            Zaakceptuj
          </Button>
        </div>
      </div>
    </div>
  );
}

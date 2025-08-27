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
    ); // zgoda → opt-out = false
  } else if (consent === false) {
    document.documentElement.setAttribute(
      "data-google-analytics-opt-out",
      "true"
    ); // brak zgody → opt-out = true
  } else {
    document.documentElement.setAttribute("data-google-analytics-opt-out", "");
  }
}

// CookieBanner component that displays a banner for cookie consent.
export function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage, GA consent status and <html> attribute when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);

      const newValue = cookieConsent ? "granted" : "denied";

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: newValue,
        });
      }

      updateHtmlConsentAttribute(cookieConsent);
    }
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

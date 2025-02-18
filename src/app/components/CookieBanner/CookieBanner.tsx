"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import Link from "next/link";
import styles from "./CookieBanner.module.scss";
import { Button } from "@/components/Button/Button";

// CookieBanner component that displays a banner for cookie consent.
export  function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage and Google Analytics consent status when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
    }

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
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

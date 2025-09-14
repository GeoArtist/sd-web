"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import Link from "next/link";
import styles from "./CookieBanner.module.scss";
import { Button } from "@/components/Button/Button";
import {
  updateHtmlConsentAttribute,
  useCookieConsent,
} from "@/hooks/useCookie";
import { injectGTM } from "@/hooks/useCookie";
// CookieBanner component
export function CookieBanner() {
  const { consent, setConsent } = useCookieConsent();
  useEffect(() => {
    if (consent === true) {
      injectGTM(); // wstrzyknięcie GTM dopiero jeśli zgoda istnieje
      // updateHtmlConsentAttribute(consent);
    }
  }, [consent]);

  // Do not render the banner if loading or consent is already given
  if (consent !== null) return null; // już zaakceptowano/odrzucono
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
          <Button type="button" onClick={() => setConsent(false)}>
            Odrzuć
          </Button>
          <Button type="button" onClick={() => setConsent(true)}>
            Zaakceptuj
          </Button>
        </div>
      </div>
    </div>
  );
}

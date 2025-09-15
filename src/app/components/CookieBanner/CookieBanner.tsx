"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.scss";
import { Button } from "@/components/Button/Button";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { injectGTM } from "@/contexts/CookieConsentContext";

// CookieBanner component
export function CookieBanner() {
  const { consent, setConsent } = useCookieConsent();
  useEffect(() => {
    if (consent === true) {
      injectGTM(); // inject GTM only if consent exists
    }
  }, [consent]);

  // Do not render the banner if loading or consent is already given
  if (consent !== null) return null; // already accepted or rejected
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

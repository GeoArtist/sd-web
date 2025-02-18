import React from "react";

import { FooterLinks } from "@/components/FooterLinks/FooterLinks";
import { VersionTag } from "@/components/VersionTag/VersionTag";

import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <FooterLinks />
        <VersionTag />
      </footer>
    </>
  );
}

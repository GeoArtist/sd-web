'use client'
import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/feather_white.svg";
import { regulations } from "@/constants/regulations";
import { socialLinks } from "@/constants/socialLinks";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import styles from "./FooterLinks.module.scss";

export function FooterLinks() {
  const year = new Date().getFullYear();
  const currentPath = useCurrentPath();
  return (
    <>
        <div className={styles.footer__wrapper}>
          <section className={styles.footer__card}>
            <Link href="/" prefetch={false}>
              <Image className={styles.footer__logo} src={logo} alt="logo" />
            </Link>
            <Link href="/" prefetch={false}>
              SOFT-DATA
            </Link>
            <p> © {year}</p>
          </section>
          <section className={styles.footer__links}>
            <Link
              href="/kontakt"
              className={`${styles.footer__link} ${
                currentPath === "/kontakt" ? styles.active : ""
              }`}
              prefetch={false}
            >
              Kontakt
            </Link>
            {regulations.map((regulation, index) => {
              return (
                <Fragment key={index}>
                  <Link
                    href={`/regulaminy/${regulation.path}`}
                    className={`${styles.footer__link} ${
                      currentPath === `/regulaminy/${regulation.path}`
                        ? styles.active
                        : ""
                    }`}
                    prefetch={false}
                  >
                    {regulation.navName}
                  </Link>
                </Fragment>
              );
            })}
          </section>
          <section className={styles.footer__socials}>
            {socialLinks.map((socialLink) => (
              <Link
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                key={socialLink.url}
              >
                <Image src={socialLink.icon} alt={socialLink.alt} />
              </Link>
            ))}
          </section>
        </div>
    </>
  );
}
   


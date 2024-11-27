'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Funkcja sprawdzająca szerokość okna
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize(); // Sprawdzanie podczas ładowania komponentu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobileContainer}>
          <button
            className={styles.hamburger}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          {isSidebarOpen && (
            <div className={styles.sidebar}>
              <button
                className={styles.closeButton}
                onClick={() => setIsSidebarOpen(false)}
              >
                ✖
              </button>
              <ul className={styles.sidebarLinks}>
                <li><a href="/">Strona domowa</a></li>
                <li><a href="/about">O nas</a></li>
                <li><a href="/contact">Kontakt</a></li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <nav className={styles.navbar}>
          <ul className={styles.navLinks}>
            <li><a href="/">Strona domowa</a></li>
            <li><a href="/about">O nas</a></li>
            <li><a href="/contact">Kontakt</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;


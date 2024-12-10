'use client'
import Link from "next/link";
import Button from "./components/Button/Button";
import styles from "./page.module.scss";
import { redirect } from "next/navigation";

export default function NotFound() {

  const goToMain = () => {
    redirect('/')
  }

  return <>
   <div className={styles.notFound}>
      <h1>Strony nie znaleziono</h1>
      <Button type="button" onClick={goToMain}>Powrót do strony głównej</Button>

    </div>
  </>
}
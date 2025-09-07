"use client";
import { Button } from "@/components/Button/Button";
import styles from "./page.module.scss";
import { redirect } from "next/navigation";

export default function NotFound() {
  const goToMain = () => {
    redirect("/blog");
  };

  return (
    <>
      <div className={styles.notFound}>
        <h1>Wpisu nie znaleziono</h1>
        <Button type="button" onClick={goToMain}>
          Powrót do bloga
        </Button>
      </div>
    </>
  );
}

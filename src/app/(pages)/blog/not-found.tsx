"use client";
import { Button } from "@/components/Button/Button";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { blogPageHref } from "@/constants/blog";

export default function NotFound() {
  const router = useRouter();
  const goToMain = () => {
    router.push(blogPageHref(1));
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

"use client";
import { Button } from "@/components/Button/Button";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  // redirect() is meant for render/server code; event handlers navigate with the router
  const goToMain = () => {
    router.push("/blog");
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

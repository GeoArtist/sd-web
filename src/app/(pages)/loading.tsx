import {Loader} from "@/components/Loader/Loader";
import styles from "./page.module.scss";
export default function Loading() {
  return (
    <>
      <div className={styles.loader}>
        <Loader />
      </div>
    </>
  );
}

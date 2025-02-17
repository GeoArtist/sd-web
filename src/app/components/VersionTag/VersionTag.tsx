import styles from "./VersionTag.module.scss";

export async function VersionTag() {
  return (
    <div className={styles.footer__version}>
      <p>{process.env.NEXT_PUBLIC_APP_VERSION}</p>
    </div>
  );
}

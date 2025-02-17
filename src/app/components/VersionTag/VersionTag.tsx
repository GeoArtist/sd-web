// pages/index.js
import fs from "fs";
import path from "path";

import styles from "./VersionTag.module.scss";

export async function VersionTag() {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8")
  );

  // Odczytaj wersję
  const version = packageJson.version;

  return (
    <div className={styles.footer__version}>
      <p>{version}</p>
    </div>
  );
}

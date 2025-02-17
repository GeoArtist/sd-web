import fs from "fs";
import path from "path";
import { Tag } from "@/types/gitTags";
import styles from "./VersionTag.module.scss";

const TAG_FILE_PATH = path.join(process.cwd(),"src", "constants", "tags.json");


async function getTagFromFile(): Promise<Tag | null> {

  if (fs.existsSync(TAG_FILE_PATH)) {
    const data = fs.readFileSync(TAG_FILE_PATH, "utf-8");
    console.log(data);
    return JSON.parse(data);
  }
  return null;
}

export  async function VersionTag() {
  const tag = await getTagFromFile();

  return (
    <div className = {styles.footer__version}>
      {tag ? (
        <p>
          {tag.tag}
        </p>
      ) : null}
    </div>
  );
}
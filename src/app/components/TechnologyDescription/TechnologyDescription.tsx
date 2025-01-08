import styles from "./TechnologyDescription.module.scss";

import InfitnieHorizontalScroll from "@/components/InfitnieHorizontalScroll/InfitnieHorizontalScroll";
import {
  imgsTechData,
  imgsTechDb,
  imgsTechGeo,
  imgsTechTech,
  imgsTechWeb,
} from "@/constants/InfiniteScrollImgs";
import { ImgsLinks } from "@/types/imgsLinks";

export function TechnologyDescription() {
  const wheelToImgsMap: { [key: string]: ImgsLinks[] } = {
    Geodezja: imgsTechGeo,
    "Bazy Danych": imgsTechDb,
    "Analiza i Przetwarzanie Danych": imgsTechData,
    Wizualizacje: imgsTechWeb,
    Narzędzia: imgsTechTech,
  };
  return (
    <>
      <div className={styles.technologyDescription}>
        {Object.entries(wheelToImgsMap).map(([title, imgs]) => (
          <>
            <h2>{title}</h2>
            <InfitnieHorizontalScroll imgs={imgs} />
            <hr />
          </>
        ))}
      </div>
    </>
  );
}

import styles from "./TechnologyDescription.module.scss";

import { InfitnieHorizontalScroll } from "@/components/InfitnieHorizontalScroll/InfitnieHorizontalScroll";
import {
  imgsTechData,
  imgsTechDb,
  imgsTechGeo,
  imgsTechTech,
  imgsTechWeb,
  imgsTechAi,
} from "@/constants/InfiniteScrollImgs";
import { ImgsLinks } from "@/types/imgsLinks";
import { Fragment } from "react";

export function TechnologyDescription() {
  const wheelToImgsMap: { [key: string]: ImgsLinks[] } = {
    AI: imgsTechAi,
    Narzędzia: imgsTechTech,
    Wizualizacje: imgsTechWeb,
    "Analiza i Przetwarzanie Danych": imgsTechData,
    "Bazy Danych": imgsTechDb,
    Geodezja: imgsTechGeo,
  };
  return (
    <>
      <div className={styles.technologyDescription}>
        {Object.entries(wheelToImgsMap).map(([title, imgs]) => (
          <Fragment key={title}>
            <h2>{title}</h2>
            <InfitnieHorizontalScroll imgs={imgs} />
            <hr />
          </Fragment>
        ))}
      </div>
    </>
  );
}

import rtk1 from "@/public/images/carousel/rtk-1-min.jpg";
// import map from '@/public/images/carousel/map-min.jpg'
// import rtk2 from '@/public/images/carousel/rtk-2-min.jpg'
// import rtk3 from '@/public/images/carousel/rtk-3-min.jpg'
// import osm from '@/public/images/carousel/osm-min.jpg'
import bdot from "@/public/images/carousel/bdot_cut-min.jpg";
import code from "@/public/images/carousel/code-min.jpg";
import dashboard from "@/public/images/carousel/dashboard-min.jpg";
import db from "@/public/images/carousel/db-min.jpg";
import pointcloud from "@/public/images/carousel/pointcloud-min.jpg";
import slope from "@/public/images/carousel/slope-min.jpg";
import { ImgsLinks } from "@/types/imgsLinks";

export const carouselImgs: ImgsLinks[] = [
  // {
  //     url: map,
  //     alt: 'traditional-map-example'
  // },

  {
    url: rtk1,
    alt: "RTK sprzęt w terenie",
    priority: false,
  },
  {
    url: slope,
    alt: "mapa nachylenia terenu",
    priority: false,
  },
  {
    url: code,
    alt: "widok edytora kodu",
    priority: false,
  },
  {
    url: db,
    alt: "schemat bazy danych",
    priority: false,
  },
  {
    url: dashboard,
    alt: "widok dashboardu",
    priority: false,
  },
  {
    url: bdot,
    alt: "wizualizacja bazy danych obiektów topograficznych",
    priority: false,
  },
  {
    url: pointcloud,
    alt: "widok chmury punktów 3D",
    priority: false,
  },
];

import rtk1 from "@/public/images/carousel/rtk-1.jpg";
// import map from '@/public/images/carousel/map.jpg'
// import rtk2 from '@/public/images/carousel/rtk-2.jpg'
// import rtk3 from '@/public/images/carousel/rtk-3.jpg'
// import osm from '@/public/images/carousel/osm.jpg'
import bdot from "@/public/images/carousel/bdot_cut.jpg";
import code from "@/public/images/carousel/code.jpg";
import dashboard from "@/public/images/carousel/dashboard.jpg";
import db from "@/public/images/carousel/db.jpg";
import pointcloud from "@/public/images/carousel/pointcloud.jpg";
import slope from "@/public/images/carousel/slope.jpg";
import { ImgsLinks } from "@/types/imgsLinks";

export const carouselImgs: ImgsLinks[] = [
  // {
  //     url: map,
  //     alt: 'traditional-map-example'
  // },

  {
    url: rtk1,
    alt: "rtk1-example",
    priority: false,
  },
  {
    url: slope,
    alt: "slope-map-example",
    priority: false,
  },
  {
    url: code,
    alt: "code-example",
    priority: false,
  },
  {
    url: db,
    alt: "database-example",
    priority: false,
  },
  {
    url: dashboard,
    alt: "dashboard-example",
    priority: false,
  },
  {
    url: bdot,
    alt: "bdot-example",
    priority: false,
  },
  {
    url: pointcloud,
    alt: "point-cloud-example",
    priority: false,
  },
];

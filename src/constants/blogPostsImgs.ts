import { BlogPostImg } from "@/types/blogPost";

import watershedanalsis from "@/public/images/blog/thumbnails/watershed-analsis-thumbnail.jpg";
import dtmUsage from "@/public/images/blog/thumbnails/dtm-usage-thumbnail.jpg";
import dtmDsmNdsm from "@/public/images/blog/thumbnails/dtm-dsm-ndsm-thumbnail.jpg";
import vegetationIndexes from "@/public/images/blog/thumbnails/vegetation-indexes-thumbnail.jpg";
import orthophotomap from "@/public/images/blog/thumbnails/orthophotomap-thumbnail.jpg";
import aiBuilding from "@/public/images/blog/thumbnails/ai-building-thumbnail.jpg";

export const blogPostsImgs: BlogPostImg[] = [
  {
    postId: 1,
    url: watershedanalsis,
    alt: "watershed analysis thumbnail",
    type: "thumbnail",
  },
  {
    postId: 2,
    url: dtmUsage,
    alt: "dtm usage examples thumbnail",
    type: "thumbnail",
  },
  {
    postId: 3,
    url: dtmDsmNdsm,
    alt: "dtm dsm ndsm thumbnail",
    type: "thumbnail",
  },
  {
    postId: 4,
    url: orthophotomap,
    alt: "orthophotomap RGB and NIR thumbnail",
    type: "thumbnail",
  },
  {
    postId: 5,
    url: vegetationIndexes,
    alt: "vegetation indexes thumbnail",
    type: "thumbnail",
  },
  {
    postId: 6,
    url: aiBuilding,
    alt: "automatic ai building detection thumbnail",
    type: "thumbnail",
  },
];
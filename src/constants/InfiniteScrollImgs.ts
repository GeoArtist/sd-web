import { ImgsLinks } from '@/types/imgsLinks'

import gdalLogo from '@/public/logos/technology/data/gdal-logo.svg'
import pandasLogo from '@/public/logos/technology/data/pandas-logo.png'
import geopandasLogo from '@/public/logos/technology/data/geopandas_logo.png'
import sagaGisLogo from '@/public/logos/technology/data/saga-gis-logo.png'
import numpyLogo from '@/public/logos/technology/data/numpy-logo.png'
import scikitlearnLogo from '@/public/logos/technology/data/scikitlearn-logo.png'
import tensorflowLogo from '@/public/logos/technology/data/tensorflow-logo.png'

export const imgsTechData: ImgsLinks[] = [
  {
    url: gdalLogo,
    alt: "gdal-logo",
    priority: false,
    href: "https://gdal.org/en/stable/",
  },
  {
    url: pandasLogo,
    alt: "pandas-logo",
    priority: false,
    href: "https://pandas.pydata.org/",
  },
  {
    url: geopandasLogo,
    alt: "geopandas_logo",
    priority: false,
    href: "https://geopandas.org/",
  },
  {
    url: sagaGisLogo,
    alt: "saga-gis-logo",
    priority: false,
    href: "https://www.saga-gis.org/en/index.html",
  },
  {
    url: numpyLogo,
    alt: "numpy-logo",
    priority: false,
    href: "https://numpy.org/",
  },
  {
    url: scikitlearnLogo,
    alt: "scikitlearn-logo",
    priority: false,
    href: "https://scikit-learn.org/stable/",
  },
  {
    url: tensorflowLogo,
    alt: "tensorflow-logo",
    priority: false,
    href: "https://www.tensorflow.org/",
  },
];

import influxLogo from "@/public/logos/technology/db/influx-logo.svg";
import mongodbLogo from "@/public/logos/technology/db/mongodb-logo.svg";
import postgisLogo from "@/public/logos/technology/db/postgis_logo.png";
import postgresLogo from "@/public/logos/technology/db/postgres_logo.png";
import redisLogo from "@/public/logos/technology/db/regis-logo.png";
import sqlLogo from "@/public/logos/technology/db/sql-logo.jpg";

export const imgsTechDb: ImgsLinks[] = [
  {
    url: sqlLogo,
    alt: "sql logo",
    priority: false,
    href: "https://www.w3schools.com/sql/sql_intro.asp",
  },
  {
    url: postgresLogo,
    alt: "postgres logo",
    priority: false,
    href: "https://www.postgresql.org/",
  },
  {
    url: postgisLogo,
    alt: "postgis logo",
    priority: false,
    href: "https://postgis.net/",
  },
  {
    url: redisLogo,
    alt: "redis logo",
    priority: false,
    href: "https://redis.io/",
  },
  {
    url: influxLogo,
    alt: "influx logo",
    priority: false,
    href: "https://www.influxdata.com/",
  },
  {
    url: mongodbLogo,
    alt: "mongodb logo",
    priority: false,
    href: "https://www.mongodb.com/",
  },
];

import ewmapaLogo from "@/public/logos/technology/geo/ewmapa.logo.png";
import turbomapLogo from "@/public/logos/technology/geo/turbomap-logo.png";
import cgmlLogo from "@/public/logos/technology/geo/cgml-logo.png";
import coderLogo from "@/public/logos/technology/geo/coder-logo.png";
import autocadLogo from "@/public/logos/technology/geo/autocad-logo.png";
import qgisLogo from "@/public/logos/technology/geo/qgis-logo.svg";

export const imgsTechGeo: ImgsLinks[] = [
  {
    url: ewmapaLogo,
    alt: "ewmapa logo",
    priority: false,
    href: "https://geobid.pl/",
  },
  {
    url: turbomapLogo,
    alt: "turbomap logo",
    priority: false,
    href: "https://geomatyka-krakow.pl/portal/index.php/oprogramowanie/13-turbomap",
  },
  {
    url: cgmlLogo,
    alt: "cgml logo",
    priority: false,
    href: "https://softline.geo.pl/index.php/oferta?view=article&id=22&catid=8",
  },
  {
    url: coderLogo,
    alt: "coder logo",
    priority: false,
    href: "https://www.coder.pl",
  },
  {
    url: autocadLogo,
    alt: "autocad logo",
    priority: false,
    href: "https://www.autodesk.com/products/autocad/overview",
  },
  {
    url: qgisLogo,
    alt: "qgis logo",
    priority: false,
    href: "https://www.qgis.org/",
  },
];

import gitLogo from "@/public/logos/technology/tech/git-logo.svg";
import jiraLogo from "@/public/logos/technology/tech/jira-logo.png";
import linuxLogo from "@/public/logos/technology/tech/linux-logo.png";
import nodeLogo from "@/public/logos/technology/tech/node-logo.png";
import psLogo from "@/public/logos/technology/tech/ps-logo.png";
import vscLogo from "@/public/logos/technology/tech/vsc-logo.svg";

export const imgsTechTech: ImgsLinks[] = [
  {
    url: gitLogo,
    alt: "git logo",
    priority: false,
    href: "https://git-scm.com/",
  },
  {
    url: vscLogo,
    alt: "vsc logo",
    priority: false,
    href: "https://code.visualstudio.com/",
  },
  {
    url: jiraLogo,
    alt: "jira logo",
    priority: false,
    href: "https://www.atlassian.com/software/jira",
  },
  {
    url: nodeLogo,
    alt: "node logo",
    priority: false,
    href: "https://nodejs.org/en/",
  },
  {
    url: linuxLogo,
    alt: "linux logo",
    priority: false,
    href: "https://www.linux.org/",
  },
  {
    url: psLogo,
    alt: "ps logo",
    priority: false,
    href: "https://www.adobe.com/pl/products/photoshop.html#modal-hash",
  },
];

import cssLogo from "@/public/logos/technology/web/css-logo.png";
import dashLogo from "@/public/logos/technology/web/dash-logo.png";
import djangoLogo from "@/public/logos/technology/web/django-logo.png";
import fastapiLogo from "@/public/logos/technology/web/fastapi-logo.png";
import flaskLogo from "@/public/logos/technology/web/flask-logo.png";
import geoserverLogo from "@/public/logos/technology/web/geoserver-logo.png";
import jsTsLogo from "@/public/logos/technology/web/js-ts-logo.jpg";
import leafletLogo from "@/public/logos/technology/web/leaflet-logo.png";
import nextJsLogo from "@/public/logos/technology/web/next-js-seeklogo.svg";
import streamlitLogo from "@/public/logos/technology/web/streamlit-logo.png";

export const imgsTechWeb: ImgsLinks[] = [
  {
    url: cssLogo,
    alt: "css logo",
    priority: false,
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    url: jsTsLogo,
    alt: "js-ts logo",
    priority: false,
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    url: nextJsLogo,
    alt: "next-js logo",
    priority: false,
    href: "https://nextjs.org/",
  },
  {
    url: dashLogo,
    alt: "dash logo",
    priority: false,
    href: "https://dash.plotly.com/",
  },
  {
    url: djangoLogo,
    alt: "django logo",
    priority: false,
    href: "https://www.djangoproject.com/",
  },
  {
    url: flaskLogo,
    alt: "flask logo",
    priority: false,
    href: "https://flask.palletsprojects.com/en/2.0.x/",
  },
  {
    url: streamlitLogo,
    alt: "streamlit logo",
    priority: false,
    href: "https://streamlit.io/",
  },
  {
    url: fastapiLogo,
    alt: "fastapi logo",
    priority: false,
    href: "https://fastapi.tiangolo.com/",
  },
  {
    url: leafletLogo,
    alt: "leaflet logo",
    priority: false,
    href: "https://leafletjs.com/",
  },
  {
    url: geoserverLogo,
    alt: "geoserver logo",
    priority: false,
    href: "https://geoserver.org/",
  },
];
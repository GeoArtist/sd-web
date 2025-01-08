import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngExpression } from "leaflet";
import feather from "@/public/icons/feather.svg";

import styles from "./ContactMap.module.scss";

const homePosition: LatLngExpression = [53.7487, 20.51345];
const sizeMarkerIcon = 50;
const IconMarker = icon({
  iconUrl: feather.src,
  iconSize: [sizeMarkerIcon, sizeMarkerIcon],
  iconAnchor: [sizeMarkerIcon / 2, sizeMarkerIcon / 2],
  popupAnchor: [0, -sizeMarkerIcon / 3],
});
const popupDescription = (
  <>
    <p className={styles.bold}>SOFT-DATA Marek Szczepkowski</p>
    <p>ul. Marii Dąbrowskiej 13/52</p>
    <p>10-685 Olsztyn</p>
    <p>tel. +48 535 154 251</p>
    <span>
      {" "}
      e-mail: <a href="mailto:kontakt@soft-data.pl">kontakt@soft-data.pl</a>
    </span>
  </>
);

export default function ContactMap() {
  return (
    <>
      <div>
        <MapContainer
          className={styles.map}
          center={homePosition}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={IconMarker} position={homePosition}>
            <Popup>{popupDescription}</Popup>
            <Tooltip
              className={styles.bold}
              direction="bottom"
              offset={[-sizeMarkerIcon / 9, sizeMarkerIcon / 3.25]}
              opacity={1}
              permanent
            >
              SOFT-DATA
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

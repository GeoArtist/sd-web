
import { MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styles from './ContactMap.module.scss'
import { icon,LatLngExpression } from "leaflet"
import email from '@/public/icons/email.svg'
import './leaflet_popup.scss'

const homePosition:LatLngExpression  = [53.74870, 20.51345]

const sizeMarkerIcon = 50
const IconMarker = icon({
    iconUrl: email.src,
    iconSize: [sizeMarkerIcon, sizeMarkerIcon],
    iconAnchor: [sizeMarkerIcon / 2, sizeMarkerIcon /2 ],
    popupAnchor: [0, -sizeMarkerIcon /4]
})
const popupDescription = <>
<span className={styles.bold}>SOFT-DATA Marek Szczepkowski</span><br/>
ul. Marii Dąbrowskiej 13/52<br/>
10-685 Olsztyn<br/><br/>
tel. +48 535 154 251<br/>
e-mail: <a href="mailto:kontakt@soft-data.pl">kontakt@soft-data.pl</a>
</>

export default  function ContactMap(){
    return <div>
        (<MapContainer className={styles.map} center={homePosition} zoom={13} scrollWheelZoom={true} >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={IconMarker} position={homePosition}>
            <Popup>{popupDescription}
            </Popup>
        </Marker>
    </MapContainer>)
    </div>

    
}
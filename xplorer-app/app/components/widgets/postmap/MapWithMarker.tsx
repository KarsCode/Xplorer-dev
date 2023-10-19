// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from "leaflet"
// import { LatLngExpression } from 'leaflet';
// import 'leaflet/dist/leaflet.css'
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // @ts-ignore
// delete L.Icon.Default.prototype._getIconUrl; 
// L.Icon.Default.mergeOptions({
//     iconUrl: markerIcon.src,
//     iconRetinaUrl: markerIcon2x.src,
//     shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   center?: number[]
// }

// const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// const MapWithMarker: React.FC<MapProps> = ({center}) => {
//   const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);

//   const handleMapClick = (e: any) => {
//     // Get the coordinates of the click event
//     const { lat, lng } = e.latlng;
//     setMarkerPosition([lat, lng]);
//   };



//   return (
//     <MapContainer
//       center={[51.505, -0.09]}
//       zoom={13}
//       style={{ height: '400px', width: '100%' }}
//       onClick={handleMapClick}
//     >
//       <TileLayer
//         url={url}
//         attribution={attribution}
//       />

//       {markerPosition && (
//         <Marker position={markerPosition}>
//           <Popup>
//             Latitude: {markerPosition[0]}<br />
//             Longitude: {markerPosition[1]}
//           </Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// };

// export default MapWithMarker;



'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState } from 'react';

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
  center: L.LatLngExpression
  passValueToParent: (value: number[]) => void;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


const Map: React.FC<MapProps> = ({ center, passValueToParent }) => {
  const [markerPosition, setMarkerPosition] = useState<L.LatLngExpression | null>(center);

  const handleMarkerDrag = (e: L.LeafletEvent) => {
    const marker = e.target;
    const markerLatLng = marker.getLatLng();
    setMarkerPosition([markerLatLng.lat, markerLatLng.lng]);

    const someVariable = [markerLatLng.lat,markerLatLng.lng];
    passValueToParent(someVariable);
  };
      return (
        <MapContainer 
          //@ts-ignore
          center={center as L.LatLngExpression || [51, -0.09]} 
          zoom={center ? 10 : 2} 
          scrollWheelZoom={true} 
          className="h-[35vh] rounded-lg"
        >
          <TileLayer
            url={url}
            //@ts-ignore
            attribution={attribution}
          />
          {center && (
            <Marker 
              position={center as L.LatLngExpression}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDrag
              }}


            
            />
          )}

    
        </MapContainer>
      );
}

export default Map;
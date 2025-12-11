"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Helper component to handle map clicks
function LocationMarker({ setPosition, position, onChange }) {
   const map = useMapEvents({
      click(e) {
         const { lat, lng } = e.latlng;
         setPosition(e.latlng);
         if (onChange) {
            onChange({ lat, lng });
         }
         map.flyTo(e.latlng, map.getZoom());
      },
   });

   return position === null ? null : <Marker position={position}></Marker>;
}

export default function MapPickerLeaflet({ onChange }) {
   const [position, setPosition] = useState(null);

   // Fix for Leaflet icon issues in Next.js
   useEffect(() => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
         iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
         iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
         shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
   }, []);

   return (
      <div className="w-full">
         <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
               center={[39.0, 35.0]}
               zoom={6}
               scrollWheelZoom={true}
               style={{ height: "100%", width: "100%" }}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <LocationMarker setPosition={setPosition} position={position} onChange={onChange} />
            </MapContainer>
         </div>
         
      </div>
   );
}

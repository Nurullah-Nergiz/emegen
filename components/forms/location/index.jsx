"use client";

import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapPickerLeaflet = dynamic(() => import("./map-picker"), {
   ssr: false,
   loading: () => <p>Loading Map...</p>,
});

export default function FormsLocation({ onChange }) {
   return <MapPickerLeaflet onChange={onChange} />;
}

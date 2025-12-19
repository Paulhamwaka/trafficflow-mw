'use client';

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  lang: 'en' | 'ch';
}

export default function MapComponent({ lang }: Props) {
  const promptText = lang === 'en' 
    ? 'Type: police / accident / congestion / clear' 
    : 'Lemani: apolisi / ngozi / kuchulukana / yoyera';

  useMapEvents({
    click(e) {
      const type = prompt(promptText)?.toLowerCase().trim();
      if (type) {
        alert(`Report saved: ${type} at (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})\nReal database coming soon!`);
      }
    }
  });

  return (
    <MapContainer center={[-13.9626, 33.7741]} zoom={12} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
        }

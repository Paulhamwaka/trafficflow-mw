'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const useMapEvents = dynamic(() => import('react-leaflet').then(mod => mod.useMapEvents), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ch'>('en');

  const t = lang === 'en' ? {
    title: 'TrafficFlow MW',
    instruction: 'Tap the map to report police, accident, or congestion',
    prompt: 'Type: police / accident / congestion / clear',
    button: 'Chichewa'
  } : {
    title: 'TrafficFlow MW',
    instruction: 'Dinani pamapu kuti munene apolisi, ngozi, kapena kuchulukana',
    prompt: 'Lemani: apolisi / ngozi / kuchulukana / yoyera',
    button: 'English'
  };

  function ReportMarker() {
    useMapEvents({
      click(e) {
        const type = prompt(t.prompt)?.toLowerCase().trim();
        if (!type) return;
        alert(`Report saved: ${type} at this location (database coming soon)`);
      }
    });
    return null;
  }

  return (
    <div className="h-screen relative">
      <button
        onClick={() => setLang(lang === 'en' ? 'ch' : 'en')}
        className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {t.button}
      </button>

      <MapContainer center={[-13.9626, 33.7741]} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ReportMarker />
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-lg">{t.instruction}</p>
      </div>
    </div>
  );
}

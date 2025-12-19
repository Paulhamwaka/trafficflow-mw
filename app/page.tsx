
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Keep CSS here (safe)

const DynamicMap = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center text-2xl">Loading map...</div>
});

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ch'>('en');

  const t = lang === 'en' ? {
    title: 'TrafficFlow MW',
    instruction: 'Tap the map to report police, accident, or congestion',
    button: 'Chichewa'
  } : {
    title: 'TrafficFlow MW',
    instruction: 'Dinani pamapu kuti munene apolisi, ngozi, kapena kuchulukana',
    button: 'English'
  };

  return (
    <div className="h-screen relative">
      <button
        onClick={() => setLang(lang === 'en' ? 'ch' : 'en')}
        className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {t.button}
      </button>

      <DynamicMap lang={lang} />

      <div className="absolute bottom-4 left-4 bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-lg">{t.instruction}</p>
      </div>
    </div>
  );
      }

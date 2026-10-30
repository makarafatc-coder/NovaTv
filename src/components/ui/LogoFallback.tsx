import { useState } from 'react';

export function LogoFallback({ src, name }: { src: string | null, name: string }) {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return (
      <div className="w-full h-full min-h-[80px] bg-white/5 rounded-xl flex items-center justify-center text-2xl font-bold text-brand">
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  
  return <img src={src} alt={name} onError={() => setError(true)} className="w-full h-full object-contain p-2" loading="lazy" />;
}
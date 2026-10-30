import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LogoFallback } from '../ui/LogoFallback';

export function PlayerOverlay({ channel }: { channel: any }) {
  const navigate = useNavigate();
  
  if (!channel) return null;
  
  return (
    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between z-10 pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black/50 rounded-lg overflow-hidden">
            <LogoFallback src={channel.logo_url} name={channel.name} />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm md:text-base">{channel.name}</h2>
            <p className="text-brand text-xs">{channel.group_title}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pointer-events-auto">
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition">
          <Heart className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition">
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
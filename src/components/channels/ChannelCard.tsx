import { Link } from 'react-router-dom';
import { LogoFallback } from '../ui/LogoFallback';
import { Play } from 'lucide-react';

export function ChannelCard({ channel }: { channel: any }) {
  return (
    <Link to={`/player/${channel.id}`} className="group relative bg-surface-raised border border-white/5 rounded-2xl p-4 flex flex-col items-center hover:bg-white/5 transition-all">
      <div className="w-20 h-20 mb-3 group-hover:scale-105 transition-transform">
        <LogoFallback src={channel.logo_url} name={channel.name} />
      </div>
      <h3 className="text-sm font-medium text-white text-center line-clamp-1">{channel.name}</h3>
      <p className="text-xs text-muted mt-1">{channel.group_title}</p>
      
      <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <div className="bg-brand text-white p-3 rounded-full shadow-glow">
          <Play className="w-6 h-6 ml-1" />
        </div>
      </div>
    </Link>
  );
}
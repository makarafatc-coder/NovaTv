import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function Home() {
  const [channels, setChannels] = useState < any[] > ([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchChannels() {
      const { data } = await supabase.from('channels').select('*').limit(20);
      setChannels(data || []);
      setLoading(false);
    }
    fetchChannels();
  }, []);
  
  if (loading) return <div className="p-10 text-center animate-pulse">Loading Channels...</div>;
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-brand/20 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Welcome to NovaTV</h1>
        <p className="text-muted mb-6 max-w-md">Premium Live TV Streaming Experience. Watch your favorite channels anytime.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-brand" /> Featured Channels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {channels.map(ch => (
            <Link to={`/player/${ch.id}`} key={ch.id} className="glass rounded-xl p-4 flex flex-col items-center hover:bg-white/10 transition group">
              {ch.logo_url ? (
                <img src={ch.logo_url} alt={ch.name} className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition" />
              ) : (
                <div className="w-16 h-16 bg-white/10 rounded-full mb-3 flex items-center justify-center text-xl font-bold">{ch.name.charAt(0)}</div>
              )}
              <h3 className="text-sm font-medium text-center line-clamp-1">{ch.name}</h3>
              <p className="text-[10px] text-muted mt-1">{ch.group_title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
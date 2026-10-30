import { useState } from 'react';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/channels/ChannelCard';
import { Skeleton } from '../components/ui/Skeleton';

export default function LiveTV() {
  const { channels, loading } = useChannels();
  const [search, setSearch] = useState('');
  
  const filtered = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-display font-bold">Live TV</h1>
      <input 
        type="text" 
        placeholder="Search channels..." 
        value={search} onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
      />
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
        </div>
      )}
    </div>
  );
}
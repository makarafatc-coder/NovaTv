import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star } from 'lucide-react';
import { LogoFallback } from '../../components/ui/LogoFallback';

export default function ChannelsAdmin() {
  const [channels, setChannels] = useState < any[] > ([]);
  const [search, setSearch] = useState('');
  
  const loadChannels = async () => {
    const { data } = await supabase.from('channels').select('*').order('name').limit(100);
    setChannels(data || []);
  };
  
  useEffect(() => { loadChannels(); }, []);
  
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    await supabase.from('channels').update({ is_featured: !currentStatus }).eq('id', id);
    loadChannels();
  };
  
  const filtered = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Manage Channels</h1>
      <input 
        type="text" placeholder="Search channels..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
      />
      
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(ch => (
          <div key={ch.id} className="glass p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/50 rounded-lg p-1"><LogoFallback src={ch.logo_url} name={ch.name} /></div>
              <div>
                <p className="font-medium">{ch.name}</p>
                <p className="text-xs text-muted">{ch.group_title}</p>
              </div>
            </div>
            <button onClick={() => toggleFeatured(ch.id, ch.is_featured)} className={`p-2 rounded-lg transition ${ch.is_featured ? 'text-warning bg-warning/10' : 'text-muted hover:bg-white/5'}`}>
              <Star className="w-5 h-5" fill={ch.is_featured ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
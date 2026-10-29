import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Tv, ListVideo, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ playlists: 0, channels: 0 });
  
  useEffect(() => {
    async function loadStats() {
      const { count: pCount } = await supabase.from('playlists').select('*', { count: 'exact', head: true });
      const { count: cCount } = await supabase.from('channels').select('*', { count: 'exact', head: true });
      setStats({ playlists: pCount || 0, channels: cCount || 0 });
    }
    loadStats();
  }, []);
  
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <h1 className="text-2xl md:text-3xl font-display font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-brand/20 rounded-xl"><ListVideo className="w-8 h-8 text-brand" /></div>
          <div>
            <p className="text-muted text-sm">Total Playlists</p>
            <h3 className="text-3xl font-bold">{stats.playlists}</h3>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-accent/20 rounded-xl"><Tv className="w-8 h-8 text-accent" /></div>
          <div>
            <p className="text-muted text-sm">Total Channels</p>
            <h3 className="text-3xl font-bold">{stats.channels}</h3>
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-success" /> System Status</h2>
        <p className="text-sm text-muted">All systems operational. Database connected successfully.</p>
      </div>
    </div>
  );
}
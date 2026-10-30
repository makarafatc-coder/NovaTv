import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { fetchAndParseM3U, validateStreamUrl } from '../../lib/m3u';
import { PlaylistForm } from '../../components/admin/PlaylistForm';
import { PlaylistTable } from '../../components/admin/PlaylistTable';

export default function AdminPlaylists() {
  const [playlists, setPlaylists] = useState < any[] > ([]);
  const [loading, setLoading] = useState(true);
  
  // ১. ডাটাবেস থেকে প্লেলিস্ট লোড করা
  const loadPlaylists = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPlaylists(data);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    loadPlaylists();
  }, []);
  
  // ২. নতুন প্লেলিস্ট যুক্ত করা
  const addPlaylist = async (input: { name: string;url: string;description ? : string }) => {
    if (!validateStreamUrl(input.url)) {
      throw new Error('Invalid URL. Only http:// and https:// are allowed.');
    }
    
    // ডাটাবেসে প্লেলিস্ট সেভ করা
    const { data, error } = await supabase
      .from('playlists')
      .insert({
        name: input.name.trim(),
        url: input.url.trim(),
        description: input.description?.trim() || '',
        enabled: true,
      })
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // সেভ হওয়ার পর সাথে সাথে চ্যানেল ফেচ করা
    await refreshPlaylist(data.id, data.url);
    await loadPlaylists();
  };
  
  // ৩. চ্যানেল রিফ্রেশ করা (M3U পার্স করে চ্যানেল সেভ করা)
  const refreshPlaylist = async (id: string, url: string) => {
    try {
      // M3U ফাইল থেকে চ্যানেল বের করা
      const channels = await fetchAndParseM3U(url);
      
      // আগের চ্যানেলগুলো ডিলিট করা
      await supabase.from('channels').delete().eq('playlist_id', id);
      
      // নতুন চ্যানেলগুলো সেভ করা (৫০০টা করে ব্যাচে সেভ হবে যাতে ক্র্যাশ না করে)
      if (channels.length > 0) {
        const rows = channels.map((c) => ({ ...c, playlist_id: id }));
        for (let i = 0; i < rows.length; i += 500) {
          const { error } = await supabase.from('channels').insert(rows.slice(i, i + 500));
          if (error) throw new Error(error.message);
        }
      }
      
      // প্লেলিস্টের স্ট্যাটাস আপডেট করা
      await supabase.from('playlists').update({
        last_refreshed_at: new Date().toISOString(),
        last_refresh_status: 'success',
        last_error: null,
        channel_count: channels.length,
      }).eq('id', id);
      
    } catch (err: any) {
      // রিফ্রেশ ফেইল করলে পুরনো চ্যানেল ঠিকই থাকবে, শুধু এরর দেখাবে
      await supabase.from('playlists').update({
        last_refreshed_at: new Date().toISOString(),
        last_refresh_status: 'error',
        last_error: err.message || 'Unknown parsing error',
      }).eq('id', id);
    }
  };
  
  // ৪. প্লেলিস্ট চালু/বন্ধ করা
  const toggleEnabled = async (id: string, enabled: boolean) => {
    await supabase.from('playlists').update({ enabled }).eq('id', id);
    await loadPlaylists();
  };
  
  // ৫. প্লেলিস্ট ডিলিট করা
  const deletePlaylist = async (id: string) => {
    if (!confirm('Are you sure you want to delete this playlist? All its channels will be removed.')) return;
    await supabase.from('playlists').delete().eq('id', id);
    await loadPlaylists();
  };
  
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Playlist Management</h1>
      </div>
      
      {/* প্লেলিস্ট অ্যাড করার ফর্ম */}
      <PlaylistForm onSubmit={addPlaylist} />
      
      {/* প্লেলিস্ট লিস্ট/টেবিল */}
      <PlaylistTable
        playlists={playlists}
        loading={loading}
        onRefresh={(p) => refreshPlaylist(p.id, p.url)}
        onToggle={toggleEnabled}
        onDelete={deletePlaylist}
      />
    </div>
  );
}
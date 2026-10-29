import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { VideoPlayer } from '../components/player/VideoPlayer';
import { ArrowLeft } from 'lucide-react';

export default function PlayerPage() {
  const { id } = useParams();
  const [channel, setChannel] = useState < any > (null);
  
  useEffect(() => {
    async function getChannel() {
      const { data } = await supabase.from('channels').select('*').eq('id', id).single();
      setChannel(data);
    }
    getChannel();
  }, [id]);
  
  if (!channel) return <div className="p-10 text-center">Loading Stream...</div>;
  
  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-fadeIn">
      <Link to="/" className="inline-flex items-center text-muted hover:text-white transition">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Link>
      <VideoPlayer src={channel.stream_url} />
      <div className="glass p-6 rounded-2xl flex items-center gap-4">
        {channel.logo_url && <img src={channel.logo_url} className="w-16 h-16 object-contain bg-white/5 rounded-lg p-2" alt="logo" />}
        <div>
          <h1 className="text-2xl font-bold">{channel.name}</h1>
          <p className="text-brand text-sm">{channel.group_title}</p>
        </div>
      </div>
    </div>
  );
}
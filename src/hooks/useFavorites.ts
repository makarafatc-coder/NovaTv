import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState < string[] > ([]);
  
  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data } = await supabase.from('favorites').select('channel_id').eq('user_id', user?.id);
      setFavorites(data?.map(f => f.channel_id) || []);
    }
    load();
  }, [user]);
  
  const toggleFavorite = async (channelId: string) => {
    if (!user) return alert("Please login to add favorites");
    
    if (favorites.includes(channelId)) {
      await supabase.from('favorites').delete().match({ user_id: user.id, channel_id: channelId });
      setFavorites(prev => prev.filter(id => id !== channelId));
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, channel_id: channelId });
      setFavorites(prev => [...prev, channelId]);
    }
  };
  
  return { favorites, toggleFavorite };
}
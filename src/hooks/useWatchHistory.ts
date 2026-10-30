import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useWatchHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      // চ্যানেলের তথ্যসহ হিস্ট্রি লোড করা
      const { data } = await supabase
        .from('watch_history')
        .select('*, channels(*)')
        .eq('user_id', user?.id)
        .order('watched_at', { ascending: false })
        .limit(20);
      setHistory(data || []);
    }
    load();
  }, [user]);

  const addToHistory = async (channelId: string) => {
    if (!user) return;
    // আগে থাকলে আপডেট হবে, না থাকলে নতুন যোগ হবে (Upsert)
    await supabase.from('watch_history').upsert(
      { user_id: user.id, channel_id: channelId, watched_at: new Date().toISOString() },
      { onConflict: 'user_id, channel_id' }
    );
  };

  return { history, addToHistory };
}
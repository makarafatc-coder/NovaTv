import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useChannels() {
  const [channels, setChannels] = useState < any[] > ([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('channels').select('*').order('name');
      setChannels(data || []);
      setLoading(false);
    }
    load();
  }, []);
  
  return { channels, loading };
}
import { useState } from 'react';
import { useChannels } from '../hooks/useChannels';
import { ChannelCard } from '../components/channels/ChannelCard';
import { CategoryPills } from '../components/channels/CategoryPills';

export default function Categories() {
  const { channels } = useChannels();
  const [active, setActive] = useState('All');
  
  const categories = Array.from(new Set(channels.map(c => c.group_title)));
  const filtered = active === 'All' ? channels : channels.filter(c => c.group_title === active);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-display font-bold">Categories</h1>
      <CategoryPills categories={categories} active={active} onChange={setActive} />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
      </div>
    </div>
  );
}
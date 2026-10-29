import { useChannels } from '../hooks/useChannels';
import { useFavorites } from '../hooks/useFavorites';
import { ChannelCard } from '../components/channels/ChannelCard';
import { EmptyState } from '../components/ui/EmptyState';

export default function Favorites() {
  const { channels } = useChannels();
  const { favorites } = useFavorites();
  
  const favChannels = channels.filter(c => favorites.includes(c.id));
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-display font-bold">Favorites</h1>
      {favChannels.length === 0 ? (
        <EmptyState title="No Favorites Yet" message="Channels you favorite will appear here." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favChannels.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
        </div>
      )}
    </div>
  );
}
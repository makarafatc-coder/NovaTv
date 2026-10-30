import { ChannelCard } from './ChannelCard';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';

interface ChannelGridProps {
  channels: any[];
  loading ? : boolean;
}

export function ChannelGrid({ channels, loading }: ChannelGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    );
  }
  
  if (!channels || channels.length === 0) {
    return (
      <EmptyState 
        title="No Channels Found" 
        message="There are no channels available here right now." 
      />
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
}
import { EmptyState } from '../components/ui/EmptyState';

export default function History() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-display font-bold">Watch History</h1>
      <EmptyState title="No History" message="Channels you watch will appear here." />
    </div>
  );
}
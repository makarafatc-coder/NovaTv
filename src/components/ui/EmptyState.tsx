import { Tv } from 'lucide-react';

export function EmptyState({ title, message }: { title: string, message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-white/5 p-6 rounded-full mb-4">
        <Tv className="w-12 h-12 text-muted" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-muted max-w-md">{message}</p>
    </div>
  );
}
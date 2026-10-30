import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PlaylistFormProps {
  onSubmit: (data: { name: string;url: string;description ? : string }) => Promise < void > ;
}

export function PlaylistForm({ onSubmit }: PlaylistFormProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onSubmit({ name, url, description });
      // সফল হলে ফর্ম খালি করে দাও
      setName('');
      setUrl('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to add playlist');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4">
      <h2 className="text-lg font-semibold text-brand mb-2">Add New Playlist</h2>
      
      {error && <div className="text-danger text-sm bg-danger/10 p-3 rounded-lg">{error}</div>}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Playlist Name (e.g., My IPTV)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition"
        />
        
        <input
          type="url"
          placeholder="M3U URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition"
        />

        <textarea
          placeholder="Optional Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center w-full gap-2 bg-brand hover:bg-brand-deep px-6 py-3 rounded-xl font-medium transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Fetching & Importing...
          </>
        ) : (
          'Add Playlist & Import'
        )}
      </button>
    </form>
  );
}
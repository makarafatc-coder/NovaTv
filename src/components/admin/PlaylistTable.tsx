import { RefreshCw, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface PlaylistTableProps {
  playlists: any[];
  loading: boolean;
  onRefresh: (playlist: any) => void;
  onToggle: (id: string, enabled: boolean) => void;
  onDelete: (id: string) => void;
}

export function PlaylistTable({ playlists, loading, onRefresh, onToggle, onDelete }: PlaylistTableProps) {
  if (loading) {
    return <div className="text-center p-6 text-muted">Loading playlists...</div>;
  }
  
  if (playlists.length === 0) {
    return <div className="text-center p-6 text-muted glass rounded-2xl">No playlists added yet. Add one above.</div>;
  }
  
  return (
    <div className="space-y-4">
      {playlists.map((p) => (
        <div key={p.id} className="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* বাম দিকের তথ্য */}
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-md ${p.enabled ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                {p.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="text-sm text-muted truncate max-w-md">{p.url}</p>
            
            <div className="flex items-center gap-4 text-xs mt-2">
              <span className="text-brand font-medium">{p.channel_count || 0} Channels</span>
              <span className="text-muted">
                Last Refreshed: {p.last_refreshed_at ? new Date(p.last_refreshed_at).toLocaleString() : 'Never'}
              </span>
            </div>
            
            {/* এরর থাকলে দেখাবে */}
            {p.last_refresh_status === 'error' && (
              <p className="text-danger text-xs mt-1 bg-danger/10 p-2 rounded-md">
                Error: {p.last_error}
              </p>
            )}
          </div>

          {/* ডান দিকের অ্যাকশন বাটন */}
          <div className="flex items-center gap-2 md:border-l md:border-white/10 md:pl-4">
            
            {/* Toggle Enable/Disable */}
            <button
              onClick={() => onToggle(p.id, !p.enabled)}
              className={`p-2 rounded-lg transition ${p.enabled ? 'text-success hover:bg-success/10' : 'text-muted hover:bg-white/5'}`}
              title={p.enabled ? 'Disable' : 'Enable'}
            >
              {p.enabled ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => onRefresh(p)}
              className="p-2 rounded-lg text-brand hover:bg-brand/10 transition"
              title="Refresh Channels"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(p.id)}
              className="p-2 rounded-lg text-danger hover:bg-danger/10 transition"
              title="Delete Playlist"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
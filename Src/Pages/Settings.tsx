import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LogOut } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  
  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl">
      <h1 className="text-2xl font-display font-bold">Settings</h1>
      <div className="glass p-6 rounded-2xl space-y-4">
        <p className="text-muted">Logged in as: <span className="text-white">{user?.email || 'Guest'}</span></p>
        {user && (
          <button onClick={handleLogout} className="flex items-center gap-2 text-danger hover:text-red-400 transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        )}
      </div>
    </div>
  );
}
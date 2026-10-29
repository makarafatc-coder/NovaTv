import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Appearance() {
  const [appName, setAppName] = useState('NovaTV');
  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    setSaving(true);
    // app_settings টেবিলে branding আপডেট করা
    await supabase.from('app_settings').upsert({
      key: 'branding',
      value: { appName, primaryColor: '#6366f1' }
    });
    alert('Branding saved!');
    setSaving(false);
  };
  
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">App Appearance</h1>
      <div className="glass p-6 rounded-2xl space-y-4">
        <div>
          <label className="block text-sm text-muted mb-2">App Name</label>
          <input 
            type="text" value={appName} onChange={e => setAppName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand"
          />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-brand hover:bg-brand-deep px-6 py-3 rounded-xl font-medium transition disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
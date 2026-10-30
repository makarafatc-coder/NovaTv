import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Tv, Heart, Clock, Settings } from 'lucide-react';

export function AppShell() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/live', icon: Tv, label: 'Live TV' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];
  
  return (
    <div className="min-h-screen bg-surface text-white pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-surface-raised border-r border-white/5 p-6">
        <h1 className="text-2xl font-display font-bold text-brand mb-8">NovaTV</h1>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname === item.path ? 'bg-brand text-white' : 'text-muted hover:bg-white/5'}`}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Link to="/admin" className="mt-auto px-4 py-2 bg-white/5 rounded-lg text-sm text-center hover:bg-white/10">Admin Panel</Link>
      </aside>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full glass border-t border-white/10 flex justify-around py-3 z-50">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${location.pathname === item.path ? 'text-brand' : 'text-muted'}`}>
            <item.icon className="w-6 h-6" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
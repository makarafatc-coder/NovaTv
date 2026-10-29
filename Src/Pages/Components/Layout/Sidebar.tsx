import { Link, useLocation } from 'react-router-dom';
import { Home, Tv, Grid, Heart, Clock, Settings } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/live', icon: Tv, label: 'Live TV' },
    { path: '/categories', icon: Grid, label: 'Categories' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];
  
  return (
    <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-surface-raised border-r border-white/5 p-6 z-50">
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
  );
}
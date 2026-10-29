import { Link, useLocation } from 'react-router-dom';
import { Home, Tv, Grid, Heart, Clock } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/live', icon: Tv, label: 'Live TV' },
    { path: '/categories', icon: Grid, label: 'Categories' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/history', icon: Clock, label: 'History' },
  ];
  
  return (
    <nav className="md:hidden fixed bottom-0 w-full glass border-t border-white/10 flex justify-around py-3 z-50 pb-safe">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${location.pathname === item.path ? 'text-brand' : 'text-muted'}`}>
          <item.icon className="w-6 h-6" />
          <span className="text-[10px]">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AdminGuard } from './components/admin/AdminGuard';
import { useAuth } from './hooks/useAuth';

// --- Public Pages ---
import Home from './pages/Home';
import LiveTV from './pages/LiveTV';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Settings from './pages/Settings';
import PlayerPage from './pages/PlayerPage';
import About from './pages/About';
import Privacy from './pages/Privacy';

// --- Admin Pages ---
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPlaylists from './pages/admin/Playlists';
import ChannelsAdmin from './pages/admin/ChannelsAdmin';
import Appearance from './pages/admin/Appearance';

export default function App() {
  const { loading } = useAuth();
  
  // অ্যাপ লোড হওয়ার সময় একটু অপেক্ষা করবে
  if (loading) {
    return (
      <div className="min-h-screen bg-surface text-white flex items-center justify-center">
        Loading NovaTV...
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* ১. ইউজারদের জন্য পেজ (যেখানে নিচে বা পাশে মেনু থাকবে) */}
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveTV />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* ২. ভিডিও প্লেয়ার পেজ (এখানে আলাদা করে রাখা হয়েছে যাতে ফুল স্ক্রিন হয়) */}
        <Route path="/player/:id" element={<PlayerPage />} />

        {/* ৩. অ্যাডমিন লগইন পেজ */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ৪. অ্যাডমিন প্যানেলের ভেতরের পেজ (লগইন ছাড়া ঢোকা যাবে না) */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/playlists" element={<AdminPlaylists />} />
          <Route path="/admin/channels" element={<ChannelsAdmin />} />
          <Route path="/admin/appearance" element={<Appearance />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
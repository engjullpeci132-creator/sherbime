import { Link, useLocation } from 'react-router-dom';
import { Search, CalendarDays, User, Home } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Kryefaqja' },
  { path: '/search', icon: Search, label: 'Kërko' },
  { path: '/bookings', icon: CalendarDays, label: 'Rezervimet' },
  { path: '/account', icon: User, label: 'Llogaria' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium font-body">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { User, LogOut, Shield, HelpCircle, Star, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  const menuItems = [
    { icon: User, label: 'Ndrysho profilin', path: '#' },
    { icon: Star, label: 'Vlerësimet e mia', path: '#' },
    { icon: Shield, label: 'Privatësia & Siguria', path: '#' },
    { icon: HelpCircle, label: 'Ndihmë & Mbështetje', path: '#' },
  ];

  return (
    <div className="px-5 pt-8">
      <h1 className="font-heading font-bold text-2xl text-foreground">Llogaria ime</h1>

      <div className="bg-card rounded-2xl border border-border p-5 mt-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-foreground">{user?.full_name || 'User'}</h2>
            <p className="text-sm text-muted-foreground font-body">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-5 mt-4 shadow-md">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-accent-foreground mt-0.5" />
          <div>
            <h3 className="font-heading font-bold text-accent-foreground">Bëhu ofrues shërbimi</h3>
            <p className="text-xs text-accent-foreground/80 mt-1 font-body leading-relaxed">
              Ofro shërbimet tua dhe fito para. Bëhu i reklamuar për të tërhequr më shumë klientë!
            </p>
            <Link to="/become-provider">
              <Button size="sm" className="mt-3 bg-white text-accent hover:bg-white/90 rounded-xl font-heading font-bold text-xs">
                Fillo tani
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center justify-between py-3.5 px-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground font-body">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-6 text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl"
        onClick={() => base44.auth.logout()}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Dil nga llogaria
      </Button>
    </div>
  );
}

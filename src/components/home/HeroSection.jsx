import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary px-5 pt-12 pb-8 rounded-b-[2rem]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full" />
      
      <div className="relative">
        <h1 className="font-heading font-extrabold text-white text-2xl leading-tight">
          Gjej profesionistë<br />lokalë, shpejt.
        </h1>
        <p className="text-white/80 text-sm mt-2 font-body">
          Shoferë, kopshtarë, hidraulikë e shumë të tjerë — pranë teje.
        </p>

        <Link to="/search">
          <div className="mt-5 bg-white/20 backdrop-blur-sm rounded-2xl p-3.5 flex items-center gap-3 hover:bg-white/30 transition-all cursor-pointer">
            <Search className="w-5 h-5 text-white" />
            <span className="text-white/70 text-sm font-body">Çfarë shërbimi kërkon?</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

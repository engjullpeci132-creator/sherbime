import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchFilters from '../components/search/SearchFilters';
import ProviderCard from '../components/providers/ProviderCard';

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category') || 'all';

  const [filters, setFilters] = useState({
    category: categoryParam,
    maxDistance: 25,
    sortBy: 'distance',
    query: '',
  });

  const { data: providers, isLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: () => base44.entities.ServiceProvider.list('-rating', 100),
    initialData: [],
  });

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    result = result.filter((p) => (p.distance_km || 0) <= filters.maxDistance);

    // Featured always on top
    const featured = result.filter((p) => p.is_featured);
    const normal = result.filter((p) => !p.is_featured);

    const sortFn = {
      distance: (a, b) => (a.distance_km || 0) - (b.distance_km || 0),
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
      price_low: (a, b) => (a.hourly_rate || 0) - (b.hourly_rate || 0),
      price_high: (a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0),
    };

    featured.sort(sortFn[filters.sortBy] || sortFn.distance);
    normal.sort(sortFn[filters.sortBy] || sortFn.distance);

    return [...featured, ...normal];
  }, [providers, filters]);

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center gap-3 mb-5">
        <Link to="/" className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Kërko shërbime, aftësi..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="pl-10 rounded-2xl bg-secondary border-0 h-11 font-body"
          />
        </div>
      </div>

      <SearchFilters filters={filters} onFilterChange={setFilters} />

      <div className="mt-5 space-y-3 mb-4">
        <p className="text-xs text-muted-foreground font-body">
          {filteredProviders.length} ofrues{filteredProviders.length !== 1 ? '' : ''} u gjet
        </p>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border animate-pulse">
                <div className="flex gap-3.5">
                  <div className="w-16 h-16 bg-muted rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-16">
            <SearchIcon className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="font-heading font-semibold text-foreground">Asnjë ofrues nuk u gjet</p>
            <p className="text-sm text-muted-foreground mt-1">Provo të ndryshosh filtrat</p>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        )}
      </div>
    </div>
  );
}

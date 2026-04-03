import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck, Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import CategoryIcon from './CategoryIcon';

export default function ProviderCard({ provider }) {
  const availabilityColors = {
    available: 'bg-green-500',
    busy: 'bg-amber-500',
    offline: 'bg-gray-400',
  };

  return (
    <Link to={`/provider/${provider.id}`}>
      <div className={`bg-card rounded-2xl p-4 border transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        provider.is_featured ? 'border-accent/40 shadow-md ring-1 ring-accent/20' : 'border-border shadow-sm'
      }`}>
        {provider.is_featured && (
          <div className="flex items-center gap-1 mb-3 text-accent">
            <Sparkles className="w-3.5 h-3.5 fill-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide">Featured</span>
          </div>
        )}

        <div className="flex gap-3.5">
          <div className="relative">
            {provider.photo_url ? (
              <img
                src={provider.photo_url}
                alt={provider.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <CategoryIcon category={provider.category} size="lg" />
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${
              availabilityColors[provider.availability] || 'bg-gray-400'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading font-semibold text-foreground truncate">
                {provider.name}
              </h3>
              {provider.is_verified && (
                <BadgeCheck className="w-4 h-4 text-primary shrink-0 fill-primary/10" />
              )}
            </div>

            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {provider.category?.replace(/_/g, ' ')}
            </p>

            <div className="flex items-center gap-3 mt-1.5">
              <StarRating rating={provider.rating || 0} />
              <span className="text-xs text-muted-foreground">
                ({provider.total_reviews || 0})
              </span>
            </div>

            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{provider.distance_km?.toFixed(1)} km</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm font-heading font-bold text-primary">
                  €{provider.hourly_rate}/orë
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

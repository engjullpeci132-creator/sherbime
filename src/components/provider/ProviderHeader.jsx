import { ArrowLeft, Share2, BadgeCheck, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarRating from '../providers/StarRating';
import CategoryIcon from '../providers/CategoryIcon';

export default function ProviderHeader({ provider }) {
  const availabilityLabel = {
    available: 'I disponueshëm',
    busy: 'I zënë',
    offline: 'Joaktiv',
  };
  const availabilityColor = {
    available: 'text-green-600 bg-green-50',
    busy: 'text-amber-600 bg-amber-50',
    offline: 'text-gray-500 bg-gray-100',
  };

  return (
    <div>
      <div className="relative bg-gradient-to-br from-primary/90 to-primary px-5 pt-6 pb-16 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <Link to="/search" className="p-2 -ml-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="px-5 -mt-12 relative">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-lg">
          <div className="flex gap-4">
            <div className="relative">
              {provider.photo_url ? (
                <img src={provider.photo_url} alt={provider.name} className="w-20 h-20 rounded-2xl object-cover" />
              ) : (
                <CategoryIcon category={provider.category} size="lg" />
              )}
              {provider.is_featured && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-accent-foreground fill-accent-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-bold text-xl text-foreground">{provider.name}</h1>
                {provider.is_verified && <BadgeCheck className="w-5 h-5 text-primary fill-primary/10" />}
              </div>
              <p className="text-sm text-muted-foreground capitalize mt-0.5">
                {provider.category?.replace(/_/g, ' ')}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <StarRating rating={provider.rating || 0} size="lg" />
                <span className="text-sm text-muted-foreground">({provider.total_reviews || 0} vlerësime)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{provider.city}</span>
              <span className="text-muted-foreground">· {provider.distance_km?.toFixed(1)} km</span>
            </div>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${availabilityColor[provider.availability] || 'bg-gray-100 text-gray-500'}`}>
              {availabilityLabel[provider.availability] || 'Unknown'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

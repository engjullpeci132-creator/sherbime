import ProviderCard from '../providers/ProviderCard';

export default function FeaturedProviders({ providers, isLoading }) {
  if (isLoading) {
    return (
      <div className="px-5 mt-8">
        <h2 className="font-heading font-bold text-lg text-foreground mb-4">Më të vlerësuarit pranë teje</h2>
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
      </div>
    );
  }

  if (!providers?.length) return null;

  return (
    <div className="px-5 mt-8 mb-4">
      <h2 className="font-heading font-bold text-lg text-foreground mb-4">Më të vlerësuarit pranë teje</h2>
      <div className="space-y-3">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}

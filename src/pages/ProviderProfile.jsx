import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProviderHeader from '../components/provider/ProviderHeader';
import ProviderInfo from '../components/provider/ProviderInfo';
import ReviewsList from '../components/provider/ReviewsList';
import BookingForm from '../components/provider/BookingForm';

export default function ProviderProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/');
  const providerId = pathParts[pathParts.length - 1];

  const { data: providers, isLoading } = useQuery({
    queryKey: ['provider', providerId],
    queryFn: () => base44.entities.ServiceProvider.filter({ id: providerId }),
    enabled: !!providerId,
  });

  const provider = providers?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Provider not found</p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <ProviderHeader provider={provider} />
      <ProviderInfo provider={provider} />
      <ReviewsList providerId={provider.id} />
      <BookingForm provider={provider} />
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProviders from '../components/home/FeaturedProviders';

export default function Home() {
  const { data: providers, isLoading } = useQuery({
    queryKey: ['featured-providers'],
    queryFn: () => base44.entities.ServiceProvider.list('-rating', 10),
    initialData: [],
  });

  const featured = providers.filter((p) => p.is_featured);
  const topRated = providers.filter((p) => !p.is_featured).slice(0, 5);
  const displayProviders = [...featured, ...topRated].slice(0, 6);

  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProviders providers={displayProviders} isLoading={isLoading} />
    </div>
  );
}

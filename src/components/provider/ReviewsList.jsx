import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import StarRating from '../providers/StarRating';
import { format } from 'date-fns';
import { MessageSquare } from 'lucide-react';

export default function ReviewsList({ providerId }) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', providerId],
    queryFn: () => base44.entities.Review.filter({ provider_id: providerId }, '-created_date', 20),
    initialData: [],
  });

  return (
    <div className="px-5 mt-6">
      <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
        Vlerësimet ({reviews.length})
      </h3>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-secondary rounded-2xl p-4 animate-pulse">
              <div className="h-3 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 bg-secondary rounded-2xl">
          <MessageSquare className="w-8 h-8 text-muted mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Ende pa vlerësime</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{review.reviewer_name || 'Anonymous'}</p>
                  <StarRating rating={review.rating || 0} />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {review.created_date ? format(new Date(review.created_date), 'MMM d, yyyy') : ''}
                </span>
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

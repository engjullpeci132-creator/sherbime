import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function ReviewDialog({ booking, open, onOpenChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setLoading(true);
    const user = await base44.auth.me();
    await base44.entities.Review.create({
      provider_id: booking.provider_id,
      booking_id: booking.id,
      reviewer_name: user.full_name,
      reviewer_email: user.email,
      rating,
      comment,
    });
    queryClient.invalidateQueries({ queryKey: ['reviews'] });
    setLoading(false);
    onOpenChange(false);
    setRating(0);
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading">Vlerëso {booking?.provider_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  className={`w-8 h-8 transition-all ${
                    star <= (hover || rating)
                      ? 'fill-accent text-accent scale-110'
                      : 'text-muted'
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Ndaj përvojën tënde..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="rounded-xl min-h-[100px]"
          />
          <Button
            onClick={handleSubmit}
            disabled={!rating || loading}
            className="w-full rounded-xl font-heading font-bold"
          >
            {loading ? 'Duke dërguar...' : 'Dërgo vlerësimin'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

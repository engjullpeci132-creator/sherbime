import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays } from 'lucide-react';
import BookingCard from '../components/bookings/BookingCard';
import ReviewDialog from '../components/bookings/ReviewDialog';

export default function Bookings() {
  const [tab, setTab] = useState('active');
  const [reviewBooking, setReviewBooking] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    base44.auth.me().then((u) => setUserEmail(u.email));
  }, []);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', userEmail],
    queryFn: () => base44.entities.ServiceBooking.filter({ client_email: userEmail }, '-created_date', 50),
    enabled: !!userEmail,
    initialData: [],
  });

  const activeBookings = bookings.filter((b) => ['pending', 'accepted', 'in_progress'].includes(b.status));
  const pastBookings = bookings.filter((b) => ['completed', 'cancelled'].includes(b.status));
  const displayBookings = tab === 'active' ? activeBookings : pastBookings;

  return (
    <div className="px-5 pt-8">
      <h1 className="font-heading font-bold text-2xl text-foreground">Rezervimet e mia</h1>
      <p className="text-sm text-muted-foreground mt-1 font-body">Gjurmo kërkesat e tua për shërbime</p>

      <Tabs value={tab} onValueChange={setTab} className="mt-5">
        <TabsList className="w-full bg-secondary rounded-2xl p-1 h-auto">
          <TabsTrigger value="active" className="flex-1 rounded-xl text-xs font-body py-2">
            Aktive ({activeBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 rounded-xl text-xs font-body py-2">
            Të kaluara ({pastBookings.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-5 space-y-3 mb-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border animate-pulse h-32" />
            ))}
          </div>
        ) : displayBookings.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="font-heading font-semibold text-foreground">Nuk ka rezervime {tab === 'active' ? 'aktive' : 'të kaluara'}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {tab === 'active' ? 'Rezervo një shërbim për të filluar' : 'Rezervimet e përfunduara shfaqen këtu'}
            </p>
          </div>
        ) : (
          displayBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onReview={tab === 'past' && booking.status === 'completed' ? setReviewBooking : undefined}
            />
          ))
        )}
      </div>

      <ReviewDialog
        booking={reviewBooking}
        open={!!reviewBooking}
        onOpenChange={(open) => !open && setReviewBooking(null)}
      />
    </div>
  );
}

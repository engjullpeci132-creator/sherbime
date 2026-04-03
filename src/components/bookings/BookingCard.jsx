import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarDays, Clock, DollarSign, MapPin } from 'lucide-react';
import CategoryIcon from '../providers/CategoryIcon';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  accepted: 'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function BookingCard({ booking, onReview }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <CategoryIcon category={booking.provider_category} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground truncate">{booking.provider_name}</h3>
            <Badge className={`text-[10px] font-medium border ${statusStyles[booking.status] || 'bg-muted text-muted-foreground'}`}>
              {booking.status?.replace(/_/g, ' ')}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {booking.provider_category?.replace(/_/g, ' ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="w-3.5 h-3.5" />
          {booking.date ? format(new Date(booking.date), 'MMM d, yyyy') : 'TBD'}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {booking.time || 'TBD'} · {booking.estimated_hours}h
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <DollarSign className="w-3.5 h-3.5" />
          €{booking.total_cost?.toFixed(2)}
        </div>
        {booking.address && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{booking.address}</span>
          </div>
        )}
      </div>

      {booking.status === 'completed' && onReview && (
        <button
          onClick={() => onReview(booking)}
          className="mt-3 w-full text-center text-xs font-medium text-primary bg-primary/5 py-2 rounded-xl hover:bg-primary/10 transition-colors"
        >
          Lër një vlerësim
        </button>
      )}
    </div>
  );
}

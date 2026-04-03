import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { CalendarDays, Clock, MapPin, DollarSign, CheckCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const PLATFORM_FEE_PERCENT = 0.10;

export default function BookingForm({ provider }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    date: '',
    time: '',
    estimated_hours: 2,
    description: '',
    address: '',
  });

  const queryClient = useQueryClient();

  const subtotal = (provider.hourly_rate || 0) * form.estimated_hours;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PERCENT * 100) / 100;
  const total = subtotal + platformFee;

  const handleSubmit = async () => {
    setLoading(true);
    const user = await base44.auth.me();
    await base44.entities.ServiceBooking.create({
      provider_id: provider.id,
      provider_name: provider.name,
      provider_category: provider.category,
      client_email: user.email,
      client_name: user.full_name,
      date: form.date ? format(new Date(form.date), 'yyyy-MM-dd') : '',
      time: form.time,
      estimated_hours: form.estimated_hours,
      description: form.description,
      address: form.address,
      total_cost: total,
      platform_fee: platformFee,
      status: 'pending',
    });
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="px-5 mt-6 mb-6">
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSuccess(false); }}>
        <DialogTrigger asChild>
          <Button
            className="w-full h-14 rounded-2xl font-heading font-bold text-base"
            disabled={provider.availability === 'offline'}
          >
            {provider.availability === 'offline' ? 'Aktualisht joaktiv' : `Rezervo tani · €${provider.hourly_rate}/orë`}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md mx-auto rounded-2xl">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground">Rezervimi u dërgua!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Kërkesa juaj u dërgua te {provider.name}. Do të njoftoheni kur të përgjigjen.
              </p>
              <DialogClose asChild>
                <Button className="mt-6 rounded-xl" variant="secondary">Mbyll</Button>
              </DialogClose>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">Rezervo te {provider.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Data</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start rounded-xl font-body">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        {form.date ? format(new Date(form.date), 'PPP') : 'Zgjidh një datë'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.date ? new Date(form.date) : undefined}
                        onSelect={(d) => setForm({ ...form, date: d })}
                        disabled={(d) => d < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ora</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="time"
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="pl-9 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Orë</label>
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      value={form.estimated_hours}
                      onChange={(e) => setForm({ ...form, estimated_hours: parseInt(e.target.value) || 1 })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Adresa</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Vendndodhja e shërbimit"
                      className="pl-9 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Përshkruaj çfarë nevojitet</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Tregoji ofruesit çfarë ke nevojë..."
                    className="rounded-xl min-h-[80px]"
                  />
                </div>

                <div className="bg-secondary rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{form.estimated_hours}h × €{provider.hourly_rate}/orë</span>
                    <span className="text-foreground">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tarifa e platformës (10%)</span>
                    <span className="text-foreground">€{platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                    <span>Totali</span>
                    <span className="text-primary">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !form.date}
                  className="w-full h-12 rounded-2xl font-heading font-bold"
                >
                  {loading ? 'Duke dërguar...' : `Konfirmo rezervimin · €${total.toFixed(2)}`}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

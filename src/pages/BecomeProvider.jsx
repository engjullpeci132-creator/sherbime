import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const categories = [
  { key: 'driver', label: 'Shofer' },
  { key: 'gardener', label: 'Kopshtar' },
  { key: 'plumber', label: 'Hidraulik' },
  { key: 'electrician', label: 'Elektricist' },
  { key: 'cleaner', label: 'Pastrues' },
  { key: 'painter', label: 'Piktor' },
  { key: 'carpenter', label: 'Marangoz' },
  { key: 'mechanic', label: 'Mekanik' },
  { key: 'tutor', label: 'Mësues' },
  { key: 'chef', label: 'Kuzhinier' },
  { key: 'mover', label: 'Transportues' },
  { key: 'handyman', label: 'Riparues' },
  { key: 'photographer', label: 'Fotograf' },
  { key: 'pet_care', label: 'Kujdes kafshësh' },
  { key: 'other', label: 'Tjetër' },
];

export default function BecomeProvider() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    hourly_rate: '',
    city: '',
    phone: '',
    skills: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    const user = await base44.auth.me();
    await base44.entities.ServiceProvider.create({
      name: form.name || user.full_name,
      category: form.category,
      description: form.description,
      hourly_rate: parseFloat(form.hourly_rate) || 0,
      city: form.city,
      phone: form.phone,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      rating: 0,
      total_reviews: 0,
      total_jobs: 0,
      is_featured: false,
      is_verified: false,
      availability: 'available',
      distance_km: Math.round(Math.random() * 10 * 10) / 10,
    });
    queryClient.invalidateQueries({ queryKey: ['providers'] });
    queryClient.invalidateQueries({ queryKey: ['featured-providers'] });
    setLoading(false);
    setSuccess(true);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (success) {
    return (
      <div className="px-5 pt-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Urime! 🎉</h2>
        <p className="text-muted-foreground mt-2 font-body leading-relaxed">
          Profili yt si ofrues shërbimi u krijua me sukses. Tani mund të shfaqesh në kërkim!
        </p>
        <Button
          className="mt-8 rounded-2xl w-full font-heading font-bold h-12"
          onClick={() => navigate('/search')}
        >
          Shiko profilin tim
        </Button>
        <Button
          variant="ghost"
          className="mt-2 w-full rounded-2xl"
          onClick={() => navigate('/account')}
        >
          Kthehu te llogaria
        </Button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/account')} className="p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="font-heading font-bold text-xl text-foreground">Bëhu ofrues shërbimi</h1>
          <p className="text-xs text-muted-foreground font-body">Krijo profilin tënd dhe fillo të fitosh</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs text-primary font-body leading-relaxed">
          Plotëso formularin dhe shfaqu menjëherë tek klientët që kërkojnë shërbimet tua!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Emri i plotë *</label>
          <Input
            value={form.name}
            onChange={set('name')}
            placeholder="p.sh. Arben Krasniqi"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Kategoria e shërbimit *</label>
          <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Zgjidh kategorinë..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map(({ key, label }) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Përshkrimi *</label>
          <Textarea
            value={form.description}
            onChange={set('description')}
            placeholder="Përshkruaj shërbimet tua, përvojën dhe çfarë ofron..."
            className="rounded-xl min-h-[90px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Çmimi për orë (€) *</label>
            <Input
              type="number"
              min={1}
              value={form.hourly_rate}
              onChange={set('hourly_rate')}
              placeholder="p.sh. 15"
              className="rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Qyteti *</label>
            <Input
              value={form.city}
              onChange={set('city')}
              placeholder="p.sh. Prishtinë"
              className="rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Numri i telefonit</label>
          <Input
            value={form.phone}
            onChange={set('phone')}
            placeholder="p.sh. +383 44 123 456"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Aftësitë (ndaji me presje)</label>
          <Input
            value={form.skills}
            onChange={set('skills')}
            placeholder="p.sh. Instalim, Riparim, Mirëmbajtje"
            className="rounded-xl"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.category || !form.hourly_rate || !form.city}
          className="w-full h-12 rounded-2xl font-heading font-bold mt-2"
        >
          {loading ? 'Duke krijuar profilin...' : 'Krijo profilin tim'}
        </Button>
      </div>
    </div>
  );
}

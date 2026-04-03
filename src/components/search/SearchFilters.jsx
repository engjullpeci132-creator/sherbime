import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { key: 'all', label: 'Të gjitha shërbimet' },
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
];

export default function SearchFilters({ filters, onFilterChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.slice(0, 8).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange({ ...filters, category: key })}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium font-body transition-all ${
              filters.category === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium font-body border transition-all flex items-center gap-1 ${
            showAdvanced ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          Më shumë
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-card rounded-2xl border border-border p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Kategoria</label>
            <Select
              value={filters.category}
              onValueChange={(val) => onFilterChange({ ...filters, category: val })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ key, label }) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Distanca maksimale: {filters.maxDistance} km
            </label>
            <Slider
              value={[filters.maxDistance]}
              onValueChange={([val]) => onFilterChange({ ...filters, maxDistance: val })}
              max={50}
              min={1}
              step={1}
              className="py-2"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Rendit sipas</label>
            <Select
              value={filters.sortBy}
              onValueChange={(val) => onFilterChange({ ...filters, sortBy: val })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Më i afërti</SelectItem>
                <SelectItem value="rating">Vlerësimi më i lartë</SelectItem>
                <SelectItem value="price_low">Çmimi: nga ulët në lart</SelectItem>
                <SelectItem value="price_high">Çmimi: nga lart në ulët</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({ category: 'all', maxDistance: 25, sortBy: 'distance', query: '' })}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" /> Pastro filtrat
          </Button>
        </div>
      )}
    </div>
  );
}

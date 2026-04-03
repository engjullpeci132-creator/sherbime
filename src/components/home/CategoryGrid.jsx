import { Link } from 'react-router-dom';
import CategoryIcon from '../providers/CategoryIcon';

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
  { key: 'photographer', label: 'Fotograf' },
];

export default function CategoryGrid() {
  return (
    <div className="px-5 mt-6">
      <h2 className="font-heading font-bold text-lg text-foreground mb-4">Shfleto sipas kategorisë</h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map(({ key, label }) => (
          <Link
            key={key}
            to={`/search?category=${key}`}
            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl hover:bg-secondary transition-colors"
          >
            <CategoryIcon category={key} />
            <span className="text-xs font-medium text-foreground font-body">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

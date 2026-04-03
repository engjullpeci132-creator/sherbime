import {
  Car, Leaf, Wrench, Zap, SprayCan, Paintbrush, Hammer, Settings,
  GraduationCap, ChefHat, Truck, PenTool, Camera, PawPrint, MoreHorizontal
} from 'lucide-react';

const iconMap = {
  driver: Car,
  gardener: Leaf,
  plumber: Wrench,
  electrician: Zap,
  cleaner: SprayCan,
  painter: Paintbrush,
  carpenter: Hammer,
  mechanic: Settings,
  tutor: GraduationCap,
  chef: ChefHat,
  mover: Truck,
  handyman: PenTool,
  photographer: Camera,
  pet_care: PawPrint,
  other: MoreHorizontal,
};

const colorMap = {
  driver: 'bg-blue-100 text-blue-600',
  gardener: 'bg-green-100 text-green-600',
  plumber: 'bg-cyan-100 text-cyan-600',
  electrician: 'bg-yellow-100 text-yellow-600',
  cleaner: 'bg-purple-100 text-purple-600',
  painter: 'bg-pink-100 text-pink-600',
  carpenter: 'bg-orange-100 text-orange-600',
  mechanic: 'bg-slate-100 text-slate-600',
  tutor: 'bg-indigo-100 text-indigo-600',
  chef: 'bg-red-100 text-red-600',
  mover: 'bg-amber-100 text-amber-600',
  handyman: 'bg-teal-100 text-teal-600',
  photographer: 'bg-violet-100 text-violet-600',
  pet_care: 'bg-emerald-100 text-emerald-600',
  other: 'bg-gray-100 text-gray-600',
};

export default function CategoryIcon({ category, size = 'md' }) {
  const Icon = iconMap[category] || MoreHorizontal;
  const colors = colorMap[category] || 'bg-gray-100 text-gray-600';
  const sizeClasses = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`${sizeClasses} ${colors} rounded-xl flex items-center justify-center shrink-0`}>
      <Icon className={iconSize} />
    </div>
  );
}

export { iconMap, colorMap };

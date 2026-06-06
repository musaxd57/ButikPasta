import {
  MessageCircle,
  PencilRuler,
  ChefHat,
  Truck,
  Heart,
  Leaf,
  Sparkles,
  Award,
  type LucideIcon,
} from 'lucide-react';

// Maps the string icon names used in content data to lucide components.
const MAP: Record<string, LucideIcon> = {
  MessageCircle,
  PencilRuler,
  ChefHat,
  Truck,
  Heart,
  Leaf,
  Sparkles,
  Award,
};

export default function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp size={size} className={className} />;
}

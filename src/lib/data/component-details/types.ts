import { ConfigComponent, GenericSpecs } from '@/types';

export interface ComponentDetail extends ConfigComponent {
  description?: string;
  specs?: GenericSpecs;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

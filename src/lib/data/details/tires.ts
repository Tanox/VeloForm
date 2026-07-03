import type { ComponentDetail } from '../component-details';

export const tireDetails: Record<string, ComponentDetail> = {
  t1: {
    id: 't1',
    category: 'Tires',
    bikeType: 'Road',
    name: 'Turbo Cotton 28mm',
    price: 180,
    weight: 480,
    brand: 'Specialized',
    model: 'Turbo Cotton',
    description: 'The ultimate road racing tire with cotton casing for exceptional grip.',
    specs: {
      Size: '700x28c',
      TPI: '300',
      Casing: 'Cotton',
      Compound: 'Gripton',
      Type: 'Clincher',
    },
    features: [
      'Ultra-high TPI',
      'Silk smooth ride',
      'Excellent cornering grip',
      'Puncture protection',
    ],
    rating: 4.9,
    reviewCount: 234,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Specialized%20Turbo%20Cotton%20road%20bike%20tire%20professional%20product%20photo&image_size=landscape_4_3',
  },
  t2: {
    id: 't2',
    category: 'Tires',
    bikeType: 'Road',
    name: 'GP5000 S TR',
    price: 160,
    weight: 450,
    brand: 'Continental',
    model: 'GP5000 S TR',
    description: "Continental's flagship tubeless tire with outstanding rolling resistance.",
    specs: {
      Size: '700x28c',
      TPI: '180',
      Casing: 'BlackChili',
      Compound: 'Vectran',
      Type: 'Tubeless Ready',
    },
    features: [
      'Tubeless ready',
      'BlackChili compound',
      'Vectran Breaker',
      'Excellent rolling resistance',
    ],
    rating: 4.8,
    reviewCount: 312,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Continental%20GP5000%20S%20TR%20road%20bike%20tire%20professional%20product%20photo&image_size=landscape_4_3',
  },
};

import type { ComponentDetail } from '../component-details';

export const cockpitDetails: Record<string, ComponentDetail> = {
  c1: {
    id: 'c1',
    category: 'Cockpit',
    bikeType: 'Road',
    name: 'Roval Rapide Cockpit',
    price: 600,
    weight: 310,
    brand: 'Roval',
    model: 'Rapide Cockpit',
    description: 'Integrated carbon cockpit for aero performance and clean aesthetics.',
    specs: {
      'Handlebar Width': '38/40/42/44cm',
      'Stem Length': '80-120mm',
      Drop: '125mm',
      Reach: '79mm',
      Material: 'Carbon',
    },
    features: ['Integrated design', 'Cable routing', 'Aero profile', 'Computer mount included'],
    rating: 4.8,
    reviewCount: 78,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Roval%20Rapide%20integrated%20carbon%20cockpit%20handlebar%20professional%20product%20photo&image_size=landscape_4_3',
  },
  c2: {
    id: 'c2',
    category: 'Cockpit',
    bikeType: 'Road',
    name: 'Enve SES AR',
    price: 550,
    weight: 320,
    brand: 'Enve',
    model: 'SES AR',
    description: 'All-road cockpit designed for comfort and control on varied terrain.',
    specs: {
      'Handlebar Width': '40/42/44cm',
      'Stem Length': '70-130mm',
      Drop: '130mm',
      Reach: '80mm',
      Material: 'Carbon',
    },
    features: ['Flared drops', 'Internal routing', 'Comfort shaping', 'Lightweight'],
    rating: 4.6,
    reviewCount: 45,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Enve%20SES%20AR%20all-road%20carbon%20handlebar%20professional%20product%20photo&image_size=landscape_4_3',
  },
};

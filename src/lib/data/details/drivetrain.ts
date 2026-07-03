import type { ComponentDetail } from '../component-details';

export const drivetrainDetails: Record<string, ComponentDetail> = {
  d1: {
    id: 'd1',
    category: 'Drivetrain',
    bikeType: 'Road',
    name: 'Shimano Dura-Ace Di2 R9200',
    price: 4200,
    weight: 2430,
    brand: 'Shimano',
    model: 'Dura-Ace Di2 R9200',
    description:
      'The pinnacle of Shimano road cycling technology, featuring wireless shifting and exceptional performance.',
    specs: {
      Speeds: 12,
      'Cassette Range': '11-30T',
      Chainrings: '52/36T',
      'Battery Life': '1000km',
      'Shift Speed': '0.15s',
    },
    features: ['Wireless shifting', 'Auto Di2', 'Synchronized shifting', 'Low battery alert'],
    rating: 4.9,
    reviewCount: 128,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shimano%20Dura-Ace%20Di2%20R9200%20road%20bike%20drivetrain%20components%20professional%20product%20photo&image_size=landscape_4_3',
  },
  d2: {
    id: 'd2',
    category: 'Drivetrain',
    bikeType: 'Road',
    name: 'SRAM Red AXS',
    price: 4000,
    weight: 2380,
    brand: 'SRAM',
    model: 'Red AXS',
    description:
      "SRAM's flagship wireless groupset with Orbit chain management and blistering shift speeds.",
    specs: {
      Speeds: 12,
      'Cassette Range': '10-33T',
      Chainrings: '48/35T',
      'Battery Life': '600km',
      'Shift Speed': '0.08s',
    },
    features: [
      '1x or 2x options',
      'Orbit chain management',
      'Wide cassette range',
      'Tool-free battery removal',
    ],
    rating: 4.8,
    reviewCount: 95,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SRAM%20Red%20AXS%20wireless%20drivetrain%20components%20professional%20product%20photo&image_size=landscape_4_3',
  },
  d3: {
    id: 'd3',
    category: 'Drivetrain',
    bikeType: 'Road',
    name: 'Campagnolo Super Record EPS',
    price: 4500,
    weight: 2450,
    brand: 'Campagnolo',
    model: 'Super Record EPS',
    description:
      'Italian craftsmanship meets electronic precision. The ultimate in luxury road components.',
    specs: {
      Speeds: 12,
      'Cassette Range': '11-32T',
      Chainrings: '53/39T',
      'Battery Life': '800km',
      'Shift Speed': '0.12s',
    },
    features: [
      'Ergonomic shifters',
      'Ultra-smooth shifting',
      'Carbon fiber components',
      'Italian design',
    ],
    rating: 4.9,
    reviewCount: 42,
    imageUrl:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Campagnolo%20Super%20Record%20EPS%20drivetrain%20components%20professional%20product%20photo&image_size=landscape_4_3',
  },
};

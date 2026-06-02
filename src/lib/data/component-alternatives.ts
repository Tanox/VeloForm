import { ConfigComponent, BikeType } from '@/types';

export const mockAlternatives: Record<string, ConfigComponent[]> = {
  Drivetrain: [
    { id: 'd1', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
    { id: 'd2', category: 'Drivetrain', bikeType: 'Road', name: 'SRAM Red AXS', price: 4000, weight: 2380, brand: 'SRAM', model: 'Red AXS' },
    { id: 'd3', category: 'Drivetrain', bikeType: 'Road', name: 'Campagnolo Super Record EPS', price: 4500, weight: 2450, brand: 'Campagnolo', model: 'Super Record EPS' },
  ],
  Wheelset: [
    { id: 'w1', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
    { id: 'w2', category: 'Wheelset', bikeType: 'Road', name: 'Zipp 454 NSW', price: 3200, weight: 1480, brand: 'Zipp', model: '454 NSW' },
    { id: 'w3', category: 'Wheelset', bikeType: 'Road', name: 'Enve SES 4.5', price: 2900, weight: 1550, brand: 'Enve', model: 'SES 4.5' },
  ],
  Cockpit: [
    { id: 'c1', category: 'Cockpit', bikeType: 'Road', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval', model: 'Rapide Cockpit' },
    { id: 'c2', category: 'Cockpit', bikeType: 'Road', name: 'Enve SES AR', price: 550, weight: 320, brand: 'Enve', model: 'SES AR' },
  ],
  Tires: [
    { id: 't1', category: 'Tires', bikeType: 'Road', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton' },
    { id: 't2', category: 'Tires', bikeType: 'Road', name: 'GP5000 S TR', price: 160, weight: 450, brand: 'Continental', model: 'GP5000 S TR' },
  ],
  Suspension: [
    { id: 's1', category: 'Suspension', bikeType: 'MTB', name: 'Fox 34 Float Factory', price: 1050, weight: 1738, brand: 'Fox', model: '34 Float Factory' },
    { id: 's2', category: 'Suspension', bikeType: 'MTB', name: 'RockShox SID Ultimate', price: 950, weight: 1650, brand: 'RockShox', model: 'SID Ultimate' },
    { id: 's3', category: 'Suspension', bikeType: 'MTB', name: 'Fox 32 Step-Cast Factory', price: 1100, weight: 1580, brand: 'Fox', model: '32 Step-Cast Factory' },
  ],
  Frame: [
    { id: 'f1', category: 'Frame', bikeType: 'Fold', name: 'Titanium Main Frame', price: 2100, weight: 1800, brand: 'Custom', model: 'Titanium Main Frame' },
    { id: 'f2', category: 'Frame', bikeType: 'Fold', name: 'Carbon Front Triangle', price: 1800, weight: 1450, brand: 'Custom', model: 'Carbon Front Triangle' },
    { id: 'f3', category: 'Frame', bikeType: 'Fold', name: 'Steel Classic Frame', price: 1200, weight: 2100, brand: 'Classic', model: 'Steel Classic Frame' },
  ],
};

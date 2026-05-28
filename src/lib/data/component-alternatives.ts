import { ConfigComponent } from '@/types';

export const mockAlternatives: Record<string, ConfigComponent[]> = {
  Drivetrain: [
    { id: 'd1', category: 'Drivetrain', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano' },
    { id: 'd2', category: 'Drivetrain', name: 'SRAM Red AXS', price: 4000, weight: 2380, brand: 'SRAM' },
    { id: 'd3', category: 'Drivetrain', name: 'Campagnolo Super Record EPS', price: 4500, weight: 2450, brand: 'Campagnolo' },
  ],
  Wheelset: [
    { id: 'w1', category: 'Wheelset', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval' },
    { id: 'w2', category: 'Wheelset', name: 'Zipp 454 NSW', price: 3200, weight: 1480, brand: 'Zipp' },
    { id: 'w3', category: 'Wheelset', name: 'Enve SES 4.5', price: 2900, weight: 1550, brand: 'Enve' },
  ],
  Cockpit: [
    { id: 'c1', category: 'Cockpit', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval' },
    { id: 'c2', category: 'Cockpit', name: 'Enve SES AR', price: 550, weight: 320, brand: 'Enve' },
  ],
  Tires: [
    { id: 't1', category: 'Tires', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized' },
    { id: 't2', category: 'Tires', name: 'GP5000 S TR', price: 160, weight: 450, brand: 'Continental' },
  ],
  Suspension: [
    { id: 's1', category: 'Suspension', name: 'Fox 34 Float Factory', price: 1050, weight: 1738, brand: 'Fox' },
    { id: 's2', category: 'Suspension', name: 'RockShox SID Ultimate', price: 950, weight: 1650, brand: 'RockShox' },
    { id: 's3', category: 'Suspension', name: 'Fox 32 Step-Cast Factory', price: 1100, weight: 1580, brand: 'Fox' },
  ],
  Frame: [
    { id: 'f1', category: 'Frame', name: 'Titanium Main Frame', price: 2100, weight: 1800, brand: 'Custom' },
    { id: 'f2', category: 'Frame', name: 'Carbon Front Triangle', price: 1800, weight: 1450, brand: 'Custom' },
    { id: 'f3', category: 'Frame', name: 'Steel Classic Frame', price: 1200, weight: 2100, brand: 'Classic' },
  ],
};

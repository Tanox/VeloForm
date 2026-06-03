// prototype/scripts/data.js v3.5.0
const componentData = {
  road: {
    frame: [
      { id: 'frame-1', name: 'Specialized Tarmac SL8 Pro', desc: 'Carbon, Disc Brake, Size 56', price: 2100, weight: 1.18 },
      { id: 'frame-2', name: 'Canyon Ultimate CF SLX', desc: 'Carbon, Disc Brake, Size 54', price: 2800, weight: 1.05 },
      { id: 'frame-3', name: 'Trek Emonda SLR', desc: 'Carbon, Disc Brake, Size 56', price: 2400, weight: 1.12 },
    ],
    drivetrain: [
      { id: 'drive-1', name: 'Shimano Dura-Ace Di2 R9200', desc: '12-speed, Wireless', price: 4200, weight: 2.43 },
      { id: 'drive-2', name: 'SRAM Red AXS', desc: '12-speed, Wireless', price: 4000, weight: 2.38 },
      { id: 'drive-3', name: 'Campagnolo Super Record EPS', desc: '12-speed, Electronic', price: 4500, weight: 2.45 },
    ],
    wheelset: [
      { id: 'wheel-1', name: 'Roval Rapide CLX II', desc: 'Carbon, 650b, Tubeless Ready', price: 2800, weight: 1.52 },
      { id: 'wheel-2', name: 'Zipp 454 NSW', desc: 'Carbon, 700c, Hookless', price: 3200, weight: 1.45 },
      { id: 'wheel-3', name: 'Enve SES 4.5', desc: 'Carbon, 700c, Tubeless', price: 3500, weight: 1.38 },
    ],
    cockpit: [
      { id: 'cock-1', name: 'Roval Rapide Cockpit', desc: 'Integrated Handlebar/Stem', price: 600, weight: 0.31 },
      { id: 'cock-2', name: 'Zipp SL Sprint', desc: 'Carbon Handlebar + Stem', price: 800, weight: 0.28 },
      { id: 'cock-3', name: 'Enve Compact Road', desc: 'Carbon Handlebar + Stem', price: 750, weight: 0.30 },
    ],
    tires: [
      { id: 'tire-1', name: 'Turbo Cotton 28mm', desc: 'Clincher, Pair', price: 180, weight: 0.48 },
      { id: 'tire-2', name: 'Continental GP5000', desc: 'Tubeless, Pair', price: 220, weight: 0.52 },
      { id: 'tire-3', name: 'Schwalbe Pro One', desc: 'Tubeless, Pair', price: 200, weight: 0.50 },
    ]
  },
  mtb: {
    frame: [
      { id: 'mtb-frame-1', name: 'Santa Cruz Hightower CC', desc: 'Carbon, 29er, Size L', price: 3200, weight: 2.45 },
      { id: 'mtb-frame-2', name: 'Yeti SB140 Carbon', desc: 'Carbon, 27.5", Size L', price: 3500, weight: 2.38 },
      { id: 'mtb-frame-3', name: 'Pivot Switchblade', desc: 'Carbon, 29er, Size L', price: 3100, weight: 2.52 },
    ],
    drivetrain: [
      { id: 'mtb-drive-1', name: 'SRAM XX1 Eagle AXS', desc: '12-speed, Wireless', price: 3800, weight: 2.65 },
      { id: 'mtb-drive-2', name: 'Shimano XTR Di2', desc: '12-speed, Electronic', price: 3600, weight: 2.58 },
      { id: 'mtb-drive-3', name: 'SRAM GX Eagle', desc: '12-speed, Mechanical', price: 1200, weight: 2.85 },
    ],
    wheelset: [
      { id: 'mtb-wheel-1', name: 'Enve M730', desc: 'Carbon, 29er, Tubeless', price: 2900, weight: 1.68 },
      { id: 'mtb-wheel-2', name: 'Reserve 30|HD', desc: 'Carbon, 27.5", Tubeless', price: 2600, weight: 1.72 },
      { id: 'mtb-wheel-3', name: 'DT Swiss XM 1700', desc: 'Alloy, 29er, Tubeless', price: 1200, weight: 1.95 },
    ],
    suspension: [
      { id: 'mtb-susp-1', name: 'Fox 34 Float Factory', desc: '140mm Travel, FIT4', price: 1800, weight: 1.85 },
      { id: 'mtb-susp-2', name: 'RockShox Pike Ultimate', desc: '140mm Travel, Charger 3', price: 1600, weight: 1.92 },
      { id: 'mtb-susp-3', name: 'Fox 36 Float Factory', desc: '160mm Travel, FIT4', price: 1900, weight: 2.05 },
    ],
    tires: [
      { id: 'mtb-tire-1', name: 'Maxxis Rekon 2.4', desc: 'EXO, Tubeless, Pair', price: 240, weight: 1.25 },
      { id: 'mtb-tire-2', name: 'Schwalbe Hans Dampf', desc: 'Super Trail, Pair', price: 220, weight: 1.32 },
      { id: 'mtb-tire-3', name: 'Continental Der Baron', desc: 'Protection, Pair', price: 200, weight: 1.28 },
    ]
  },
  fold: {
    frame: [
      { id: 'fold-frame-1', name: 'Brompton C Line Explore', desc: 'Steel, 16", 3-Speed', price: 2800, weight: 9.8 },
      { id: 'fold-frame-2', name: 'Tern Vektron S10', desc: 'Aluminum, 20", E-Bike', price: 4200, weight: 18.5 },
      { id: 'fold-frame-3', name: 'Birdy Street', desc: 'Aluminum, 18", 9-Speed', price: 3500, weight: 10.2 },
    ],
    drivetrain: [
      { id: 'fold-drive-1', name: 'Brompton 6-Speed', desc: 'Internal Hub, 3-Speed', price: 800, weight: 1.2 },
      { id: 'fold-drive-2', name: 'Shimano Nexus 7', desc: 'Internal Hub, 7-Speed', price: 1200, weight: 1.5 },
      { id: 'fold-drive-3', name: 'Sturmey Archer 8', desc: 'Internal Hub, 8-Speed', price: 1000, weight: 1.4 },
    ],
    wheelset: [
      { id: 'fold-wheel-1', name: 'Brompton Standard', desc: 'Alloy, 16", Standard', price: 600, weight: 1.2 },
      { id: 'fold-wheel-2', name: 'Schmolke Carbon', desc: 'Carbon, 16", Lightweight', price: 1800, weight: 0.85 },
      { id: 'fold-wheel-3', name: 'Tern Post', desc: 'Alloy, 20", E-Bike', price: 800, weight: 1.5 },
    ],
    accessories: [
      { id: 'fold-acc-1', name: 'Brompton Luggage Block', desc: 'Front Carrier Block', price: 180, weight: 0.15 },
      { id: 'fold-acc-2', name: 'Tern Deck', desc: 'Rear Rack', price: 220, weight: 0.45 },
      { id: 'fold-acc-3', name: 'Brompton Mudguard', desc: 'Full Coverage', price: 280, weight: 0.35 },
    ],
    tires: [
      { id: 'fold-tire-1', name: 'Schwalbe Marathon', desc: '16", Puncture Resistant', price: 120, weight: 0.42 },
      { id: 'fold-tire-2', name: 'Continental Contact', desc: '16", Urban', price: 100, weight: 0.38 },
      { id: 'fold-tire-3', name: 'Kojak', desc: '16", Lightweight', price: 140, weight: 0.32 },
    ]
  }
};

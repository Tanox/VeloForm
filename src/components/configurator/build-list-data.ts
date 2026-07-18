export const categoryIcons: Record<string, string> = {
  frame: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`,
  drivetrain: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
  wheels: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="1"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.05" y2="7.05"></line><line x1="16.95" y1="16.95" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.05" y2="16.95"></line><line x1="16.95" y1="7.05" x2="19.07" y2="4.93"></line>`,
  handlebar: `<path d="M18 14h-5V6h-2v8H6l6 6 6-6z"></path>`,
  saddle: `<ellipse cx="12" cy="7" rx="8" ry="3"></ellipse><path d="M4 7v5c0 4 4 6 8 6s8-2 8-6V7"></path><line x1="12" y1="13" x2="12" y2="22"></line>`,
  tires: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="5"></circle>`,
};

export const categoryLabels: Record<string, string> = {
  frame: 'Frame / 车架',
  drivetrain: 'Drivetrain / 传动',
  wheels: 'Wheels / 轮组',
  handlebar: 'Handlebar / 操控',
  saddle: 'Saddle / 座垫',
  tires: 'Tires / 轮胎',
};

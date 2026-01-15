// Learner Demo Data - Real data for interactive demo

export const learnerProfile = {
  name: 'Darius Williams',
  initials: 'DW',
  email: 'd.williams@email.com',
  avatar: '/images/testimonials/student-marcus.jpg',
  streak: 12,
  points: 2450,
};

export const programInfo = {
  name: 'USDOL Registered Barber Apprenticeship',
  status: 'Active',
  startDate: 'September 15, 2024',
  expectedCompletion: 'December 2025',
};

export const progressData = {
  overall: 42,
  theoryModules: { completed: 7, total: 12 },
  practicalHours: { completed: 847, total: 2000 },
  rtiHours: { completed: 58, total: 144 },
};

export const currentModuleData = {
  id: 8,
  title: "Module 8: Men's Haircutting Techniques",
  progress: 43,
  lessons: [
    { id: 1, title: "Introduction to Men's Cutting", duration: '15 min', type: 'video', completed: true },
    { id: 2, title: 'Tools & Equipment Setup', duration: '12 min', type: 'video', completed: true },
    { id: 3, title: 'Classic Taper Technique', duration: '25 min', type: 'video', completed: true },
    { id: 4, title: 'Low Fade Fundamentals', duration: '30 min', type: 'video', completed: false, current: true },
    { id: 5, title: 'Mid & High Fades', duration: '28 min', type: 'video', completed: false },
    { id: 6, title: 'Skin Fade Mastery', duration: '35 min', type: 'video', completed: false },
    { id: 7, title: 'Module Quiz', duration: '20 min', type: 'quiz', completed: false },
  ],
};

export const trainingHours = [
  { id: 1, date: 'Jan 14', location: 'Elite Cuts Barbershop', type: 'OJT', hours: 8, mentor: 'James Carter', verified: true },
  { id: 2, date: 'Jan 13', location: 'Elite Cuts Barbershop', type: 'OJT', hours: 8, mentor: 'James Carter', verified: true },
  { id: 3, date: 'Jan 12', location: 'Elite Cuts Barbershop', type: 'OJT', hours: 6, mentor: 'James Carter', verified: true },
  { id: 4, date: 'Jan 11', location: 'Online - Milady', type: 'RTI', hours: 2, mentor: 'System', verified: true },
];

export const scheduleItems = [
  { id: 1, title: 'Practical Training', date: 'Today', time: '9:00 AM - 5:00 PM', type: 'training' },
  { id: 2, title: 'Theory Quiz: Module 8', date: 'Thu, Jan 16', time: '7:00 PM', type: 'quiz' },
  { id: 3, title: 'Skills Assessment: Fades', date: 'Sat, Jan 18', time: '10:00 AM', type: 'assessment' },
  { id: 4, title: 'Live Q&A with Mentor', date: 'Mon, Jan 20', time: '6:00 PM', type: 'mentorship' },
];

export const achievements = [
  { id: 1, title: 'First 500 Hours', date: 'Dec 2024', icon: '/images/trades/welding-sparks.jpg', unlocked: true },
  { id: 2, title: 'Theory Master', date: 'Nov 2024', icon: '/images/healthcare/healthcare-highlight.jpg', unlocked: true },
  { id: 3, title: 'Safety Certified', date: 'Oct 2024', icon: '/images/barber-professional.jpg', unlocked: true },
  { id: 4, title: '1000 Hours', date: 'Locked', icon: '/images/trades/hvac-highlight.jpg', unlocked: false },
];

export const allModules = [
  { id: 1, title: 'Introduction to Barbering', completed: true, score: 95 },
  { id: 2, title: 'Sanitation & Safety', completed: true, score: 100 },
  { id: 3, title: 'Tools & Equipment', completed: true, score: 88 },
  { id: 4, title: 'Hair Science', completed: true, score: 92 },
  { id: 5, title: 'Shampooing & Conditioning', completed: true, score: 90 },
  { id: 6, title: 'Basic Cutting Techniques', completed: true, score: 87 },
  { id: 7, title: 'Clipper Fundamentals', completed: true, score: 94 },
  { id: 8, title: "Men's Haircutting Techniques", completed: false, progress: 43 },
  { id: 9, title: 'Beard & Facial Hair', completed: false, locked: false },
  { id: 10, title: 'Chemical Services', completed: false, locked: true },
  { id: 11, title: 'Business & Client Relations', completed: false, locked: true },
  { id: 12, title: 'State Board Preparation', completed: false, locked: true },
];

// Milestone definitions and achievement checking

export interface Milestone {
  id: string;
  hours: number;
  title: string;
  description: string;
  badge: string;
}

export const BARBER_MILESTONES: Milestone[] = [
  {
    id: 'first-week',
    hours: 40,
    title: 'First Week Complete',
    description: 'Completed your first week of training',
    badge: '🎯',
  },
  {
    id: 'foundation',
    hours: 250,
    title: 'Foundation Builder',
    description: 'Built a solid foundation with 250 hours',
    badge: '🏗️',
  },
  {
    id: 'developing',
    hours: 500,
    title: 'Developing Skills',
    description: 'Reached the halfway point to 1000 hours',
    badge: '📈',
  },
  {
    id: 'intermediate',
    hours: 750,
    title: 'Intermediate Level',
    description: 'Mastered intermediate techniques',
    badge: '⭐',
  },
  {
    id: 'advanced',
    hours: 1000,
    title: 'Advanced Practitioner',
    description: 'Reached 1000 hours of training',
    badge: '🌟',
  },
  {
    id: 'expert',
    hours: 1500,
    title: 'Expert Level',
    description: 'Achieved expert status with 1500 hours',
    badge: '💫',
  },
  {
    id: 'licensure-ready',
    hours: 2000,
    title: 'Licensure Ready',
    description: 'Completed all 2000 required hours!',
    badge: '🏆',
  },
];

export function getAchievedMilestones(totalHours: number): Milestone[] {
  return BARBER_MILESTONES.filter(m => totalHours >= m.hours);
}

export function getNextMilestone(totalHours: number): Milestone | null {
  return BARBER_MILESTONES.find(m => totalHours < m.hours) || null;
}

export function checkNewMilestone(
  previousHours: number, 
  newHours: number
): Milestone | null {
  const previousMilestones = getAchievedMilestones(previousHours);
  const newMilestones = getAchievedMilestones(newHours);
  
  // Find newly achieved milestone
  const newlyAchieved = newMilestones.filter(
    m => !previousMilestones.some(pm => pm.id === m.id)
  );
  
  // Return the highest newly achieved milestone
  return newlyAchieved.length > 0 ? newlyAchieved[newlyAchieved.length - 1] : null;
}

export function getMilestoneProgress(totalHours: number): {
  current: Milestone | null;
  next: Milestone | null;
  progressPercent: number;
  hoursToNext: number;
} {
  const achieved = getAchievedMilestones(totalHours);
  const current = achieved.length > 0 ? achieved[achieved.length - 1] : null;
  const next = getNextMilestone(totalHours);
  
  let progressPercent = 0;
  let hoursToNext = 0;
  
  if (next) {
    const startHours = current?.hours || 0;
    const rangeHours = next.hours - startHours;
    const progressHours = totalHours - startHours;
    progressPercent = (progressHours / rangeHours) * 100;
    hoursToNext = next.hours - totalHours;
  } else {
    progressPercent = 100;
  }
  
  return { current, next, progressPercent, hoursToNext };
}

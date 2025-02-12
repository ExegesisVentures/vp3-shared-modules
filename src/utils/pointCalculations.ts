export function calculateCurrentPoints(pointsEarned: number, pointsSpent: number): number {
  return Math.max(0, pointsEarned - pointsSpent);
}

export function calculateQuizPoints(basePoints: number, timeToAnswer: number): number {
  // Bonus points for quick answers (within 5 seconds)
  if (timeToAnswer <= 5) {
    return Math.floor(basePoints * 1.5);
  }
  // Regular points for answers within 15 seconds
  if (timeToAnswer <= 15) {
    return basePoints;
  }
  // Reduced points for slower answers
  return Math.floor(basePoints * 0.5);
}

export function calculateStreakBonus(streak: number): number {
  return Math.floor(Math.min(streak * 10, 50));
} 
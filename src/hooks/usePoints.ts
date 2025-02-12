import { useState, useCallback } from 'react';
import { calculateCurrentPoints, calculateStreakBonus } from '../utils/pointCalculations';

interface UsePointsProps {
  initialPoints?: number;
}

export function usePoints({ initialPoints = 0 }: UsePointsProps = {}) {
  const [points, setPoints] = useState(initialPoints);
  const [streak, setStreak] = useState(0);

  const addPoints = useCallback((amount: number) => {
    setPoints((current) => current + amount);
  }, []);

  const spendPoints = useCallback((amount: number) => {
    setPoints((current) => calculateCurrentPoints(current, amount));
  }, []);

  const incrementStreak = useCallback(() => {
    setStreak((current) => current + 1);
    const bonus = calculateStreakBonus(streak + 1);
    if (bonus > 0) {
      addPoints(bonus);
    }
  }, [streak, addPoints]);

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, []);

  return {
    points,
    streak,
    addPoints,
    spendPoints,
    incrementStreak,
    resetStreak,
  };
} 
import { useState, useCallback } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { IQuiz, IQuizOption } from '../types';
import { calculateQuizPoints } from '../utils/pointCalculations';

interface UseQuizLogicProps {
  supabase: SupabaseClient;
  videoId: string;
}

export function useQuizLogic({ supabase, videoId }: UseQuizLogicProps) {
  const [currentQuiz, setCurrentQuiz] = useState<IQuiz | null>(null);
  const [quizOptions, setQuizOptions] = useState<IQuizOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizAtTimestamp = useCallback(async (timestamp: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('video_id', videoId)
        .eq('timestamp_in_seconds', Math.floor(timestamp))
        .single();

      if (quizError) throw quizError;

      if (quiz) {
        const { data: options, error: optionsError } = await supabase
          .from('quiz_options')
          .select('*')
          .eq('quiz_id', quiz.id);

        if (optionsError) throw optionsError;

        setCurrentQuiz(quiz);
        setQuizOptions(options || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [supabase, videoId]);

  const submitAnswer = useCallback(async (optionId: string, timeToAnswer: number) => {
    if (!currentQuiz) return null;

    try {
      const { data: option } = await supabase
        .from('quiz_options')
        .select('is_correct')
        .eq('id', optionId)
        .single();

      if (!option) throw new Error('Option not found');

      const pointsEarned = option.is_correct
        ? calculateQuizPoints(currentQuiz.points_awarded, timeToAnswer)
        : 0;

      return {
        isCorrect: option.is_correct,
        pointsEarned,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, [supabase, currentQuiz]);

  return {
    currentQuiz,
    quizOptions,
    loading,
    error,
    fetchQuizAtTimestamp,
    submitAnswer,
  };
} 
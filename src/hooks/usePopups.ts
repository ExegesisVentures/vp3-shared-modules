import { useState, useCallback } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { IPopup } from '../types';

interface UsePopupsProps {
  supabase: SupabaseClient;
  videoId: string;
}

export function usePopups({ supabase, videoId }: UsePopupsProps) {
  const [currentPopup, setCurrentPopup] = useState<IPopup | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopupAtTimestamp = useCallback(async (timestamp: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data: popup, error: popupError } = await supabase
        .from('popups')
        .select('*')
        .eq('video_id', videoId)
        .eq('timestamp_in_seconds', Math.floor(timestamp))
        .single();

      if (popupError) throw popupError;
      setCurrentPopup(popup);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [supabase, videoId]);

  const dismissPopup = useCallback(() => {
    setCurrentPopup(null);
  }, []);

  return {
    currentPopup,
    loading,
    error,
    fetchPopupAtTimestamp,
    dismissPopup,
  };
} 
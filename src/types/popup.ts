export interface IPopup {
  id: string;
  video_id: string;
  timestamp_in_seconds: number;
  message: string;
  type: 'motivational' | 'gamification' | 'checkpoint';
  points_awarded?: number;
}

export interface IPopupDisplay {
  isVisible: boolean;
  popup: IPopup | null;
} 
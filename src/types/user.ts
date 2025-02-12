export interface IUserProfile {
  id: string;
  email: string;
  full_name: string;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface IUserProgress {
  user_id: string;
  video_id: string;
  current_timestamp: number;
  completed: boolean;
  last_watched: string;
} 
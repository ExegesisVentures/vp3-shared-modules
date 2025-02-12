export interface IVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export interface IVideoMetadata {
  video_id: string;
  total_points_available: number;
  total_quizzes: number;
  total_popups: number;
} 
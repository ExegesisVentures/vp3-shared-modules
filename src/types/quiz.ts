export interface IQuiz {
  id: string;
  video_id: string;
  question: string;
  timestamp_in_seconds: number;
  points_awarded: number;
}

export interface IQuizOption {
  id: string;
  quiz_id: string;
  answer_text: string;
  is_correct: boolean;
}

export interface IQuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  selected_option_id: string;
  is_correct: boolean;
  points_earned: number;
  created_at: string;
} 
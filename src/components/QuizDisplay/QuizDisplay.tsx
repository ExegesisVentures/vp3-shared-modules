import React, { useState } from 'react';
import { IQuiz, IQuizOption } from '../../types';

interface QuizDisplayProps {
  quiz: IQuiz;
  options: IQuizOption[];
  onAnswer: (optionId: string) => void;
  className?: string;
}

export function QuizDisplay({ quiz, options, onAnswer, className = '' }: QuizDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  return (
    <div className={`quiz-display p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="radio"
                name="quiz-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio"
              />
              <span>{option.answer_text}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={!selectedOption}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
} 
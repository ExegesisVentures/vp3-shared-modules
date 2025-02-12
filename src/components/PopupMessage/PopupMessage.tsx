import React from 'react';
import { IPopup } from '../../types';

interface PopupMessageProps {
  popup: IPopup;
  onClose: () => void;
  className?: string;
}

export function PopupMessage({ popup, onClose, className = '' }: PopupMessageProps) {
  const getBackgroundColor = () => {
    switch (popup.type) {
      case 'motivational':
        return 'bg-green-100';
      case 'gamification':
        return 'bg-blue-100';
      case 'checkpoint':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`popup-message fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${getBackgroundColor()} ${className}`}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        ×
      </button>
      <p className="text-gray-800 pr-6">{popup.message}</p>
      {popup.points_awarded && (
        <p className="text-sm text-gray-600 mt-2">
          +{popup.points_awarded} points
        </p>
      )}
    </div>
  );
} 
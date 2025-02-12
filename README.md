# VP3 Shared Modules

This repository contains shared React components, hooks, types, and utilities for the VP3 video platform. It's designed to be used by both the admin and user frontends.

## Installation

Add this package to your project:

```bash
# Using npm
npm install git+https://github.com/yourOrg/vp3-shared-modules.git

# Using yarn
yarn add git+https://github.com/yourOrg/vp3-shared-modules.git
```

## Usage

### Components

#### QuizDisplay

A reusable component for displaying quiz questions and options:

```tsx
import { QuizDisplay } from '@vp3/shared-modules';

function VideoPlayer() {
  const handleAnswer = (optionId: string) => {
    // Handle answer selection
  };

  return (
    <QuizDisplay
      quiz={quizData}
      options={quizOptions}
      onAnswer={handleAnswer}
    />
  );
}
```

#### PopupMessage

A component for showing motivational and gamification popups:

```tsx
import { PopupMessage } from '@vp3/shared-modules';

function VideoPlayer() {
  const handleClose = () => {
    // Handle popup dismissal
  };

  return (
    <PopupMessage
      popup={popupData}
      onClose={handleClose}
    />
  );
}
```

### Hooks

#### useQuizLogic

Manages quiz state and interactions:

```tsx
import { useQuizLogic } from '@vp3/shared-modules';

function VideoPlayer() {
  const { currentQuiz, quizOptions, loading, error, fetchQuizAtTimestamp, submitAnswer } = useQuizLogic({
    supabase,
    videoId
  });
}
```

#### usePopups

Handles popup display and timing:

```tsx
import { usePopups } from '@vp3/shared-modules';

function VideoPlayer() {
  const { currentPopup, loading, error, fetchPopupAtTimestamp, dismissPopup } = usePopups({
    supabase,
    videoId
  });
}
```

#### usePoints

Manages point calculations and streak bonuses:

```tsx
import { usePoints } from '@vp3/shared-modules';

function VideoPlayer() {
  const { points, streak, addPoints, spendPoints, incrementStreak, resetStreak } = usePoints({
    initialPoints: 0
  });
}
```

### Utils

#### formatTimestamp

```tsx
import { formatTimestamp, parseTimestamp } from '@vp3/shared-modules';

const timeString = formatTimestamp(125); // "02:05"
const seconds = parseTimestamp("02:05"); // 125
```

#### pointCalculations

```tsx
import { calculateQuizPoints, calculateStreakBonus } from '@vp3/shared-modules';

const points = calculateQuizPoints(100, 5); // 150 (quick answer bonus)
const bonus = calculateStreakBonus(5); // 50 (streak bonus)
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourOrg/vp3-shared-modules.git
cd vp3-shared-modules
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run dev
```

4. Build the package:
```bash
npm run build
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

Private - All rights reserved

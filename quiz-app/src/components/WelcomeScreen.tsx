import { QuizData } from './types';

interface WelcomeScreenProps {
  quizData: QuizData;
  onStart: () => void;
}

export function WelcomeScreen({ quizData, onStart }: WelcomeScreenProps) {
  return (
    <main className="screen welcome-screen" role="main">
      <div className="welcome-card">
        <h1 className="app-title">{quizData.title}</h1>
        <p className="app-description">{quizData.description}</p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onStart}
        >
          Start Quiz
        </button>
      </div>
    </main>
  );
}
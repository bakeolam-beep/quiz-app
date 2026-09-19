import { QuizQuestion } from '../types';

interface QuizScreenProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
}

export function QuizScreen({
  question,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  onAnswerSelect,
  onNext,
  selectedAnswer,
  isAnswerSubmitted,
}: QuizScreenProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <main className="screen quiz-screen" role="main">
      <header className="quiz-header">
        <div className="question-counter">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="progress-container" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="timer" aria-live="polite">
          <span className="timer-label">Time</span>
          <span className="timer-value">{timeRemaining}s</span>
        </div>
      </header>

      <section className="question-section">
        <h2 className="question-text">{question.text}</h2>
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`option-btn ${selectedAnswer === index ? 'selected' : ''} ${isAnswerSubmitted && index === question.correctAnswer ? 'correct' : ''} ${isAnswerSubmitted && selectedAnswer === index && selectedAnswer !== question.correctAnswer ? 'incorrect' : ''}`}
              onClick={() => !isAnswerSubmitted && onAnswerSelect(index)}
              disabled={isAnswerSubmitted}
              aria-pressed={selectedAnswer === index}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="quiz-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isAnswerSubmitted}
        >
          Next Question
        </button>
      </footer>
    </main>
  );
}
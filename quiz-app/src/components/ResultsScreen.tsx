interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

export function ResultsScreen({ score, totalQuestions, onPlayAgain }: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message: string;
  if (percentage === 100) {
    message = 'Perfect score! You\'re a quiz master!';
  } else if (percentage >= 80) {
    message = 'Excellent work! You really know your stuff.';
  } else if (percentage >= 60) {
    message = 'Good job! You\'re on the right track.';
  } else if (percentage >= 40) {
    message = 'Not bad! Keep practicing to improve.';
  } else {
    message = 'Don\'t give up! Every expert was once a beginner.';
  }

  return (
    <main className="screen results-screen" role="main">
      <div className="results-card">
        <h1 className="results-title">Quiz Complete!</h1>
        <div className="score-display">
          <span className="score-value">{score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{totalQuestions}</span>
        </div>
        <p className="score-percentage">{percentage}%</p>
        <p className="results-message">{message}</p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </main>
  );
}
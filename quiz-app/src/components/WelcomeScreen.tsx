interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <main className="screen welcome-screen" role="main">
      <div className="welcome-card">
        <h1 className="app-title">Quiz App</h1>
        <p className="app-description">Test your knowledge across multiple categories. Choose a topic and see how well you score!</p>
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
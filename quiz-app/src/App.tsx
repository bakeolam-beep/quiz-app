import { useState, useEffect, useCallback, useRef } from 'react';
import type { Screen } from './types';
import { quizData } from './data';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import './App.css';

const TOTAL_TIME_PER_QUESTION = 30;

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME_PER_QUESTION);
  const [timerActive, setTimerActive] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;

  const handleStartQuiz = useCallback(() => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setTimeRemaining(TOTAL_TIME_PER_QUESTION);
    setTimerActive(true);
  }, []);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(answerIndex);
    setIsAnswerSubmitted(true);
    setTimerActive(false);
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }, [isAnswerSubmitted, currentQuestion.correctAnswer]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setTimeRemaining(TOTAL_TIME_PER_QUESTION);
      setTimerActive(true);
    } else {
      setCurrentScreen('results');
      setTimerActive(false);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handlePlayAgain = useCallback(() => {
    setCurrentScreen('welcome');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setTimeRemaining(TOTAL_TIME_PER_QUESTION);
    setTimerActive(false);
  }, []);

  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && currentScreen === 'quiz') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            setIsAnswerSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [timerActive, currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen quizData={quizData} onStart={handleStartQuiz} />;
      case 'quiz':
        return (
          <QuizScreen
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            timeRemaining={timeRemaining}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            selectedAnswer={selectedAnswer}
            isAnswerSubmitted={isAnswerSubmitted}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            score={score}
            totalQuestions={totalQuestions}
            onPlayAgain={handlePlayAgain}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;
import { useState, useEffect, useCallback } from 'react';
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
    setSelectedAnswer(answerIndex);
  }, []);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer !== null && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      setTimerActive(false);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  }, [selectedAnswer, isAnswerSubmitted, currentQuestion.correctAnswer]);

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

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && currentScreen === 'quiz') {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            handleSubmitAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, currentScreen, handleSubmitAnswer]);

  useEffect(() => {
    if (currentScreen === 'quiz') {
      setTimeRemaining(TOTAL_TIME_PER_QUESTION);
      setTimerActive(true);
    }
  }, [currentQuestionIndex, currentScreen]);

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
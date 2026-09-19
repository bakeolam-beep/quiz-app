import { QuizData } from './types';

export const quizData: QuizData = {
  title: 'Quiz App',
  description: 'Test your knowledge with our fun and challenging quiz. Answer 10 questions and see how well you score!',
  questions: [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: 'What is the largest mammal in the world?',
      options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'In which year did the Titanic sink?',
      options: ['1905', '1912', '1920', '1918'],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'What is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 3,
    },
    {
      id: 9,
      text: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
      correctAnswer: 2,
    },
  ],
};
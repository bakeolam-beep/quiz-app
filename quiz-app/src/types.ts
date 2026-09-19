export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export type Screen = 'welcome' | 'quiz' | 'results';
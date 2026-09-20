export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CategoryQuizData {
  category: Category;
  questions: QuizQuestion[];
}

export type Screen = 'welcome' | 'categories' | 'quiz' | 'results';
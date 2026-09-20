export interface QuizQuestion {
  id: string;
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

export interface QuizSession {
  categoryId: string;
  questions: QuizQuestion[];
}

export interface QuestionHistory {
  [categoryId: string]: string[];
}

export type Screen = 'welcome' | 'categories' | 'quiz' | 'results';
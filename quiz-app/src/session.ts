import type { QuizQuestion, QuizSession, QuestionHistory } from './types';

const SESSION_QUESTION_COUNT = 20;
const HISTORY_MAX_LENGTH = 50;
const STORAGE_KEY = 'quiz-question-history';

function getStoredHistory(): QuestionHistory {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
  }
  return {};
}

function saveHistory(history: QuestionHistory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
  }
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuizSession(
  categoryId: string,
  allQuestions: QuizQuestion[]
): QuizSession {
  const history = getStoredHistory();
  const usedIds = new Set(history[categoryId] ?? []);

  const unusedQuestions = allQuestions.filter((q) => !usedIds.has(q.id));
  const usedQuestions = allQuestions.filter((q) => usedIds.has(q.id));

  const shuffledUnused = fisherYatesShuffle(unusedQuestions);
  const shuffledUsed = fisherYatesShuffle(usedQuestions);

  const selectedQuestions: QuizQuestion[] = [];

  for (const q of shuffledUnused) {
    if (selectedQuestions.length >= SESSION_QUESTION_COUNT) break;
    selectedQuestions.push(q);
  }

  for (const q of shuffledUsed) {
    if (selectedQuestions.length >= SESSION_QUESTION_COUNT) break;
    selectedQuestions.push(q);
  }

  if (selectedQuestions.length < SESSION_QUESTION_COUNT) {
    const allShuffled = fisherYatesShuffle(allQuestions);
    selectedQuestions.length = 0;
    for (const q of allShuffled) {
      if (selectedQuestions.length >= SESSION_QUESTION_COUNT) break;
      selectedQuestions.push(q);
    }
  }

  const newHistory = { ...history };
  const categoryHistory = newHistory[categoryId] ?? [];
  const newIds = selectedQuestions.map((q) => q.id);
  newHistory[categoryId] = [...newIds, ...categoryHistory].slice(0, HISTORY_MAX_LENGTH);
  saveHistory(newHistory);

  return {
    categoryId,
    questions: selectedQuestions,
  };
}

export function clearCategoryHistory(categoryId: string): void {
  const history = getStoredHistory();
  delete history[categoryId];
  saveHistory(history);
}

export function clearAllHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
import type { QuizQuestion } from '../types';
import { categoryQuizData } from '../data';

const STORAGE_KEY = 'quiz-question-history';
const HISTORY_MAX_LENGTH = 40;

export function fisherYatesShuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getQuestionHistory(categoryId: string): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const history = JSON.parse(stored);
      return history[categoryId] ?? [];
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveQuestionHistory(categoryId: string, questionIds: string[]): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const history: Record<string, string[]> = stored ? JSON.parse(stored) : {};
    history[categoryId] = questionIds;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function getQuizSession(categoryId: string, count: number): QuizQuestion[] {
  const categoryData = categoryQuizData[categoryId];
  if (!categoryData) {
    return [];
  }

  const allCategoryQuestions = categoryData.questions;
  const history = getQuestionHistory(categoryId);
  const usedIds = new Set(history);

  const preferredPool = allCategoryQuestions.filter((q) => !usedIds.has(String(q.id)));
  const fallbackPool = allCategoryQuestions.filter((q) => usedIds.has(String(q.id)));

  const shuffledPreferred = fisherYatesShuffle(preferredPool);
  const shuffledFallback = fisherYatesShuffle(fallbackPool);

  const selectedQuestions: QuizQuestion[] = [];

  for (const q of shuffledPreferred) {
    if (selectedQuestions.length >= count) break;
    selectedQuestions.push(q);
  }

  for (const q of shuffledFallback) {
    if (selectedQuestions.length >= count) break;
    selectedQuestions.push(q);
  }

  const finalSession = fisherYatesShuffle(selectedQuestions);

  const newIds = finalSession.map((q) => String(q.id));
  const currentHistory = getQuestionHistory(categoryId);
  const combinedHistory = [...newIds, ...currentHistory];
  const boundedHistory = combinedHistory.slice(0, HISTORY_MAX_LENGTH);
  saveQuestionHistory(categoryId, boundedHistory);

  return finalSession;
}

import { Question } from "@/types/quiz.type";

export type QuizCreateREQ = {
  title: string;
  time: number;
  maxAttempt: number | null; // optional
  questionsNo: number; // total number of questions
  expiredAt: Date | null;
  isShowAnswer: boolean;
  questions: Question[];
};

export type QuizUpdateREQ = {
  title: string;
  time: number;
  maxAttempt: number | null; // optional
  questionsNo: number; // total number of questions
  expiredAt: Date | null;
  isShowAnswer: boolean;
  questions: Question[];
};

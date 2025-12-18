import { Question } from "@/types/quiz.type";

export type QuizContentRESP = {
  _id: string;
  time: number; // 50 (minutes)
  questionsNo: number; // total number of questions

  questions: Question[];
};

export type QuizsResponse = {
  quizs: QuizMetadata[];
};

type QuizMetadata = {
  _id: string;
  title: string; // e.g. "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 - Mã đề 1105"
  time: number; // 50 (minutes)
  maxAttempt: number | null; // optional
  questionsNo: number; // total number of questions
  expiredAt: Date | null;
  isShowAnswer: boolean;
  createdAt: string;
  updatedAt: string;
};

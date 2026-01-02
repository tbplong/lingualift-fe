export interface QuizAttempt {
  _id: string;
  quizId?: string;
  quizTitle?: string;
  userId?: string;
  startTime?: string;
  endTime?: string;
  timeTaken: number; // in seconds
  score?: number;
  totalQuestions?: number;
  isCompleted?: boolean;
  answers: UserAnswer[];
  markedForReview: number[]; // question indices marked for review (1-indexed)
}

export interface UserAnswer {
  questionIndex: number; // 1-indexed to match quiz display
  selectedAnswer: number; // -1 if not answered
  isCorrect?: boolean;
}

export interface QuizAttemptWithQuestions extends QuizAttempt {
  questions: import("./quiz.type").Question[];
}

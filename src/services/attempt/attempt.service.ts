import { API_URL } from "@/config/env";
import axios from "@/utils/custom-axios";
import { QuizAttempt } from "@/types/attempt.type";

const url = `${API_URL}/v1/attempts`;

export interface CreateAttemptRequest {
  quizId: string;
  quizTitle: string;
  startTime: string;
  endTime: string;
  timeTaken: number;
  score: number;
  totalQuestions: number;
  answers: {
    questionIndex: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  markedForReview?: number[];
}

export interface AttemptsResponse {
  attempts: QuizAttempt[];
}

const AttemptService = {
  // Create a new quiz attempt
  createAttempt: async (data: CreateAttemptRequest) => {
    return await axios.post<{ _id: string }>(`${url}/`, data);
  },

  // Get all attempts for a specific quiz
  getAttemptsByQuizId: async (quizId: string) => {
    return await axios.get<AttemptsResponse>(`${url}/?quizId=${quizId}`);
  },

  // Get a specific attempt by ID
  getAttemptById: async (attemptId: string) => {
    return await axios.get<QuizAttempt>(`${url}/${attemptId}`);
  },

  // Delete an attempt
  deleteAttempt: async (attemptId: string) => {
    return await axios.delete<string>(`${url}/${attemptId}`);
  },
};

export default AttemptService;

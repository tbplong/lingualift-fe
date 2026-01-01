import { API_URL } from "@/config/env";
import axios from "@/utils/custom-axios";
import { QuizAttempt } from "@/types/attempt.type";

const url = `${API_URL}/v1/attempts`;

export interface CreateAttemptRequest {
  quizId: string;
  quizTitle: string;
  startTime: string;

  totalQuestions: number;
  answers: {
    questionIndex: number;
    selectedAnswer: number;
    // isCorrect: boolean;
  }[];
  endTime?: string;
  timeTaken?: number;
  score?: number;
  remainingTime?: number;
  isCompleted?: boolean; // Mặc định thường là false khi POST
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
  getAttemptsByQuizId: async (quizId: string, completedOnly: boolean) => {
    return await axios.get<AttemptsResponse>(
      `${url}/?quizId=${quizId}&completedOnly=${completedOnly}`,
    );
  },

  updateAttemptById: async (attemptId: string, updateAttempt: QuizAttempt) => {
    return await axios.patch<QuizAttempt>(`${url}/${attemptId}`, updateAttempt);
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

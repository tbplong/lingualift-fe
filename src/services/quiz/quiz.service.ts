import { API_URL } from "@/config/env";
import { Quiz } from "@/types/quiz.type";
import axios from "@/utils/custom-axios";
import { QuizCreateREQ } from "./request/quiz.request";

const url = `${API_URL}/v1/quizs`;

const QuizService = {
  createQuiz: async (data: QuizCreateREQ) => {
    return await axios.post<Quiz>(`${url}/`, data);
  },
  getQuizContent: async (id: string) => {
    return await axios.get<Quiz>(`${url}/${id}`);
  },
  getQuizsMeta: async () => {
    return await axios.get<Quiz>(`${url}/`);
  },
  updateQuiz: async (id: string, data: QuizCreateREQ) => {
    return await axios.patch<Quiz>(`${url}/${id}`, data);
  },
  deleteQuiz: async (id: string) => {
    return await axios.delete<Quiz>(`${url}/${id}`);
  },
};

export default QuizService;

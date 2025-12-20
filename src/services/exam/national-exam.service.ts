import { API_URL } from "@/config/env";
import axios from "@/utils/custom-axios";

import {
  CreateNationalExamRequestDTO,
  GetNationalExamByIdResponseDTO,
  GetNationalExamsQueryParams,
  GetNationalExamsResponseDTO,
} from "./dto/national-exam.dto";

const url = `${API_URL}/v1/exams`;

const NationalExamService = {
  create: async (payload: CreateNationalExamRequestDTO) => {
    return await axios.post<{ _id: string }>(url, payload);
  },

  getExams: async (queryParams: GetNationalExamsQueryParams) => {
    return await axios.get<GetNationalExamsResponseDTO>(`${url}`, {
      params: queryParams,
    });
  },

  getExamById: async (id: string) => {
    return await axios.get<GetNationalExamByIdResponseDTO>(`${url}/${id}`);
  },

  deleteExamById: async (id: string) => {
    await axios.delete(`${url}/${id}`);
  },

  update: async (
    id: string,
    payload: Partial<CreateNationalExamRequestDTO>,
  ) => {
    await axios.patch(`${url}/${id}`, payload);
  },
};

export default NationalExamService;

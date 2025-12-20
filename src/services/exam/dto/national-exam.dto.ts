import { NationalExamTag } from "@/types/national-exam.type";

export type NationalExamDTO = {
  _id: string;
  title: string;
  level: number;
  questions: number;
  examBucket: string;
  examKey: string;
  videoLink: string;
  createdAt: Date;
  createdBy: string;
  status: NationalExamTag | null;
};

export type GetNationalExamByIdResponseDTO = NationalExamDTO;

export type CreateNationalExamRequestDTO = {
  title: string;
  status: NationalExamTag | null;
  level: number;
  questions: number;
  examBucket: string;
  examKey: string;
  videoLink: string;
};

export type GetNationalExamsResponseDTO = {
  page: number;
  pageSize: number;
  totalPage: number;
  pinnedExams?: NationalExamDTO[];
  result: NationalExamDTO[];
};

export type GetNationalExamsQueryParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  level?: string;
};

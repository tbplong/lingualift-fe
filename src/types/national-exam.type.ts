export const NationalExamTagValue = {
  NEW: "NEW",
  HOT: "HOT",
} as const;

export type NationalExamTag =
  (typeof NationalExamTagValue)[keyof typeof NationalExamTagValue];

export type Pdf = {
  isPublic?: boolean;
  isPublicDownload?: boolean;
  isAvailable?: boolean;
  isAccessible?: boolean;
  bucket: string | null;
  key: string | null;
  isDownloadable?: boolean;
};

export type Video = {
  isPublic?: boolean;
  isAccessible?: boolean;
  source: { link: string | null };
};

export type NationalQuiz = {
  isAvailable: boolean;
  isAccessible: boolean;
  isMockTest?: boolean;
  _id: string;
};

export type Vocabulary = {
  _id: string;
  isAvailable: boolean;
  isAccessible: boolean;
};

export const SortOption = {
  LATEST: "Latest",
  OLDEST: "Oldest",
} as const;

export const SortQueryParams = {
  [SortOption.LATEST]: "desc",
  [SortOption.OLDEST]: "asc",
} as const;

export type SortOptionType = (typeof SortOption)[keyof typeof SortOption];

export const CdnResourceTypeValue = {
  VIDEO: "VIDEO",
  FILE: "FILE",
};

export type CdnResourceType =
  (typeof CdnResourceTypeValue)[keyof typeof CdnResourceTypeValue];

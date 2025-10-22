export type UserFindByEmailRESP = {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  email: string | null;
};

export type UserProfileRESP = {
  _id: string;
  googleId: string;
  appleId: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  dateOfBirth: string | null;
  email: string;
  phone: string | null;
  isManager: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  socialMedia: {
    facebookUrl: string;
    facebookName: string;
  };
  address: string;
};

export type TokenContentDto = {
  _id: string;
  fingerprint: string;
  ip?: string;
  browser?: string;
  version?: string;
  os?: string;
  model?: string;
  createdAt: string;
  isActivate: boolean;
};

export type UserAuthHistoryRESP = {
  user: {
    _id: string;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
    picture: string | null;
    socialMedia: {
      facebookName: string | null;
      facebookUrl: string | null;
    };
    hightSchool: string | null;
    isBanned?: boolean;
  };
  page: number;
  pageSize: number;
  totalPage: number;
  result: TokenContentDto[];
};

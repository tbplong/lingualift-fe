import {
  UserAuthHistoryRESP,
  UserFindByEmailRESP,
  UserProfileRESP,
} from "../response/user.response";

export type UserFindByEmailDTO = UserFindByEmailRESP;

export type UserProfileDTO = Omit<UserProfileRESP, "createdAt" | "updatedAt">;

export type UserAuthHistoryDTO = UserAuthHistoryRESP;

import { API_URL } from "@/config/env";
import { User } from "@/types";
import axios from "@/utils/custom-axios";

import { UserUpdateREQ } from "./request/user.request";

const url = `${API_URL}/v1/users`;

const UserService = {
  getUserProfile: async () => {
    return await axios.get<User>(`${url}/profile`);
  },
  updateProfile: async (data: UserUpdateREQ) => {
    return await axios.patch<User>(`${url}/profile`, data);
  },
  findUserByEmail: async (email: string) => {
    return await axios.post<User>(`${url}/find`, {
      email,
    });
  },

  editProfile: async (data: UserUpdateREQ) => {
    return await axios.patch<Promise<User>>(`${url}/profile`, {
      firstName: data.firstName,
      lastName: data.lastName,
      highSchool: data.highSchool,
      phone: data.phone,
      socialMedia: data.socialMedia,
      address: data.address,
    });
  },
};

export default UserService;

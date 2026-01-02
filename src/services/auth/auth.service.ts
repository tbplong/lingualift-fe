import { API_URL } from "@/config/env";
import axios from "@/utils/custom-axios";

const url = `${API_URL}/v1/auth`;

const AuthService = {
  signUp: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phone: string,
  ) => {
    return await axios.post<{
      accessToken: string;
      hasPassword: boolean;
      isFirstLogin: boolean;
      activeTokenCount: number;
    }>(`${url}/signup`, {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phone,
    });
  },
  login: async (email: string, password: string) => {
    return await axios.post<{
      accessToken: string;
      hasPassword: boolean;
      isFirstLogin: boolean;
      activeTokenCount: number;
    }>(`${url}/login`, {
      email,
      password,
    });
  },
  loginWithGoogle: async (idToken: string) => {
    return await axios.post<{
      accessToken: string;
      hasPassword: boolean;
      isFirstLogin: boolean;
    }>(`${url}/google`, { idToken });
  },
  logout: async () => {
    await axios.delete<void>(`${url}/logout`);
  },
};

export default AuthService;

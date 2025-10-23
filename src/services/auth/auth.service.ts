import axios from "@/utils/custom-axios";
const AuthService = {
  login: async (email: string, password: string) => {
    return await axios.post<{
      accessToken: string;
    }>(`auth/login`, {
      email,
      password,
    });
  },
  signup: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateofBirth: string,
    phone: string,
  ) => {
    console.log("Signup is called");
    return await axios.post<{
      accessToken: string;
    }>(`auth/signup`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateofBirth,
      phone: phone,
    });
  },
};

export default AuthService;

import axios from "axios";

import { API_URL } from "@/config/env";

import storage from "./storage";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token: string | null = storage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  async (error) => {
    console.error("Error in axios");
    Promise.reject(error);
  },
);

export default instance;

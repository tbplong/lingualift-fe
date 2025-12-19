import axios from "axios";
import storage from "@/utils/storage";

const API_URL = import.meta.env.VITE_API_URL; // ví dụ: http://localhost:3000

export type DashboardSummary = {
  timeThisWeekMin: number;
  completed: number;
  accuracyPercent: number;
};

export type WeeklyPoint = {
  date: string; // YYYY-MM-DD
  minutes: number;
  completed: number;
  accuracy: number;
};

export type DashboardWeekly = {
  weekStart: string; // ISO
  weekEnd: string; // ISO
  points: WeeklyPoint[];
  sparklines: {
    minutes: number[];
    completed: number[];
    accuracy: number[];
  };
};

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const token = storage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const DashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const res = await client.get("/v1/dashboard/summary");
    return res.data;
  },

  async getWeekly(): Promise<DashboardWeekly> {
    const res = await client.get("/v1/dashboard/weekly");
    return res.data;
  },
};

export default DashboardService;

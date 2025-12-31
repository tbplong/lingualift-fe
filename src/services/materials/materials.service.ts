import axios from "axios";
import storage from "@/utils/storage";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const http = axios.create({
  baseURL: API_BASE,
});

http.interceptors.request.use((config) => {
  const token = storage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type MaterialItem = {
  _id: string;
  title: string;
  fileUrl: string;
  originalName: string;
  size: number;
  createdAt: string;
};

const MaterialsService = {
  async list(): Promise<MaterialItem[]> {
    const res = await http.get("/v1/materials");
    return res.data;
  },

  async upload(file: File, title?: string): Promise<MaterialItem> {
    const form = new FormData();
    form.append("file", file);
    if (title) form.append("title", title);

    const res = await http.post("/v1/materials/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};

export default MaterialsService;

import axios from "axios";

import { API_URL } from "@/config/env";

const url = "https://cdn.fessior.com";
const api_url = API_URL;

const CdnService = {
  getContent: async (bucket: string, key: string) => {
    return axios.get<Blob>(`${url}/content/${bucket}/${key}`, {
      responseType: "blob",
    });
  },
  getPresignedUrl: async (key: string) => {
    return axios.post<{ url: string }>(`${api_url}/v1/storage/`, {
      key,
    });
  },
  uploadToStorage: async (presignedUrl: string, file: Blob) => {
    return axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    });
  },
};

export default CdnService;

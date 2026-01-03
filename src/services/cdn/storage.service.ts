import axios from "axios";

const StorageService = {
  uploadToStorage: async (presignedUrl: string, file: Blob) => {
    return axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    });
  },
};

export default StorageService;

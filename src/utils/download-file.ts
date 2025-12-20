import CdnService from "@/services/cdn/cdn.service";
import { toast } from "react-toastify";

export type IDownloadFile = {
  bucket: string;
  key: string;
  downloadToken?: string;
  title?: string;
  callback?: () => void;
};

export const downloadFile = async ({
  bucket,
  key,
  title = "Untitled.pdf",
  callback,
}: IDownloadFile) => {
  try {
    const { data } = await CdnService.getContent(bucket, key);
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    callback?.();
  } catch {
    toast.error("Quá trình download thất bại, vui lòng thử lại sau");
  }
};

export const getLevelFilterQuery = (minLevel: number, maxLevel: number) => {
  return `${minLevel}-${maxLevel}`;
};

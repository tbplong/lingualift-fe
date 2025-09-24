import { AxiosError } from "axios";

const defaultMessage = "Something went wrong. Please try again.";

const handleAxiosError = (
  error: unknown,
  cb: (message: string, error?: unknown) => void,
) => {
  if (error instanceof AxiosError) {
    try {
      const data = error.response?.data as {
        message: Array<string> | string;
        error: string;
        statusCode: number;
      };
      if (!data) cb(defaultMessage, error);
      if (typeof data.message === "string") {
        cb(data.message, error);
      } else {
        data.message.forEach((piece) => {
          cb(piece, error);
        });
      }
    } catch (axioserror) {
      console.error(axioserror);
      cb(defaultMessage, error);
    }
  } else {
    console.error(error);
    cb(defaultMessage, error);
  }
};

export default handleAxiosError;

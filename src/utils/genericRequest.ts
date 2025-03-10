import axios from "axios";
import { LogService } from "@/services/LogService/logService";

export const genericRequest = async (
  url: string,
  method: string,
  body?: any
) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });
    return response;
  } catch (error: any) {
    await LogService.log("error", `Error in genericRequest: ${error.message}`, {
      url,
      method,
      body,
      error,
    });
    throw error;
  }
};
import { genericRequest } from "@/utils/genericRequest";
import { LogService } from "../LogService/logService";
import type { Event } from "@/interfaces/Event/event";

const baseUrl = import.meta.env.VITE_EVENT_URL;

const handleError = async (error: any, context: string) => {
  const errorMessage = `Error during ${context}: ${error.message}`;
  console.error(errorMessage);

  const errorDetails = {
    response: error.response
      ? {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        }
      : null,
    request: error.request || null,
    message: error.message,
  };

  await LogService.log("error", errorMessage, errorDetails);
  throw error;
};

//Por arreglar
export const getEventsByUser = async () => {
  try {
    return await genericRequest(baseUrl + "/events", "GET");
  } catch (error) {
    await handleError(error, "getEventsByUser");
  }
};

export const postEvent = async (data: any) => {
  try {
    return await genericRequest(baseUrl + "/Create", "POST", data);
    // console.log(data);
  } catch (error) {
    await handleError(error, "postEvent");
  }
};

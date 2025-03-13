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
export const getEventsByUser = async (idUser: number) => {
  try {
    const response = await genericRequest(
      baseUrl + `/GetEventsByUser/${idUser}`,
      "GET"
    );
    console.log(response);
    
    return response;
  } catch (error) {
    await handleError(error, "getEventsByUser");
  }
};

export const postEvent = async (data: any) => {
  try {
    const response = await genericRequest(baseUrl + "/Create", "POST", data);
    return response;
    // console.log(data);
  } catch (error) {
    await handleError(error, "postEvent");
  }
};

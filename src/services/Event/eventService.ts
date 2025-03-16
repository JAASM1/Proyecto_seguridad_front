import { genericRequest } from "@/utils/genericRequest";
import { LogService } from "../LogService/logService";
import type { Event, EventForm } from "@/interfaces/Event/event";

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
    return response;
  } catch (error) {
    await handleError(error, "getEventsByUser");
  }
};

export const getEventById = async (id: number) => {
  try {
    const response = await genericRequest(
      baseUrl + `/GetEventById/${id}`,
      "GET"
    );
    return response;
  } catch (error) {
    await handleError(error, "getEventById");
  }
};

export const postEvent = async (data: any) => {
  try {
    const response = await genericRequest(baseUrl + "/Create", "POST", data);
    return response;
  } catch (error) {
    await handleError(error, "postEvent");
  }
};

export const putEvent = async (idEvent: number, data:any) => {
  try {
    const response = await genericRequest(
      baseUrl + `/Update/${idEvent}`,
      "PUT",
      data
    );
    return response;
  } catch (error) {
    await handleError(error, "putEvent");
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const response = await genericRequest(
      baseUrl + `/Delete/${id}`,
      "DELETE"
    );
    return response;
  } catch (error) {
    await handleError(error, "deleteEvent");
  }
};
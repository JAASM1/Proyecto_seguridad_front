// src/utils/dateUtils.ts

export const parseBackendDate = (dateString: any): Date | null => {
    if (!dateString) return null;
  
    if (typeof dateString === "string" && dateString.includes(".")) {
      const isoFormatted = dateString.replace(" ", "T").split(".")[0];
      return new Date(isoFormatted);
    }
  
    return new Date(dateString);
  };
  
  export const formatDate = (dateString: any): string => {
    const date = parseBackendDate(dateString);
    if (!date) return "";
  
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
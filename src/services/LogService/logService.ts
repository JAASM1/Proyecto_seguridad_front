import axios from "axios";

class logService {
  private static instance: logService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = "http://localhost:3000/logs";
  }

  public static getInstance(): logService {
    if (!logService.instance) {
      logService.instance = new logService();
    }
    return logService.instance;
  }

  public async log(level: "error" | "warning", message: string, details: any) {
    try {
      await axios.post(this.baseUrl, {
        level,
        message,
        details,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error logging error: ", error);
    }
  }
}

export const LogService = logService.getInstance();

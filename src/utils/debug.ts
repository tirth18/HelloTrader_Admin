/**
 * Debug utility functions
 */

/**
 * Safely logs objects to console with proper formatting
 * @param label Label for the log
 * @param data Data to log
 */
export const debugLog = (label: string, data: any) => {
  try {
    console.log(
      `[DEBUG] ${label}:`,
      typeof data === "object" ? JSON.parse(JSON.stringify(data)) : data
    );
  } catch (error) {
    console.log(`[DEBUG] ${label} (stringify failed):`, data);
  }
};

/**
 * Logs API response for debugging
 * @param response API response object
 */
export const logApiResponse = (response: any) => {
  try {
    const { status, statusText, headers, data } = response;
    console.log("[API Response]", {
      status,
      statusText,
      headers: headers ? Object.fromEntries(Object.entries(headers)) : {},
      data: data
        ? typeof data === "object"
          ? JSON.parse(JSON.stringify(data))
          : data
        : null,
    });
  } catch (error) {
    console.log("[API Response] Error logging response:", error);
    console.log("[API Response] Raw:", response);
  }
};

/**
 * Logs API error for debugging
 * @param error API error object
 */
export const logApiError = (error: any) => {
  try {
    const { message, name, code, response, request, config } = error;
    console.error("[API Error]", {
      message,
      name,
      code,
      response: response
        ? {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
          }
        : null,
      request: request ? { method: request.method, url: request.url } : null,
      config: config
        ? {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
          }
        : null,
    });
  } catch (e) {
    console.error("[API Error] Error logging error:", e);
    console.error("[API Error] Raw:", error);
  }
};

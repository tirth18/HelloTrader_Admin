const API_BASE_URL = "http://192.168.1.6:8003/api/v1";

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    // Handle unauthorized error (e.g., redirect to login)
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};

export const api = {
  get: async (endpoint: string) => {
    return await fetchWithAuth(endpoint, {
      method: "GET",
    });
  },

  post: async (endpoint: string, data: any) => {
    return await fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put: async (endpoint: string, data: any) => {
    return await fetchWithAuth(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (endpoint: string) => {
    return await fetchWithAuth(endpoint, {
      method: "DELETE",
    });
  },
};

// Custom API call for getAllUser endpoint
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://13.233.225.7:8000/api/getAllUser", {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response data:", data); // Log response for debugging
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

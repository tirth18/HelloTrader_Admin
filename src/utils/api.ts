import { API_BASE_URL } from "@/config";

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? ` ${token}` : "",
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
    const response = await fetch(`${API_BASE_URL}/api/getAllUser`, {
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

export const fetchScriptNames = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('http://13.233.225.7:8000/api/getAllScriptName', {
      headers: {
        'Authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch script names');
    }

    const data = await response.json();
    // Return an array of script names
    return data.map((script: any) => ({
      id: script._id,
      name: script.scriptname,
      segment: script.segment,
      lotSize: script.lotSize,
      instrumentToken: script.instrument_token
    }));
  } catch (error) {
    console.error('Error fetching script names:', error);
    throw error;
  }
};

export const fetchUserIds = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('http://13.233.225.7:8000/api/getAllUserId', {
      headers: {
        'Authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user IDs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user IDs:', error);
    throw error;
  }
};

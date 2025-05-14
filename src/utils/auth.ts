/**
 * Safely gets the JWT token from localStorage
 * @returns The JWT token or null if not found or error
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing localStorage for token:", error);
    return null;
  }
};

/**
 * Safely checks if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Safely gets user data from localStorage
 * @returns User data object or null if not found or error
 */
export const getUserData = (): any | null => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error accessing localStorage for user data:", error);
    return null;
  }
};

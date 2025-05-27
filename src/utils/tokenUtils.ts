/**
 * Utility functions for token management
 */

// Possible token storage keys to check
const TOKEN_KEYS = ['token', 'authToken', 'accessToken', 'jwt'];

/**
 * Get the authentication token from localStorage
 * Checks multiple possible storage keys
 */
export const getAuthToken = (): string | null => {
  for (const key of TOKEN_KEYS) {
    const token = localStorage.getItem(key);
    if (token) {
      console.log(`Token found in localStorage with key: ${key}`);
      return token;
    }
  }
  console.warn('No authentication token found in localStorage');
  return null;
};

/**
 * Set the authentication token in localStorage
 */
export const setAuthToken = (token: string, key: string = 'token'): void => {
  localStorage.setItem(key, token);
  console.log(`Token stored in localStorage with key: ${key}`);
};

/**
 * Remove the authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  TOKEN_KEYS.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.log(`Token removed from localStorage with key: ${key}`);
    }
  });
};

/**
 * Check if user is authenticated (has a valid token)
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * Debug function to show all localStorage contents
 */
export const debugLocalStorage = (): void => {
  console.log('=== localStorage Debug ===');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (TOKEN_KEYS.includes(key)) {
        console.log(`${key}: ${value?.substring(0, 20)}...`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  }
  console.log('========================');
}; 
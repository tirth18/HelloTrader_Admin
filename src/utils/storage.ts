export const getLocalStorage = (key: string): any => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

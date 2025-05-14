import { useEffect } from "react";

/**
 * Hook to ensure token persistence across page navigations
 * This helps prevent token deletion during Next.js page transitions
 */
export function useTokenPersistence() {
  useEffect(() => {
    // Function to check and log token status
    const checkToken = () => {
      const token = localStorage.getItem("token");
      console.log(
        "Token persistence check:",
        token ? "Token exists" : "No token"
      );
    };

    // Check token on mount
    checkToken();

    // Add event listeners for page visibility and focus changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkToken();
      }
    };

    const handleFocus = () => {
      checkToken();
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
}

export default useTokenPersistence;

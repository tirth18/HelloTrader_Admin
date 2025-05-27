import { useEffect, useRef } from "react";

/**
 * Custom hook to ensure proper scrollbar functionality
 * @param forceVisible - Whether to force scrollbars to be visible
 * @param direction - Scroll direction ('both', 'vertical', 'horizontal')
 */
export const useScrollbar = (
  forceVisible: boolean = true,
  direction: "both" | "vertical" | "horizontal" = "both"
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Apply scrollbar styles
    if (forceVisible) {
      element.classList.add("force-scrollbar");

      // Set overflow based on direction
      switch (direction) {
        case "vertical":
          element.style.overflowY = "auto";
          element.style.overflowX = "hidden";
          break;
        case "horizontal":
          element.style.overflowX = "auto";
          element.style.overflowY = "hidden";
          break;
        case "both":
        default:
          element.style.overflow = "auto";
          break;
      }

      // Ensure scrollbar width is set
      element.style.scrollbarWidth = "auto";
    }

    // Cleanup function
    return () => {
      if (element) {
        element.classList.remove("force-scrollbar");
      }
    };
  }, [forceVisible, direction]);

  return elementRef;
};

/**
 * Hook to apply scrollbar styles to the document body
 */
export const useGlobalScrollbar = () => {
  useEffect(() => {
    // Ensure body can scroll
    document.body.style.overflow = "auto";
    document.body.style.scrollbarWidth = "auto";

    // Ensure html can scroll
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.scrollbarWidth = "auto";

    return () => {
      // Reset on cleanup if needed
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);
};

export default useScrollbar;

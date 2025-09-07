import { useEffect, useRef } from "react";

// Manage focus for accessibility
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement>(null);

  const setFocus = (element?: HTMLElement) => {
    const target = element || focusRef.current;
    if (target) {
      target.focus();
    }
  };

  return { focusRef, setFocus };
}

// Announce content changes to screen readers
export function useAnnouncer() {
  const announce = (
    message: string,
    priority: "polite" | "assertive" = "polite"
  ) => {
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", priority);
    announcer.setAttribute("aria-atomic", "true");
    announcer.setAttribute("class", "sr-only");
    announcer.textContent = message;

    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return { announce };
}

// Keyboard navigation helper
export function useKeyboardNavigation(
  onEscape?: () => void,
  onEnter?: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onEscape?.();
          break;
        case "Enter":
          if (event.target === document.activeElement) {
            onEnter?.();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, onEnter]);
}

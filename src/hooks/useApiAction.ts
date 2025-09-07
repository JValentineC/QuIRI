import { useState, useCallback } from "react";
import { useToast } from "../contexts/ToastContext";

interface ApiError extends Error {
  status?: number;
  code?: string;
}

interface UseApiActionOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

export function useApiAction<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const toast = useToast();

  const execute = useCallback(
    async (
      apiCall: () => Promise<T>,
      options: UseApiActionOptions = {}
    ): Promise<T | null> => {
      const {
        showSuccessToast = false,
        showErrorToast = true,
        successMessage = "Operation completed successfully",
      } = options;

      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();

        if (showSuccessToast) {
          toast.success(successMessage);
        }

        return result;
      } catch (err) {
        const apiError = err as ApiError;

        // Enhanced error messages based on status codes
        let errorMessage = "An unexpected error occurred";

        if (apiError.status === 401) {
          errorMessage = "Authentication required. Please log in.";
        } else if (apiError.status === 403) {
          errorMessage =
            "Access denied. You don't have permission for this action.";
        } else if (apiError.status === 404) {
          errorMessage = "Resource not found.";
        } else if (apiError.status === 409) {
          errorMessage = "Conflict detected. This resource may already exist.";
        } else if (apiError.status === 422) {
          errorMessage = "Invalid data provided. Please check your input.";
        } else if (apiError.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (apiError.status && apiError.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (apiError.message) {
          errorMessage = apiError.message;
        }

        setError(apiError);

        if (showErrorToast) {
          toast.error(errorMessage);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return { execute, loading, error };
}

import { useState, useEffect } from "react";
import type { User, ResearchPaper, Event } from "../types/database";
import {
  userApi,
  researchApi,
  eventApi,
  collaborationApi,
  fileApi,
  folderApi,
} from "../lib/api";

// Generic hook for data fetching
function useApi<T>(apiCall: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error, refetch: () => setData(null) };
}

// User hooks
export function useUsers() {
  return useApi(() => userApi.getAll());
}

export function useUser(id: string) {
  return useApi(() => userApi.getById(id), [id]);
}

export function useProfessors() {
  return useApi(() => userApi.getProfessors());
}

export function useStudents() {
  return useApi(() => userApi.getStudents());
}

// Research hooks
export function useResearchPapers() {
  return useApi(() => researchApi.getAll());
}

export function useResearchPaper(id: string) {
  return useApi(() => researchApi.getById(id), [id]);
}

export function useResearchByField(field: string) {
  return useApi(() => researchApi.getByField(field), [field]);
}

export function useResearchByAuthor(authorId: string) {
  return useApi(() => researchApi.getByAuthor(authorId), [authorId]);
}

// Event hooks
export function useEvents() {
  return useApi(() => eventApi.getAll());
}

export function useEvent(id: string) {
  return useApi(() => eventApi.getById(id), [id]);
}

export function useUpcomingEvents() {
  return useApi(() => eventApi.getUpcoming());
}

export function usePastEvents() {
  return useApi(() => eventApi.getPast());
}

// Collaboration hooks
export function useCollaborations() {
  return useApi(() => collaborationApi.getAll());
}

export function useCollaboration(id: string) {
  return useApi(() => collaborationApi.getById(id), [id]);
}

export function useActiveCollaborations() {
  return useApi(() => collaborationApi.getActive());
}

export function useRecruitingCollaborations() {
  return useApi(() => collaborationApi.getRecruiting());
}

// File hooks
export function useFiles() {
  return useApi(() => fileApi.getAll());
}

export function useFile(id: string) {
  return useApi(() => fileApi.getById(id), [id]);
}

export function useFilesByUser(userId: string) {
  return useApi(() => fileApi.getByUser(userId), [userId]);
}

export function usePublicFiles() {
  return useApi(() => fileApi.getPublic());
}

// Folder hooks
export function useFolders() {
  return useApi(() => folderApi.getAll());
}

export function useFolder(id: string) {
  return useApi(() => folderApi.getById(id), [id]);
}

export function useFoldersByUser(userId: string) {
  return useApi(() => folderApi.getByUser(userId), [userId]);
}

// Mutation hooks for creating/updating data
export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userApi.create(userData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
      setLoading(false);
      throw err;
    }
  };

  return { createUser, loading, error };
}

export function useCreateResearchPaper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaper = async (paperData: Partial<ResearchPaper>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await researchApi.create(paperData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create research paper"
      );
      setLoading(false);
      throw err;
    }
  };

  return { createPaper, loading, error };
}

export function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async (eventData: Partial<Event>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await eventApi.create(eventData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
      setLoading(false);
      throw err;
    }
  };

  return { createEvent, loading, error };
}

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
    folderId?: string,
    privacy: string = "PUBLIC"
  ) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    if (folderId) formData.append("folderId", folderId);
    formData.append("privacy", privacy);

    try {
      const result = await fileApi.upload(formData);
      setProgress(100);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
      setLoading(false);
      throw err;
    }
  };

  return { uploadFile, loading, error, progress };
}

// Custom hook for managing local state with API sync
export function useLocalData<T>(initialData: T[]) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = (item: T) => {
    setData((prev) => [...prev, item]);
  };

  const updateItem = (index: number, updatedItem: T) => {
    setData((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
  };

  const removeItem = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const setItems = (newData: T[]) => {
    setData(newData);
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    setItems,
    setLoading,
    setError,
  };
}

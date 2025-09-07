import type {
  User,
  ResearchPaper,
  Event,
  Collaboration,
  FileUpload,
  Folder,
} from "../types/database";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// User API functions
export const userApi = {
  getAll: () => apiRequest<User[]>("/api/users"),
  getById: (id: string) => apiRequest<User>(`/api/users/${id}`),
  getProfessors: () => apiRequest<User[]>("/api/users/professors"),
  getStudents: () => apiRequest<User[]>("/api/users/students"),
  create: (userData: Partial<User>) =>
    apiRequest<User>("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  update: (id: string, userData: Partial<User>) =>
    apiRequest<User>(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/api/users/${id}`, {
      method: "DELETE",
    }),
};

// Research Paper API functions
export const researchApi = {
  getAll: () => apiRequest<ResearchPaper[]>("/api/research"),
  getById: (id: string) => apiRequest<ResearchPaper>(`/api/research/${id}`),
  getByField: (field: string) =>
    apiRequest<ResearchPaper[]>(`/api/research/field/${field}`),
  getByAuthor: (authorId: string) =>
    apiRequest<ResearchPaper[]>(`/api/research/author/${authorId}`),
  create: (paperData: Partial<ResearchPaper>) =>
    apiRequest<ResearchPaper>("/api/research", {
      method: "POST",
      body: JSON.stringify(paperData),
    }),
  update: (id: string, paperData: Partial<ResearchPaper>) =>
    apiRequest<ResearchPaper>(`/api/research/${id}`, {
      method: "PUT",
      body: JSON.stringify(paperData),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/api/research/${id}`, {
      method: "DELETE",
    }),
};

// Event API functions
export const eventApi = {
  getAll: () => apiRequest<Event[]>("/api/events"),
  getById: (id: string) => apiRequest<Event>(`/api/events/${id}`),
  getUpcoming: () => apiRequest<Event[]>("/api/events/upcoming"),
  getPast: () => apiRequest<Event[]>("/api/events/past"),
  create: (eventData: Partial<Event>) =>
    apiRequest<Event>("/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),
  update: (id: string, eventData: Partial<Event>) =>
    apiRequest<Event>(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/api/events/${id}`, {
      method: "DELETE",
    }),
  register: (eventId: string, userId: string) =>
    apiRequest<void>(`/api/events/${eventId}/register`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),
};

// Collaboration API functions
export const collaborationApi = {
  getAll: () => apiRequest<Collaboration[]>("/api/collaborations"),
  getById: (id: string) =>
    apiRequest<Collaboration>(`/api/collaborations/${id}`),
  getActive: () => apiRequest<Collaboration[]>("/api/collaborations/active"),
  getRecruiting: () =>
    apiRequest<Collaboration[]>("/api/collaborations/recruiting"),
  create: (collabData: Partial<Collaboration>) =>
    apiRequest<Collaboration>("/api/collaborations", {
      method: "POST",
      body: JSON.stringify(collabData),
    }),
  update: (id: string, collabData: Partial<Collaboration>) =>
    apiRequest<Collaboration>(`/api/collaborations/${id}`, {
      method: "PUT",
      body: JSON.stringify(collabData),
    }),
  join: (collabId: string, userId: string, role?: string) =>
    apiRequest<void>(`/api/collaborations/${collabId}/join`, {
      method: "POST",
      body: JSON.stringify({ userId, role }),
    }),
  leave: (collabId: string, userId: string) =>
    apiRequest<void>(`/api/collaborations/${collabId}/leave`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),
};

// File API functions
export const fileApi = {
  getAll: () => apiRequest<FileUpload[]>("/api/files"),
  getById: (id: string) => apiRequest<FileUpload>(`/api/files/${id}`),
  getByUser: (userId: string) =>
    apiRequest<FileUpload[]>(`/api/files/user/${userId}`),
  getPublic: () => apiRequest<FileUpload[]>("/api/files/public"),
  upload: (formData: FormData) => {
    return fetch(`${API_BASE_URL}/api/files/upload`, {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new ApiError(
          response.status,
          `Upload failed: ${response.status}`
        );
      }
      return response.json();
    });
  },
  delete: (id: string) =>
    apiRequest<void>(`/api/files/${id}`, {
      method: "DELETE",
    }),
  download: (id: string) => {
    window.open(`${API_BASE_URL}/api/files/${id}/download`, "_blank");
  },
};

// Folder API functions
export const folderApi = {
  getAll: () => apiRequest<Folder[]>("/api/folders"),
  getById: (id: string) => apiRequest<Folder>(`/api/folders/${id}`),
  getByUser: (userId: string) =>
    apiRequest<Folder[]>(`/api/folders/user/${userId}`),
  create: (folderData: Partial<Folder>) =>
    apiRequest<Folder>("/api/folders", {
      method: "POST",
      body: JSON.stringify(folderData),
    }),
  update: (id: string, folderData: Partial<Folder>) =>
    apiRequest<Folder>(`/api/folders/${id}`, {
      method: "PUT",
      body: JSON.stringify(folderData),
    }),
  delete: (id: string) =>
    apiRequest<void>(`/api/folders/${id}`, {
      method: "DELETE",
    }),
};

export { ApiError };

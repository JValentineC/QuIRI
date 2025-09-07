import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, researchApi, eventApi, collaborationApi } from "../lib/api";
import type { User, ResearchPaper, Event } from "../types/database";

// Query Keys - centralized for consistency
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  professors: ["users", "professors"] as const,
  students: ["users", "students"] as const,
  research: ["research"] as const,
  researchPaper: (id: string) => ["research", id] as const,
  researchByField: (field: string) => ["research", "field", field] as const,
  researchByAuthor: (authorId: string) =>
    ["research", "author", authorId] as const,
  events: ["events"] as const,
  event: (id: string) => ["events", id] as const,
  upcomingEvents: ["events", "upcoming"] as const,
  pastEvents: ["events", "past"] as const,
  collaborations: ["collaborations"] as const,
  collaboration: (id: string) => ["collaborations", id] as const,
  activeCollaborations: ["collaborations", "active"] as const,
};

// User Queries
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: userApi.getAll,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
}

export function useProfessors() {
  return useQuery({
    queryKey: queryKeys.professors,
    queryFn: userApi.getProfessors,
  });
}

export function useStudents() {
  return useQuery({
    queryKey: queryKeys.students,
    queryFn: userApi.getStudents,
  });
}

// Research Queries
export function useResearchPapers() {
  return useQuery({
    queryKey: queryKeys.research,
    queryFn: researchApi.getAll,
  });
}

export function useResearchPaper(id: string) {
  return useQuery({
    queryKey: queryKeys.researchPaper(id),
    queryFn: () => researchApi.getById(id),
    enabled: !!id,
  });
}

export function useResearchByField(field: string) {
  return useQuery({
    queryKey: queryKeys.researchByField(field),
    queryFn: () => researchApi.getByField(field),
    enabled: !!field,
  });
}

export function useResearchByAuthor(authorId: string) {
  return useQuery({
    queryKey: queryKeys.researchByAuthor(authorId),
    queryFn: () => researchApi.getByAuthor(authorId),
    enabled: !!authorId,
  });
}

// Event Queries
export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: eventApi.getAll,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => eventApi.getById(id),
    enabled: !!id,
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: queryKeys.upcomingEvents,
    queryFn: eventApi.getUpcoming,
  });
}

export function usePastEvents() {
  return useQuery({
    queryKey: queryKeys.pastEvents,
    queryFn: eventApi.getPast,
  });
}

// Collaboration Queries
export function useCollaborations() {
  return useQuery({
    queryKey: queryKeys.collaborations,
    queryFn: collaborationApi.getAll,
  });
}

export function useCollaboration(id: string) {
  return useQuery({
    queryKey: queryKeys.collaboration(id),
    queryFn: () => collaborationApi.getById(id),
    enabled: !!id,
  });
}

export function useActiveCollaborations() {
  return useQuery({
    queryKey: queryKeys.activeCollaborations,
    queryFn: collaborationApi.getActive,
  });
}

// Mutations
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) => userApi.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<User> }) =>
      userApi.update(id, userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useCreateResearchPaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paperData: Partial<ResearchPaper>) =>
      researchApi.create(paperData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.research });
    },
  });
}

export function useUpdateResearchPaper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      paperData,
    }: {
      id: string;
      paperData: Partial<ResearchPaper>;
    }) => researchApi.update(id, paperData),
    onSuccess: (updatedPaper) => {
      queryClient.setQueryData(
        queryKeys.researchPaper(updatedPaper.id),
        updatedPaper
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.research });
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData: Partial<Event>) => eventApi.create(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      eventData,
    }: {
      id: string;
      eventData: Partial<Event>;
    }) => eventApi.update(id, eventData),
    onSuccess: (updatedEvent) => {
      queryClient.setQueryData(queryKeys.event(updatedEvent.id), updatedEvent);
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
      queryClient.invalidateQueries({ queryKey: queryKeys.pastEvents });
    },
  });
}

// User Mutations
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) => {
      // Get the current user's ID from the authentication context
      // For now, we'll use a placeholder - this would need to be adapted based on your auth implementation
      const userId = "current-user-id"; // This should come from your auth context
      return userApi.update(userId, userData);
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

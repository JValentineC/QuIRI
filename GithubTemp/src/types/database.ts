// Types for our API responses
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "PROFESSOR" | "ADMIN";
  institution: string | null;
  department: string | null;
  bio: string | null;
  website: string | null;
  linkedin: string | null;
  profileImage: string | null;
  isPublic: boolean;
  createdAt: string;
  professorProfile?: Professor;
  studentProfile?: Student;
}

export interface Professor {
  id: string;
  title: string;
  researchAreas: string; // JSON string
  publications: number;
  projects: number;
}

export interface Student {
  id: string;
  level: "UNDERGRADUATE" | "MASTERS" | "PHD" | "POSTDOC";
  year: string;
  researchFocus: string | null;
  advisor: string | null;
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string; // JSON string
  field: string;
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "PUBLISHED" | "REJECTED";
  publishedAt: string | null;
  doi: string | null;
  downloads: number;
  createdAt: string;
  author: User;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type:
    | "CONFERENCE"
    | "WORKSHOP"
    | "SEMINAR"
    | "SUMMIT"
    | "SCHOOL"
    | "NETWORKING"
    | "OTHER";
  startDate: string;
  endDate: string | null;
  location: string;
  isVirtual: boolean;
  maxAttendees: number | null;
  registrationOpen: boolean;
  createdAt: string;
}

export interface Collaboration {
  id: string;
  title: string;
  description: string;
  status: "ACTIVE" | "RECRUITING" | "COMPLETED" | "PAUSED";
  startDate: string;
  endDate: string | null;
  createdAt: string;
  leader: User;
  participants: CollaborationParticipant[];
}

export interface CollaborationParticipant {
  id: string;
  joinedAt: string;
  role: string | null;
  isActive: boolean;
  user: User;
}

export interface FileUpload {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  privacy: "PUBLIC" | "INSTITUTION_ONLY" | "COLLABORATORS_ONLY" | "PRIVATE";
  description: string | null;
  downloads: number;
  createdAt: string;
  uploader: User;
}

export interface Folder {
  id: string;
  name: string;
  description: string | null;
  privacy: "PUBLIC" | "INSTITUTION_ONLY" | "COLLABORATORS_ONLY" | "PRIVATE";
  createdAt: string;
  owner: User;
  files: FileUpload[];
}

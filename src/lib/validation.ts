import { z } from "zod";

// Profile validation schema
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),

  institution: z
    .string()
    .max(100, "Institution name must be less than 100 characters")
    .optional(),

  department: z
    .string()
    .max(100, "Department name must be less than 100 characters")
    .optional(),

  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  linkedin: z
    .string()
    .max(100, "LinkedIn username must be less than 100 characters")
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Allow username only or full URL
      return /^[a-zA-Z0-9-]+$/.test(val) || val.includes("linkedin.com");
    }, "Please enter a valid LinkedIn username or URL"),

  twitter: z
    .string()
    .max(100, "Twitter username must be less than 100 characters")
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Allow @username, username, or full URL
      return /^@?[a-zA-Z0-9_]+$/.test(val) || val.includes("twitter.com");
    }, "Please enter a valid Twitter username or URL"),

  github: z
    .string()
    .max(100, "GitHub username must be less than 100 characters")
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Allow username only or full URL
      return /^[a-zA-Z0-9-]+$/.test(val) || val.includes("github.com");
    }, "Please enter a valid GitHub username or URL"),

  orcid: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      // ORCID format: 0000-0000-0000-0000
      return (
        /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(val) || val.includes("orcid.org")
      );
    }, "Please enter a valid ORCID ID (0000-0000-0000-0000)"),

  researchGate: z
    .string()
    .max(100, "ResearchGate profile name must be less than 100 characters")
    .optional(),
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Registration validation schema
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
      ),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    role: z.enum(["STUDENT", "PROFESSOR"], {
      message: "Please select a role",
    }),

    institution: z
      .string()
      .max(100, "Institution name must be less than 100 characters")
      .optional(),

    department: z
      .string()
      .max(100, "Department name must be less than 100 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Research paper validation schema
export const researchPaperSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be less than 200 characters"),

  abstract: z
    .string()
    .min(1, "Abstract is required")
    .min(100, "Abstract must be at least 100 characters")
    .max(5000, "Abstract must be less than 5000 characters"),

  field: z.string().min(1, "Research field is required"),

  authors: z.string().min(1, "At least one author is required"),

  doi: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return /^10\.\d{4,}\/\S+$/.test(val);
    }, "Please enter a valid DOI (e.g., 10.1000/xyz123)"),

  pdfUrl: z
    .string()
    .url("Please enter a valid PDF URL")
    .optional()
    .or(z.literal("")),
});

// Event validation schema
export const eventSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must be less than 100 characters"),

    description: z
      .string()
      .min(1, "Description is required")
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description must be less than 2000 characters"),

    type: z.string().min(1, "Event type is required"),

    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine((val) => {
        const date = new Date(val);
        return date > new Date();
      }, "Start date must be in the future"),

    endDate: z.string().min(1, "End date is required"),

    location: z
      .string()
      .min(1, "Location is required")
      .max(200, "Location must be less than 200 characters"),

    maxAttendees: z
      .number()
      .int("Maximum attendees must be a whole number")
      .min(1, "Maximum attendees must be at least 1")
      .max(10000, "Maximum attendees must be less than 10,000")
      .optional(),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

// Type exports for use in components
export type ProfileFormData = z.infer<typeof profileSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResearchPaperFormData = z.infer<typeof researchPaperSchema>;
export type EventFormData = z.infer<typeof eventSchema>;

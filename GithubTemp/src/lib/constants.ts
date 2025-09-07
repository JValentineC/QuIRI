// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

// Cache Configuration
export const CACHE_TIMES = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
} as const;

// Pagination Configuration
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGES_TO_SHOW: 5,
} as const;

// Validation Patterns
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// Social Media Platforms
export const SOCIAL_PLATFORMS = [
  {
    name: "LinkedIn",
    baseUrl: "https://www.linkedin.com/in/",
    icon: "linkedin",
  },
  { name: "Twitter", baseUrl: "https://twitter.com/", icon: "twitter" },
  { name: "GitHub", baseUrl: "https://github.com/", icon: "github" },
  { name: "Instagram", baseUrl: "https://instagram.com/", icon: "instagram" },
  { name: "Facebook", baseUrl: "https://facebook.com/", icon: "facebook" },
] as const;

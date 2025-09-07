/**
 * Formats social media links to ensure they are valid URLs
 * @param platform - The social media platform (twitter, github, linkedin, etc.)
 * @param username - The username or URL provided by the user
 * @returns A properly formatted URL
 */
export function formatSocialLink(platform: string, username: string): string {
  if (!username) return "";

  // If it's already a full URL, return it as is
  if (username.startsWith("http://") || username.startsWith("https://")) {
    return username;
  }

  // Remove leading @ symbol if present
  const cleanUsername = username.replace(/^@/, "");

  switch (platform.toLowerCase()) {
    case "twitter":
      return `https://twitter.com/${cleanUsername}`;
    case "github":
      return `https://github.com/${cleanUsername}`;
    case "linkedin":
      return `https://linkedin.com/in/${cleanUsername}`;
    case "researchgate":
      return `https://researchgate.net/profile/${cleanUsername}`;
    case "orcid":
      // ORCID can be entered as just the ID or full URL
      return username.includes("orcid.org")
        ? username
        : `https://orcid.org/${cleanUsername}`;
    default:
      // For unknown platforms, return the username as-is (could be a full URL)
      return username;
  }
}

/**
 * Validates if a string is a valid URL
 * @param string - The string to validate
 * @returns Boolean indicating if the string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Extracts the platform name from a social media URL
 * @param url - The social media URL
 * @returns The platform name or null if not recognized
 */
export function extractPlatformFromUrl(url: string): string | null {
  if (!isValidUrl(url)) return null;

  const domain = new URL(url).hostname.toLowerCase();

  if (domain.includes("twitter.com") || domain.includes("x.com"))
    return "twitter";
  if (domain.includes("github.com")) return "github";
  if (domain.includes("linkedin.com")) return "linkedin";
  if (domain.includes("researchgate.net")) return "researchgate";
  if (domain.includes("orcid.org")) return "orcid";

  return null;
}

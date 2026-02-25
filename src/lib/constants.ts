// API Configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Auth Token Keys
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

// Token Expiration (in days)
export const ACCESS_TOKEN_EXPIRY = 1 / 48; // 30 minutes
export const REFRESH_TOKEN_EXPIRY = 7; // 7 days

// Routes
export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // App (protected)
  DASHBOARD: "/dashboard",
  SUBJECTS: "/subjects",
  SUBJECT_DETAIL: (id: number | string) => `/subjects/${id}`,
  POSTS: "/posts",
  POST_DETAIL: (id: number | string) => `/posts/${id}`,
  DOCUMENTS: "/documents",
  DOCUMENT_DETAIL: (id: number | string) => `/documents/${id}`,
  PROFILE: "/profile",
  PROFILE_DETAIL: (id: number | string) => `/profile/${id}`,
  PROFILE_EDIT: "/profile/edit",
  LEADERBOARD: "/leaderboard",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_VERIFICATION: "/auth/resend-verification",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Users
  ME: "/users/me",
  USER: (id: number | string) => `/users/${id}`,
  USER_ACTIVITY: "/users/me/activity",

  // Universities & Programs
  UNIVERSITIES: "/universities",
  PROGRAMS: (universityId: number | string) =>
    `/universities/${universityId}/programs`,

  // Subjects
  SUBJECTS: "/subjects",
  SUBJECT: (id: number | string) => `/subjects/${id}`,
  MY_SUBJECTS: "/subjects/my-subjects",
  JOIN_SUBJECT: (id: number | string) => `/subjects/${id}/join`,
  LEAVE_SUBJECT: (id: number | string) => `/subjects/${id}/leave`,

  // Posts
  POSTS: "/posts",
  POST: (id: number | string) => `/posts/${id}`,
  POST_UPVOTE: (id: number | string) => `/posts/${id}/upvote`,
  POST_DOWNVOTE: (id: number | string) => `/posts/${id}/downvote`,
  POST_PIN: (id: number | string) => `/posts/${id}/pin`,

  // Replies
  REPLIES: (postId: number | string) => `/posts/${postId}/replies`,
  REPLY: (postId: number | string, replyId: number | string) =>
    `/posts/${postId}/replies/${replyId}`,
  REPLY_ACCEPT: (replyId: number | string) => `/replies/${replyId}/accept`,
  REPLY_UPVOTE: (replyId: number | string) => `/replies/${replyId}/upvote`,

  // Documents
  DOCUMENTS: "/documents",
  DOCUMENT: (id: number | string) => `/documents/${id}`,
  DOCUMENT_UPLOAD: "/documents/upload",
  DOCUMENT_DOWNLOAD: (id: number | string) => `/documents/${id}/download`,
  DOCUMENT_VERIFY: (id: number | string) => `/documents/${id}/verify`,
  DOCUMENT_UPVOTE: (id: number | string) => `/documents/${id}/upvote`,

  // Notifications
  NOTIFICATIONS: "/notifications",
  NOTIFICATION_READ: (id: number | string) => `/notifications/${id}/read`,
  NOTIFICATIONS_READ_ALL: "/notifications/read-all",
  NOTIFICATIONS_UNREAD_COUNT: "/notifications/unread-count",

  // Gamification
  LEADERBOARD: "/leaderboard",
  BADGES: "/badges",
  POINTS_HISTORY: "/points/history",
} as const;

// User Roles
export const USER_ROLES = {
  STUDENT: "STUDENT",
  AMBASSADOR: "AMBASSADOR",
  CAMPUS_LEAD: "CAMPUS_LEAD",
  ADMIN: "ADMIN",
} as const;

// Post Types
export const POST_TYPES = {
  QUESTION: "QUESTION",
  DISCUSSION: "DISCUSSION",
  ANNOUNCEMENT: "ANNOUNCEMENT",
} as const;

// Document Categories
export const DOCUMENT_CATEGORIES = {
  EXAM: "EXAM",
  COURSE: "COURSE",
  EXERCISE: "EXERCISE",
  PROJECT: "PROJECT",
  OTHER: "OTHER",
} as const;

// Academic Levels
export const ACADEMIC_LEVELS = ["L1", "L2", "L3", "M1", "M2"] as const;

// Semesters
export const SEMESTERS = ["S1", "S2", "S3", "S4", "S5", "S6"] as const;

// File Upload Limits (in bytes)
export const FILE_LIMITS = {
  STUDENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  AMBASSADOR_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  AVATAR_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_TYPES: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

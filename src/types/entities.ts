// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  points: number;
  badges: Badge[];
  avatarUrl?: string;
  bio?: string;
  universityId: string;
  universityName?: string;
  programId: string;
  programName?: string;
  level: AcademicLevel;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "STUDENT" | "AMBASSADOR" | "CAMPUS_LEAD" | "ADMIN";

export type AcademicLevel = "L1" | "L2" | "L3" | "M1" | "M2";

// Badge Types
export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt?: string;
}

// University & Program Types
export interface University {
  id: string;
  code: string;
  name: string;
  city: string;
  logoUrl?: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  universityId: string;
  levels: AcademicLevel[];
}

// Subject Types
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  programId: string;
  programName?: string;
  level: AcademicLevel;
  semester: Semester;
  postsCount: number;
  documentsCount: number;
  membersCount: number;
  isJoined?: boolean;
}

export type Semester = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

// Post Types
export interface Post {
  id: string;
  title: string;
  content: string;
  type: PostType;
  subjectId: string;
  subjectName?: string;
  authorId: string;
  author: UserSummary;
  tags: string[];
  upvotesCount: number;
  downvotesCount: number;
  repliesCount: number;
  viewsCount: number;
  isPinned: boolean;
  isResolved: boolean;
  acceptedReplyId?: string;
  userVote?: VoteType;
  createdAt: string;
  updatedAt: string;
}

export type PostType = "QUESTION" | "DISCUSSION" | "ANNOUNCEMENT";

export type VoteType = "UPVOTE" | "DOWNVOTE" | null;

export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  points: number;
}

// Reply Types
export interface Reply {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: UserSummary;
  upvotesCount: number;
  downvotesCount: number;
  isAccepted: boolean;
  userVote?: VoteType;
  createdAt: string;
  updatedAt: string;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  description?: string;
  category: DocumentCategory;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  thumbnailUrl?: string;
  subjectId: string;
  subjectName?: string;
  uploaderId: string;
  uploader: UserSummary;
  year?: number;
  semester?: Semester;
  professorName?: string;
  isVerified: boolean;
  verifiedById?: string;
  verifiedAt?: string;
  upvotesCount: number;
  downloadsCount: number;
  userVote?: VoteType;
  createdAt: string;
  updatedAt: string;
}

export type DocumentCategory =
  | "EXAM"
  | "COURSE"
  | "EXERCISE"
  | "PROJECT"
  | "OTHER";

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType =
  | "NEW_REPLY"
  | "REPLY_ACCEPTED"
  | "NEW_DOCUMENT"
  | "DOCUMENT_VERIFIED"
  | "POST_PINNED"
  | "BADGE_EARNED"
  | "UPVOTE_RECEIVED"
  | "POINTS_EARNED";

// Gamification Types
export interface LeaderboardEntry {
  rank: number;
  user: UserSummary;
  points: number;
  badgesCount: number;
}

export interface PointsHistory {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
}

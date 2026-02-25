// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  points: number;
  badges: Badge[];
  avatarUrl?: string;
  bio?: string;
  universityId: number;
  universityName?: string;
  programId: number;
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
  id: number;
  code: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt?: string;
}

// University & Program Types
export interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  logoUrl?: string;
}

export interface Program {
  id: number;
  name: string;
  code: string;
  universityId: number;
  levels: AcademicLevel[];
}

// Subject Types
export interface Subject {
  id: number;
  name: string;
  code: string;
  description?: string;
  credits: number;
  programId: number;
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
  id: number;
  title: string;
  content: string;
  type: PostType;
  subjectId: number;
  subjectName?: string;
  authorId: number;
  author: UserSummary;
  tags: string[];
  upvotesCount: number;
  downvotesCount: number;
  repliesCount: number;
  viewsCount: number;
  isPinned: boolean;
  isResolved: boolean;
  acceptedReplyId?: number;
  userVote?: VoteType;
  createdAt: string;
  updatedAt: string;
}

export type PostType = "QUESTION" | "DISCUSSION" | "ANNOUNCEMENT";

export type VoteType = "UPVOTE" | "DOWNVOTE" | null;

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  points: number;
}

// Reply Types
export interface Reply {
  id: number;
  content: string;
  postId: number;
  authorId: number;
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
  id: number;
  title: string;
  description?: string;
  category: DocumentCategory;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  thumbnailUrl?: string;
  subjectId: number;
  subjectName?: string;
  uploaderId: number;
  uploader: UserSummary;
  year?: number;
  semester?: Semester;
  professorName?: string;
  isVerified: boolean;
  verifiedById?: number;
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
  id: number;
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
  id: number;
  points: number;
  reason: string;
  createdAt: string;
}

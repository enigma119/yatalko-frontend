import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/api";

/**
 * Login user with email and password
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, data);
  return response.data;
}

/**
 * Register new user
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(API_ENDPOINTS.REGISTER, data);
  return response.data;
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<void> {
  await api.post(API_ENDPOINTS.VERIFY_EMAIL, { token });
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<void> {
  await api.post(API_ENDPOINTS.RESEND_VERIFICATION, { email });
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string): Promise<void> {
  await api.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  password: string
): Promise<void> {
  await api.post(API_ENDPOINTS.RESET_PASSWORD, { token, password });
}

/**
 * Logout user (call backend to invalidate token)
 */
export async function logout(): Promise<void> {
  try {
    await api.post(API_ENDPOINTS.LOGOUT);
  } catch {
    // Ignore errors on logout - we'll clear local state anyway
  }
}

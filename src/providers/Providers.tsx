"use client";

import { AuthProvider } from "./AuthProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Root providers wrapper
 * Add all client-side providers here (Auth, React Query, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { verifyEmail, resendVerificationEmail } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/lib/constants";
import { AxiosError } from "axios";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { user, updateUser } = useAuthStore();

  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Verify email when token is present
  const handleVerification = useCallback(async (verificationToken: string) => {
    setStatus("verifying");
    setErrorMessage("");

    try {
      await verifyEmail(verificationToken);
      setStatus("success");

      // Update user verification status in store
      if (user) {
        updateUser({ isVerified: true });
      }

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD);
      }, 3000);
    } catch (error) {
      setStatus("error");
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          "Le lien de vérification est invalide ou a expiré.";
        setErrorMessage(message);
      } else {
        setErrorMessage("Une erreur inattendue est survenue.");
      }
    }
  }, [user, updateUser, router]);

  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token, handleVerification]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle resend verification email
  const handleResend = async () => {
    if (!user?.email || resendCooldown > 0) return;

    setResendStatus("sending");

    try {
      await resendVerificationEmail(user.email);
      setResendStatus("sent");
      setResendCooldown(60); // 60 seconds cooldown
    } catch (error) {
      setResendStatus("error");
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ||
          "Impossible d'envoyer l'email. Veuillez réessayer."
        );
      }
    }
  };

  // If verifying with token
  if (token) {
    return (
      <Card className="p-8 text-center">
        {status === "verifying" && (
          <>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Vérification en cours...
            </h1>
            <p className="text-gray-600">
              Nous vérifions ton adresse email, patiente quelques instants.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email vérifié !
            </h1>
            <p className="text-gray-600 mb-6">
              Ton adresse email a été vérifiée avec succès. Tu vas être redirigé vers ton tableau de bord.
            </p>
            <Link href={ROUTES.DASHBOARD}>
              <Button>Aller au tableau de bord</Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Vérification échouée
            </h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <div className="space-y-3">
              <Button onClick={() => handleVerification(token)} variant="primary">
                Réessayer
              </Button>
              <Link href={ROUTES.LOGIN} className="block">
                <Button variant="ghost" fullWidth>
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    );
  }

  // Default: Waiting for email verification (no token)
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-primary-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Vérifie ton email
      </h1>
      <p className="text-gray-600 mb-2">
        Nous avons envoyé un lien de vérification à :
      </p>
      {user?.email && (
        <p className="font-semibold text-gray-900 mb-6">{user.email}</p>
      )}
      <p className="text-sm text-gray-500 mb-6">
        Clique sur le lien dans l&apos;email pour activer ton compte.
        N&apos;oublie pas de vérifier tes spams !
      </p>

      {/* Resend Button */}
      <div className="space-y-4">
        {resendStatus === "sent" ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              Email renvoyé ! Vérifie ta boîte de réception.
            </p>
          </div>
        ) : resendStatus === "error" ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        ) : null}

        <Button
          onClick={handleResend}
          variant="secondary"
          fullWidth
          disabled={resendStatus === "sending" || resendCooldown > 0}
        >
          {resendStatus === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Envoi en cours...
            </>
          ) : resendCooldown > 0 ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Renvoyer dans {resendCooldown}s
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Renvoyer l&apos;email
            </>
          )}
        </Button>

        <Link href={ROUTES.LOGIN}>
          <Button variant="ghost" fullWidth>
            Retour à la connexion
          </Button>
        </Link>
      </div>
    </Card>
  );
}

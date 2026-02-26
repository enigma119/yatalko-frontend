"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { Button, Input, Card } from "@/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { login } from "@/services/auth";
import { ROUTES } from "@/lib/constants";
import { AxiosError } from "axios";

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || ROUTES.DASHBOARD;

  const { login: storeLogin } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);

    try {
      const response = await login(data);

      // Store tokens and user in auth store
      storeLogin(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        response.user
      );

      // Redirect to dashboard or intended page
      router.push(redirectUrl);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer.";
        setApiError(message);
      } else {
        setApiError("Une erreur inattendue est survenue.");
      }
    }
  };

  return (
    <Card className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
        <p className="text-gray-600 mt-2">
          Content de te revoir ! Connecte-toi pour continuer.
        </p>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{apiError}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <Input
          {...register("email")}
          type="email"
          label="Adresse email"
          placeholder="ton.email@ucad.edu.sn"
          error={errors.email?.message}
          autoComplete="email"
        />

        {/* Password */}
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            label="Mot de passe"
            placeholder="••••••••"
            error={errors.password?.message}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      {/* Register Link */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Pas encore de compte ?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="text-primary-600 hover:text-primary-700 font-semibold"
        >
          Créer un compte
        </Link>
      </div>
    </Card>
  );
}

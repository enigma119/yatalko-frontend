"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";
import { Button, Input, Select, Card } from "@/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { register as registerUser } from "@/services/auth";
import { getUniversities, getPrograms } from "@/services/universities";
import { ROUTES, ACADEMIC_LEVELS } from "@/lib/constants";
import type { University, Program } from "@/types";
import { AxiosError } from "axios";

// Validation schema
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Le prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z
      .string()
      .min(1, "Le nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("Email invalide"),
    password: z
      .string()
      .min(1, "Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      ),
    confirmPassword: z.string().min(1, "La confirmation est requise"),
    universityId: z.string().min(1, "L'université est requise"),
    programId: z.string().min(1, "La filière est requise"),
    level: z.string().min(1, "Le niveau est requis"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login: storeLogin } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Universities and programs state
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      universityId: "",
      programId: "",
      level: "",
    },
  });

  const selectedUniversityId = watch("universityId");

  // Fetch universities on mount
  useEffect(() => {
    async function fetchUniversities() {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch {
        // If API fails, use mock data for development
        setUniversities([
          { id: 1, name: "Université Cheikh Anta Diop (UCAD)", shortName: "UCAD", city: "Dakar" },
          { id: 2, name: "Université Gaston Berger (UGB)", shortName: "UGB", city: "Saint-Louis" },
          { id: 3, name: "Université de Thiès (UT)", shortName: "UT", city: "Thiès" },
        ]);
      } finally {
        setLoadingUniversities(false);
      }
    }
    fetchUniversities();
  }, []);

  // Fetch programs when university changes
  useEffect(() => {
    if (!selectedUniversityId) {
      setPrograms([]);
      setValue("programId", "");
      return;
    }

    async function fetchPrograms() {
      setLoadingPrograms(true);
      try {
        const data = await getPrograms(Number(selectedUniversityId));
        setPrograms(data);
      } catch {
        // If API fails, use mock data for development
        setPrograms([
          { id: 1, name: "Informatique", code: "INFO", universityId: Number(selectedUniversityId), levels: ["L1", "L2", "L3", "M1", "M2"] },
          { id: 2, name: "Mathématiques", code: "MATH", universityId: Number(selectedUniversityId), levels: ["L1", "L2", "L3", "M1", "M2"] },
          { id: 3, name: "Physique", code: "PHYS", universityId: Number(selectedUniversityId), levels: ["L1", "L2", "L3"] },
        ]);
      } finally {
        setLoadingPrograms(false);
      }
    }
    fetchPrograms();
  }, [selectedUniversityId, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        universityId: Number(data.universityId),
        programId: Number(data.programId),
        level: data.level,
      });

      // Store tokens and user in auth store
      storeLogin(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        response.user
      );

      // Redirect to email verification page
      router.push(ROUTES.VERIFY_EMAIL);
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

  // Convert to SelectOption format
  const universityOptions = universities.map((u) => ({
    value: u.id,
    label: u.name,
  }));

  const programOptions = programs.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  const levelOptions = ACADEMIC_LEVELS.map((level) => ({
    value: level,
    label: level,
  }));

  return (
    <Card className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
        <p className="text-gray-600 mt-2">
          Rejoins la communauté Yatalko et réussis tes études !
        </p>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{apiError}</p>
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...register("firstName")}
            label="Prénom"
            placeholder="Mamadou"
            error={errors.firstName?.message}
            autoComplete="given-name"
          />
          <Input
            {...register("lastName")}
            label="Nom"
            placeholder="Diallo"
            error={errors.lastName?.message}
            autoComplete="family-name"
          />
        </div>

        {/* Email */}
        <Input
          {...register("email")}
          type="email"
          label="Adresse email"
          placeholder="ton.email@ucad.edu.sn"
          error={errors.email?.message}
          autoComplete="email"
        />

        {/* University */}
        <Select
          {...register("universityId")}
          label="Université"
          placeholder={loadingUniversities ? "Chargement..." : "Sélectionne ton université"}
          options={universityOptions}
          error={errors.universityId?.message}
          disabled={loadingUniversities}
        />

        {/* Program */}
        <Select
          {...register("programId")}
          label="Filière"
          placeholder={
            !selectedUniversityId
              ? "Sélectionne d'abord une université"
              : loadingPrograms
                ? "Chargement..."
                : "Sélectionne ta filière"
          }
          options={programOptions}
          error={errors.programId?.message}
          disabled={!selectedUniversityId || loadingPrograms}
        />

        {/* Level */}
        <Select
          {...register("level")}
          label="Niveau"
          placeholder="Sélectionne ton niveau"
          options={levelOptions}
          error={errors.level?.message}
        />

        {/* Password */}
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            label="Mot de passe"
            placeholder="••••••••"
            error={errors.password?.message}
            autoComplete="new-password"
            helperText="Au moins 8 caractères avec majuscule, minuscule et chiffre"
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

        {/* Confirm Password */}
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500">
          En créant un compte, tu acceptes nos{" "}
          <Link href="/terms" className="text-primary-600 hover:underline">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Politique de confidentialité
          </Link>
          .
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création en cours..." : "Créer mon compte"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Déjà un compte ?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="text-primary-600 hover:text-primary-700 font-semibold"
        >
          Se connecter
        </Link>
      </div>
    </Card>
  );
}

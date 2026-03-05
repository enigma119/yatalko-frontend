"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Loader2,
  HelpCircle,
  MessageCircle,
  Megaphone,
  BookOpen,
} from "lucide-react";
import { useCreatePost, useMySubjects } from "@/hooks";
import { cn } from "@/lib/utils";
import type { PostType } from "@/types/entities";

const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit contenir au moins 5 caractères")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),
  content: z
    .string()
    .min(10, "Le contenu doit contenir au moins 10 caractères")
    .max(10000, "Le contenu ne peut pas dépasser 10000 caractères"),
  type: z.enum(["QUESTION", "DISCUSSION", "ANNOUNCEMENT"]),
  tags: z.string().optional(),
  subjectId: z.string().min(1, "Veuillez sélectionner une matière"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId?: string;
}

const postTypeOptions: {
  value: PostType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "QUESTION",
    label: "Question",
    description: "Posez une question à la communauté",
    icon: <HelpCircle className="w-5 h-5" />,
    color: "border-blue-200 bg-blue-50 text-blue-700",
  },
  {
    value: "DISCUSSION",
    label: "Discussion",
    description: "Lancez un sujet de discussion",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "border-green-200 bg-green-50 text-green-700",
  },
  {
    value: "ANNOUNCEMENT",
    label: "Annonce",
    description: "Partagez une information importante",
    icon: <Megaphone className="w-5 h-5" />,
    color: "border-amber-200 bg-amber-50 text-amber-700",
  },
];

export default function CreatePostModal({
  isOpen,
  onClose,
  subjectId: initialSubjectId,
}: CreatePostModalProps) {
  const createPost = useCreatePost();
  const { data: subjects, isLoading: isLoadingSubjects } = useMySubjects();
  const [selectedType, setSelectedType] = useState<PostType>("QUESTION");

  const showSubjectSelector = !initialSubjectId;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      type: "QUESTION",
      title: "",
      content: "",
      tags: "",
      subjectId: initialSubjectId || "",
    },
    mode: "onChange",
  });

  const selectedSubjectId = watch("subjectId");

  // Update form when type changes
  useEffect(() => {
    setValue("type", selectedType);
  }, [selectedType, setValue]);

  // Set initial subjectId if provided
  useEffect(() => {
    if (initialSubjectId) {
      setValue("subjectId", initialSubjectId);
    }
  }, [initialSubjectId, setValue]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset({
        type: "QUESTION",
        title: "",
        content: "",
        tags: "",
        subjectId: initialSubjectId || "",
      });
      setSelectedType("QUESTION");
    }
  }, [isOpen, reset, initialSubjectId]);

  const onSubmit = async (data: CreatePostFormData) => {
    const tags = data.tags
      ? data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    try {
      await createPost.mutateAsync({
        title: data.title,
        content: data.content,
        type: data.type,
        subjectId: data.subjectId,
        tags,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (!isOpen) return null;

  const selectedSubject = subjects?.find((s) => s.id === selectedSubjectId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Nouvelle discussion
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Subject Selector (if no initial subjectId) */}
            {showSubjectSelector && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Matière
                </label>
                {isLoadingSubjects ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement des matières...
                  </div>
                ) : subjects && subjects.length > 0 ? (
                  <select
                    {...register("subjectId")}
                    className={cn(
                      "w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors",
                      errors.subjectId ? "border-red-300" : "border-gray-200"
                    )}
                  >
                    <option value="">Sélectionner une matière</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-gray-500">
                    Vous devez rejoindre une matière avant de pouvoir poster.
                  </p>
                )}
                {errors.subjectId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subjectId.message}
                  </p>
                )}
              </div>
            )}

            {/* Selected subject badge (if initial subjectId) */}
            {!showSubjectSelector && selectedSubject && (
              <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg">
                <BookOpen className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  {selectedSubject.name}
                </span>
              </div>
            )}

            {/* Post Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de publication
              </label>
              <div className="grid grid-cols-3 gap-3">
                {postTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedType(option.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                      selectedType === option.value
                        ? option.color
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {option.icon}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {postTypeOptions.find((o) => o.value === selectedType)?.description}
              </p>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Titre
              </label>
              <input
                id="title"
                type="text"
                placeholder={
                  selectedType === "QUESTION"
                    ? "Ex: Comment résoudre cette équation ?"
                    : "Donnez un titre à votre publication"
                }
                {...register("title")}
                className={cn(
                  "w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors",
                  errors.title ? "border-red-300" : "border-gray-200"
                )}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contenu
              </label>
              <textarea
                id="content"
                rows={6}
                placeholder="Décrivez votre question ou sujet en détail..."
                {...register("content")}
                className={cn(
                  "w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none",
                  errors.content ? "border-red-300" : "border-gray-200"
                )}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags{" "}
                <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                id="tags"
                type="text"
                placeholder="Ex: algèbre, examen, TD"
                {...register("tags")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              />
              <p className="mt-1 text-xs text-gray-400">
                Séparez les tags par des virgules
              </p>
            </div>

            {/* Error message */}
            {createPost.isError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  Erreur lors de la création du post. Veuillez réessayer.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={createPost.isPending || !isValid}
                className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createPost.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

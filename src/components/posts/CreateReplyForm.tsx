"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, X } from "lucide-react";
import { useCreateReply } from "@/hooks";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

const replySchema = z.object({
  content: z
    .string()
    .min(2, "La réponse doit contenir au moins 2 caractères")
    .max(5000, "La réponse ne peut pas dépasser 5000 caractères"),
});

type ReplyFormData = z.infer<typeof replySchema>;

interface CreateReplyFormProps {
  postId: string;
  parentId?: string;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function CreateReplyForm({
  postId,
  parentId,
  onCancel,
  placeholder = "Écrivez votre réponse...",
  autoFocus = false,
}: CreateReplyFormProps) {
  const { user } = useAuthStore();
  const createReply = useCreateReply(postId);
  const [isFocused, setIsFocused] = useState(autoFocus);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
    defaultValues: { content: "" },
    mode: "onChange",
  });

  const content = watch("content");

  const onSubmit = async (data: ReplyFormData) => {
    try {
      await createReply.mutateAsync({
        content: data.content,
        parentId,
      });
      reset();
      setIsFocused(false);
      onCancel?.();
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setIsFocused(false);
    onCancel?.();
  };

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "?";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border transition-all duration-200",
        isFocused || content ? "border-primary-200 shadow-sm" : "border-gray-100"
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 p-4">
          {/* Avatar */}
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium flex-shrink-0">
              {userInitials}
            </div>
          )}

          {/* Textarea */}
          <div className="flex-1 min-w-0">
            <textarea
              {...register("content")}
              placeholder={placeholder}
              autoFocus={autoFocus}
              onFocus={() => setIsFocused(true)}
              rows={isFocused || content ? 4 : 2}
              className={cn(
                "w-full px-3 py-2 text-sm border-0 focus:outline-none focus:ring-0 resize-none bg-transparent",
                "placeholder:text-gray-400"
              )}
            />
            {errors.content && (
              <p className="text-xs text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        {/* Actions (visible when focused or has content) */}
        {(isFocused || content) && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
            <p className="text-xs text-gray-400">
              {content.length}/5000 caractères
            </p>
            <div className="flex items-center gap-2">
              {(onCancel || parentId) && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 inline mr-1" />
                  Annuler
                </button>
              )}
              <button
                type="submit"
                disabled={createReply.isPending || !isValid}
                className="flex items-center gap-2 px-4 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createReply.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Répondre
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Error message */}
      {createReply.isError && (
        <div className="px-4 pb-3">
          <p className="text-sm text-red-600">
            Erreur lors de l&apos;envoi. Veuillez réessayer.
          </p>
        </div>
      )}
    </div>
  );
}

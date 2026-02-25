"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-semibold rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",

          // Variants
          {
            "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500":
              variant === "primary",
            "bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500":
              variant === "secondary",
            "text-primary-600 hover:bg-primary-50 focus:ring-primary-500":
              variant === "ghost",
            "bg-error hover:bg-red-600 text-white focus:ring-red-500":
              variant === "danger",
            "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500":
              variant === "outline",
          },

          // Sizes
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },

          // Full width
          fullWidth && "w-full",

          className
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

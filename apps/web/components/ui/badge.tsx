import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "error"
  | "family-fresh"
  | "family-floral"
  | "family-amber"
  | "family-woody"
  | "family-citrus"
  | "family-aromatic";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-subtle text-text-secondary",
  accent: "bg-family-amber-subtle text-family-amber",
  success: "bg-success-subtle text-success",
  error: "bg-error-subtle text-error",
  "family-fresh": "bg-family-fresh-subtle text-family-fresh",
  "family-floral": "bg-family-floral-subtle text-family-floral",
  "family-amber": "bg-family-amber-subtle text-family-amber",
  "family-woody": "bg-family-woody-subtle text-family-woody",
  "family-citrus": "bg-family-citrus-subtle text-family-citrus",
  "family-aromatic": "bg-family-aromatic-subtle text-family-aromatic",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };

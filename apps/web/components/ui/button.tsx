import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors",
  secondary:
    "border border-border-strong text-text-secondary hover:bg-surface-subtle transition-colors",
  ghost:
    "text-text-secondary hover:bg-surface-subtle transition-colors",
  danger:
    "bg-error text-text-inverse hover:opacity-90 transition-opacity",
  success:
    "bg-success text-text-inverse hover:opacity-90 transition-opacity",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3 text-base",
};

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      loadingText,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium rounded-lg
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}`}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner />}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };

import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function Card({
  hover = false,
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-surface-elevated border border-border-default rounded-xl shadow-card
        ${hover ? "hover:shadow-card-hover hover:border-border-strong transition-all duration-200" : ""}
        ${paddingClasses[padding]}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps };

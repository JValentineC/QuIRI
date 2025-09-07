import type { ReactNode } from "react";

interface ProfessionalCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "gradient" | "glass" | "minimal";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

export function ProfessionalCard({
  children,
  className = "",
  title,
  subtitle,
  icon,
  variant = "default",
  size = "md",
  hover = true,
  onClick,
}: ProfessionalCardProps) {
  const baseClasses =
    "card shadow-2xl border border-base-300/50 transition-all duration-300";

  const variantClasses = {
    default: "bg-gradient-to-br from-base-100 to-base-200",
    gradient: "bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10",
    glass: "glass",
    minimal: "bg-base-100 border-2",
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover
    ? "hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
    : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      <div className={`card-body ${sizeClasses[size]}`}>
        {(title || subtitle || icon) && (
          <div className="mb-4">
            {icon && (
              <div className="text-primary mb-3 flex justify-center">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="card-title text-2xl font-bold text-primary justify-center">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-lg text-base-content/70 text-center mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default ProfessionalCard;

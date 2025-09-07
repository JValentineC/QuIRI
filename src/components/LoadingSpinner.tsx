interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  text = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full"></div>
      </div>
      {text && (
        <p className="text-base-content/70 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}

// Quantum-themed loading animation
export function QuantumLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin"></div>
        {/* Middle ring */}
        <div
          className="absolute top-2 left-2 w-12 h-12 border-4 border-secondary/40 rounded-full animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>
        {/* Inner core */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
        {/* Quantum particles */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-accent rounded-full animate-ping"></div>
        <div
          className="absolute top-1 right-1 w-2 h-2 bg-info rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1 left-1 w-2 h-2 bg-accent rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1 right-1 w-2 h-2 bg-info rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

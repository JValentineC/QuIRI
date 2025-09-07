import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+",
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Load image when in view
  useEffect(() => {
    if (inView && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [inView, isLoaded, hasError, src, onLoad, onError]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 w-full h-full object-cover ${
          isLoaded ? "opacity-100" : "opacity-50"
        }`}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 text-base-content/50">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Hook for optimized image sources
export function useOptimizedImage(src: string) {
  // Check if browser supports WebP
  const supportsWebP = useState(() => {
    const canvas = document.createElement("canvas");
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  })[0];

  // Return WebP version if supported and available
  const optimizedSrc =
    (supportsWebP && src.endsWith(".png")) ||
    src.endsWith(".jpg") ||
    src.endsWith(".jpeg")
      ? src.replace(/\.(png|jpg|jpeg)$/, ".webp")
      : src;

  return { optimizedSrc, supportsWebP };
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SafeImageProps } from '@/types/components';

const DefaultFallback = ({ alt }: { alt: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-brand-red to-accent-yellow rounded-lg flex items-center justify-center text-white font-bold text-xs">
    {alt.charAt(0).toUpperCase()}
  </div>
);

export const SafeImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallback,
  onError 
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return fallback || <DefaultFallback alt={alt} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      priority={width && height && width <= 32 && height <= 32} // Prioritize small images like logos
    />
  );
};
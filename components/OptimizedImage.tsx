"use client";

import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
}

/**
 * OptimizedImage component that automatically serves:
 * - WebP format for modern browsers
 * - HD version (2400x1600 @ 300 DPI) for retina displays
 * - Standard version (1920x1280 @ 150 DPI) for regular displays
 * - Original as fallback
 */
export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  // Extract filename without extension
  const getImagePath = (src: string) => {
    const parts = src.split('/');
    const filename = parts[parts.length - 1];
    const name = filename.replace(/\.(jpg|jpeg|png)$/i, '');
    const dir = parts.slice(0, -1).join('/');

    return { dir, name };
  };

  const { dir, name } = getImagePath(src);

  return (
    <picture>
      {/* WebP for modern browsers - best compression */}
      <source
        type="image/webp"
        srcSet={`${dir}/webp/${name}.webp`}
        media="(min-resolution: 2dppx)"
      />
      <source
        type="image/webp"
        srcSet={`${dir}/webp/${name}.webp`}
      />

      {/* HD JPEG for retina displays */}
      <source
        type="image/jpeg"
        srcSet={`${dir}/${name}-hd.jpg`}
        media="(min-resolution: 2dppx)"
      />

      {/* Standard JPEG for regular displays */}
      <source
        type="image/jpeg"
        srcSet={`${dir}/${name}.jpg`}
      />

      {/* Fallback to Next.js Image component */}
      <Image
        src={src}
        alt={alt}
        {...props}
        quality={95}
        priority={props.priority}
      />
    </picture>
  );
}

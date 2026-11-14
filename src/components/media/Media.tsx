import Image from 'next/image';
import type { ImageAsset } from '@/types';
import { cn } from '@/utils/cn';
import { CoastalArt } from './CoastalArt';

interface MediaProps {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Real photo via next/image (AVIF/WebP, responsive, lazy) when `image.src` is set;
 * otherwise the illustrated placeholder. Always fills its positioned parent.
 */
export function Media({ image, className, sizes = '100vw', priority = false }: MediaProps) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', className)}
      />
    );
  }
  return (
    <CoastalArt
      scene={image.art.scene}
      mood={image.art.mood}
      seed={image.art.seed}
      title={image.alt}
      className={cn('absolute inset-0 block h-full w-full', className)}
    />
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { cn } from '@/utils/cn';

/**
 * "Island sunset" logo in the boat's colours (turquoise #3AAFC0, deep teal #1F5964).
 * public/images/logo.svg is fully outlined (no fonts needed); logo-mark.svg is the icon alone.
 */
export function Logo({ className }: { onScene?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={cn('inline-flex shrink-0 items-center', className)}>
      <Image src="/images/logo.svg" alt={brand.name} width={532} height={122} priority sizes="180px" className="h-10 w-auto sm:h-11" />
    </Link>
  );
}

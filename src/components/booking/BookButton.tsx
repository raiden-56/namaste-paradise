'use client';

import type { ReactNode } from 'react';
import { buttonClass, type ButtonSize, type ButtonVariant } from '@/components/ui/button';
import { useBooking } from './BookingProvider';

/** Opens the WhatsApp booking modal, optionally with a package preselected. */
export function BookButton({
  packageId,
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
}: {
  packageId?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking(packageId)} className={buttonClass(variant, size, className)}>
      {icon}
      {children}
    </button>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

const BookingModal = dynamic(() => import('./BookingModal'), { ssr: false });

interface BookingCtx {
  isOpen: boolean;
  openBooking: (packageId?: string) => void;
  closeBooking: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [packageId, setPackageId] = useState('');

  const openBooking = useCallback((id?: string) => {
    setPackageId(id ?? '');
    setMounted(true);
    setIsOpen(true);
  }, []);
  const closeBooking = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, openBooking, closeBooking }), [isOpen, openBooking, closeBooking]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted && <BookingModal open={isOpen} onClose={closeBooking} initialPackageId={packageId} />}
    </Ctx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}

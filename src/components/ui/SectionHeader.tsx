import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  id?: string;
  children?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}

/** Kicker (mono, sentence case) + serif title + optional lede. */
export function SectionHeader({ kicker, title, id, children, className, align = 'left', as: Tag = 'h2' }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-[40rem]', align === 'center' && 'mx-auto text-center', className)} data-reveal>
      {kicker && <p className="kicker mb-4">{kicker}</p>}
      <Tag id={id} className="text-title">
        {title}
      </Tag>
      {children && <div className="mt-5 max-w-[36rem] text-[17px] leading-[1.65] text-soft">{children}</div>}
    </div>
  );
}

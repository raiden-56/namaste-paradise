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
  /** Small index shown before the kicker, e.g. "02". */
  index?: string;
}

/** HUD kicker + display title + optional lede. */
export function SectionHeader({ kicker, title, id, children, className, align = 'left', as: Tag = 'h2', index }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-[44rem]', align === 'center' && 'mx-auto text-center', className)} data-reveal>
      {kicker && (
        <p className={cn('mb-5 flex items-center gap-3', align === 'center' && 'justify-center')}>
          {index && <span className="font-mono text-[12px] text-mute">{index}</span>}
          <span className="kicker">{kicker}</span>
        </p>
      )}
      <Tag id={id} className="text-title">
        {title}
      </Tag>
      {children && <div className={cn('mt-5 max-w-[36rem] text-[16px] leading-[1.7] text-soft', align === 'center' && 'mx-auto')}>{children}</div>}
    </div>
  );
}

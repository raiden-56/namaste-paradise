import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Media } from '@/components/media/Media';
import { buttonClass } from '@/components/ui/button';
import { photo } from '@/config/photos';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-page pb-16 pt-32">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="kicker">Error 404</p>
          <h1 className="mt-5 max-w-[36rem] text-hero font-semibold uppercase text-ink">This page drifted out to sea</h1>
          <p className="mt-6 max-w-[30rem] text-[17px] text-soft">The link may be broken or the page may have moved.</p>
          <Link href="/" className={buttonClass('glow', 'lg', 'mt-10')}>
            Back to shore <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-ink/[0.08] shadow-[0_40px_80px_-40px_rgb(7_24_36/0.45)]">
          <Media image={photo('gokarna-sunset-boat')} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

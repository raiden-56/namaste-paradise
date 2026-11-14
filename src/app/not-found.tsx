import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Media } from '@/components/media/Media';
import { buttonClass } from '@/components/ui/button';
import { photo } from '@/config/photos';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night text-cream">
      <div className="absolute inset-0 -z-10">
        <Media image={photo('gokarna-sunset-boat')} />
      </div>
      <div className="absolute inset-0 -z-10 bg-night/40" />
      <div className="wrap">
        <p className="font-mono text-[13px] text-[#e88d58]">404</p>
        <h1 className="mt-4 max-w-[36rem] text-hero text-cream">This page drifted out to sea</h1>
        <p className="mt-5 max-w-[30rem] text-[18px] text-cream/75">The link may be broken or the page may have moved.</p>
        <Link href="/" className={buttonClass('ember', 'lg', 'mt-9')}>
          Back to shore <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}

'use client';

/** Static-export image loader: serves the file as-is, prefixed with the GitHub Pages base path. */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${base}${src}?w=${width}`;
}

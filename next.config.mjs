/** @type {import('next').NextConfig} */

// GitHub Pages serves the site from https://<user>.github.io/<repo>/,
// so the build needs that sub-path. Set NEXT_PUBLIC_BASE_PATH="" for a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Static hosting has no image optimizer; a custom loader keeps the basePath on photo URLs.
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;

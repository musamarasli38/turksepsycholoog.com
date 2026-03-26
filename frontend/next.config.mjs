import createNextIntlPlugin from 'next-intl/plugin';

// Point to the request config for next-intl (App Router)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);

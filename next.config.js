/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}

// Conditional Sentry integration
// Only enable Sentry if the package is installed and DSN is provided
const withSentryConfig = () => {
  try {
    // Check if @sentry/nextjs is installed
    require.resolve('@sentry/nextjs');
    
    // Check if DSN is provided
    const hasDSN = process.env.NEXT_PUBLIC_SENTRY_DSN && 
                   process.env.NEXT_PUBLIC_SENTRY_DSN !== 'https://your-dsn@sentry.io/project-id';
    
    if (!hasDSN) {
      console.log('⚠️  Sentry DSN not configured. Skipping Sentry integration.');
      console.log('ℹ️  To enable Sentry, set NEXT_PUBLIC_SENTRY_DSN in your .env.local');
      return (config) => config;
    }
    
    const { withSentryConfig } = require('@sentry/nextjs');
    
    const sentryWebpackPluginOptions = {
      silent: true,
      org: 'sorrybob',
      project: 'sorrybob-net',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    };
    
    console.log('✅ Sentry integration enabled');
    return (config) => withSentryConfig(config, sentryWebpackPluginOptions);
  } catch (e) {
    // @sentry/nextjs not installed
    console.log('⚠️  @sentry/nextjs not installed. Skipping Sentry integration.');
    console.log('ℹ️  To enable Sentry: npm install @sentry/nextjs');
    return (config) => config;
  }
};

module.exports = withSentryConfig()(nextConfig);

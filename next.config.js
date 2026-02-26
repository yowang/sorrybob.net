const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// Sentry configuration for static export
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the Sentry plugin automatically handles source maps for you.
  silent: true, // Suppresses all logs
  org: 'sorrybob', // Your Sentry organization
  project: 'sorrybob-net', // Your Sentry project name
  // Only enable source map upload in production
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

// Wrap with Sentry config
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

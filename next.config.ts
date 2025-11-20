import type { NextConfig } from 'next'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^\/$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'start-page',
        expiration: { maxEntries: 1, maxAgeSeconds: 86400 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        ['script', 'style', 'worker'].includes(request.destination),
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'assets' },
    },
  ],
})

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    CURRENT_ENV: process.env.NODE_ENV,
  },
}

export default withPWA(nextConfig)

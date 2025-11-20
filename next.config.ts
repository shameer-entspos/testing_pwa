import type { NextConfig } from 'next'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true,
  // runtimeCaching: require('./runtimeCaching'),
})

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {},
  env: {
    CURRENT_ENV: process.env.CURRENT_ENV,
  },
}

export default withPWA(nextConfig)

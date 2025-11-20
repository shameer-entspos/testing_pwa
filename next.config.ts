import type { NextConfig } from 'next'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: require('./runtimeCaching'),
})

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    CURRENT_ENV: process.env.NODE_ENV,
  },
}

export default withPWA(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "http://localhost:8000",
    API_KEY: "AIzaSyC3S8GK5KxB5yIbSU1Zn2usjwMTyyHiAj0"
  },
}

module.exports = nextConfig

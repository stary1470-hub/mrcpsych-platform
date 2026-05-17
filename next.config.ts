/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensures environment variables are available at build time
  serverExternalPackages: ['@supabase/ssr'],
}

export default nextConfig

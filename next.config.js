/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'streamx.pages.dev'
      }
    ],
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  env: {
    CLOUDFLARE_API_TOKEN: "aIGIlxaB5yV8sbV0uReQUfvF1qJZ2t_zxndmMWYa",
    CLOUDFLARE_ACCOUNT_ID: "7eacbeefb829077bbba9aa7f034d7ed9",
    CLOUDFLARE_ZONE_ID: "9862c5982dc291a4f7f06c5a2e8c55e2",
    D1_DATABASE_ID: "0564b07f-03b6-458d-bc19-624ffcbc20ff",
    R2_BUCKET_NAME: "streamx-storage",
    KV_NAMESPACE_ID: "a80b1c151d7e4559a9cbeb186ac09ab3"
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = nextConfig 
import type { NextConfig } from 'next/types'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // تفعيل فحص ESLint للحصول على كود أكثر جودة
    ignoreDuringBuilds: false,
  },
  typescript: {
    // تفعيل فحص TypeScript لضمان سلامة الأنواع
    ignoreBuildErrors: false,
  },
}

export default nextConfig

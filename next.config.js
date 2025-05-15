/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['node-fetch'],
  typescript: {
    // 빌드 시 타입 체크 건너뛰기 (배포 속도 향상)
    ignoreBuildErrors: true,
  },
  eslint: {
    // 빌드 시 ESLint 검사 건너뛰기 (배포 속도 향상)
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jullukhieundpgwtbmxt.supabase.co',
        pathname: '/storage/v1/object/public/files/profile-pictures/**',
      },
    ],
  },
};

export default nextConfig;

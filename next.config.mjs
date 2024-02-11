/** @type {import('next').NextConfig} */ 

const nextConfig = {
  experimental: {
    serverActions: {
      mdxRs: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};


export default nextConfig;
 
/** @type {import('next').NextConfig} */ 

// const nextConfig = {
//   experimental: {
//     serverActions: {
//       mdxRs: true,
//       serverComponentsExternalPackages: ["mongoose"],
//     },
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "img.clerk.com",
//         port: "",
//         // pathname: "/account123/**",
//       },
//     ],
//   },
// };



import withImages from 'next-images'
const nextConfig = {
  experimental: {
    serverActions: {
      mdxRs: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
  },
  ...withImages(),
  images: {
    domains: ['img.clerk.com', 'localhost', 'gec-portal.vercel.app', 'https://gec-portal.vercel.app/all-events', 'https://gec-portal.vercel.app/', 'http://gec-portal.vercel.app/all-events', 'gec-portal.vercel.app/all-events'],
  },
};
 
export default nextConfig; 
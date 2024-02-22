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
    domains: ['img.clerk.com', 'localhost'],
  },
};
 
export default nextConfig; 
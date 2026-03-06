// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   images: {
//     domains: ["127.0.0.1", "localhost"], // ✅ whitelist backend host
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["127.0.0.1", "localhost"],
  },
};

export default nextConfig;
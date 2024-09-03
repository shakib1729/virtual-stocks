/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.finnhub.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

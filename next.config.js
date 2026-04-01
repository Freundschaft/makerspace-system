/** @type {import('next').NextConfig} */
const fileServerHost = (process.env.FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org")
  .replace(/^https?:\/\//, "")
  .replace(/\/.*$/, "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: fileServerHost,
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig; 

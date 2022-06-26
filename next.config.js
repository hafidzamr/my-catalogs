/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['api.lorem.space', 'placeimg.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

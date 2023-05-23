/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
  },
};

module.exports = nextConfig;

// in domains environmental variable is added to make it possible for Image to serve images

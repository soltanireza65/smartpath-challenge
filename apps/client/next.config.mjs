/** @type {import('next').NextConfig} */
const nextConfig = {
  //   rewrites: [
  //     {
  //       source: "/api",
  //       destination: "http://localhost:8000/api",
  //     },
  //   ],
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:8000/api",
      },
    ];
  },
};

export default nextConfig;

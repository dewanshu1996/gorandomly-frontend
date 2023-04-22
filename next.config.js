/** @type {import('next').NextConfig} */

// const proxyForApi = {
//   async rewrites() {
//       return [
//         {
//           source: '/api/:path',
//           destination: 'http://localhost:8000/api/:path',
//         },
//       ]
//     },
// };
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: "/frontend",
};

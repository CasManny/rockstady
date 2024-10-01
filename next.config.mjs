/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            { hostname: "www.flaticon.com" },
            { hostname: 'utfs.io'},
            { hostname: 'img.clerk.com'}
        ]
    }
};

export default nextConfig;

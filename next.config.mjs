/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {hostname: "www.flaticon.com"}
        ]
    }
};

export default nextConfig;

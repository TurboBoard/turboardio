/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    experimental: {
        // This is experimental but can
        // be enabled to allow parallel threads
        // with nextjs automatic static generation
        workerThreads: false,
        cpus: 1,
    },
};

module.exports = nextConfig;

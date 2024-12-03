/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 's4.anilist.co',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'placehold.co',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'media.kitsu.app',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'artworks.thetvdb.com',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'i.animepahe.ru',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'kitsu-production-media.s3.us-west-002.backblazeb2.com',
            port: ''
         }
      ]
   },
   env: {
      PROVIDER: process.env.PROVIDER,
      API_URL: process.env.API_URL,
      PROXY: process.env.PROXY
   },
   async rewrites() {
      return [
         {
            source: '/old',
            destination: 'https://nim-flix.vercel.app'
         }
      ]
   }
};

export default nextConfig;
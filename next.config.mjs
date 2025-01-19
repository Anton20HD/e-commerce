/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|avi)$/, // Match video file extensions
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // Files smaller than 10kb will be inlined as Base64 URIs
              fallback: 'file-loader',
              publicPath: '/_next/static/videos/', // Serve the videos from this path
              outputPath: 'static/videos/', // Output directory for video files
              name: '[name].[hash].[ext]', // File naming convention
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  
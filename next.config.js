/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CSS Modules optimization (temporarily disabled)
  // experimental: {
  //   optimizeCss: true,
  //   cssChunking: 'all',
  // },

  // Bundle analyzer configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Enable bundle analyzer in development or when ANALYZE is set
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')();
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer 
            ? '../analyze/server.html' 
            : './analyze/client.html',
          defaultSizes: 'parsed',
          openAnalyzer: false,
        })
      );
    }

    // CSS Modules configuration for better development experience
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('css')) {
        rule.use?.forEach((use) => {
          if (use.loader?.includes('css-loader') && use.options?.modules) {
            // Customize CSS Modules class naming
            use.options.modules = {
              ...use.options.modules,
              localIdentName: dev 
                ? '[name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]',
              exportLocalsConvention: 'camelCase',
            };
          }
        });
      }
    });

    // Optimize for production
    if (!dev && !isServer) {
      // Split CSS into smaller chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Generate source maps in production for better debugging
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

module.exports = nextConfig;
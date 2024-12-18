const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
  webpack: {
    configure: {
      output: {
        publicPath: '/',
        path: path.join(__dirname, 'build'),
        filename: 'static/js/[name]-[contenthash].js',
      },
      resolve: {
        fallback: {
          querystring: require.resolve('querystring-es3'),
        },
      },
    },
    alias: {
      '@app': resolvePath('./src/app'),
      '@processes': resolvePath('./src/processes'),
      '@pages': resolvePath('./src/pages'),
      '@widgets': resolvePath('./src/widgets'),
      '@features': resolvePath('./src/features'),
      '@entities': resolvePath('./src/entities'),
      '@shared': resolvePath('./src/shared'),
    },
  },
};

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = [
  {
    entry: {
      app: [
        '@babel/polyfill',
        './src/app/client/app.ts',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(scss|sass|css)$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new ManifestPlugin(),
    ],
  },
  {
    entry: {
      server: './src/server/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
  },
];

module.exports = config;

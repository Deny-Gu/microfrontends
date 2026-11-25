const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

const SRC_DIR = path.join(__dirname, 'src');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DIST_DIR = path.join(__dirname, 'dist');

module.exports = (_env, argv = {}) => ({
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'eval-cheap-module-source-map',
  entry: path.resolve(SRC_DIR, 'index.tsx'),
  output: {
    uniqueName: 'Shell',
    path: path.resolve(DIST_DIR),
    filename: 'js/[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    port: 3010,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: PUBLIC_DIR,
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        sidebar: 'sidebar@http://localhost:3011/remoteEntry.js',
        agents: 'agents@http://localhost:3012/remoteEntry.js',
        incidents: 'incidents@http://localhost:3013/remoteEntry.js',
      },
      shared: {
        'react-router': {
          singleton: true,
          requiredVersion: dependencies['react-router'],
        },
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-dom/client': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react/jsx-runtime': {
          singleton: true,
          requiredVersion: dependencies.react,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_DIR, 'index.html'),
    }),
  ],
});

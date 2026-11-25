const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

module.exports = (_env, argv = {}) => ({
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'eval-cheap-module-source-map',
  entry: './src/index.tsx',
  output: {
    uniqueName: 'sidebar',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devServer: {
    port: 3011,
    hot: true,
    headers: {
      'Cross-Origin-Resource-Policy': 'same-site',
    },
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sidebar',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
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
      template: './public/index.html',
    }),
  ],
});

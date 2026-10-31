const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Read environment values from .env if present
const fs = require('fs');
const envPath = path.resolve(__dirname, '.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        envVars[key] = value;
      }
    }
  });
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, 'index.web.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash:8].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.web.jsx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-config': path.resolve(
        __dirname,
        'src/services/config.web.shim.ts'
      ),
      '@react-native-firebase/auth': path.resolve(
        __dirname,
        'src/services/firebase/auth.web.ts'
      ),
      '@react-native-google-signin/google-signin': path.resolve(
        __dirname,
        'src/services/firebase/googleSignIn.web.ts'
      ),
    },
  },
  module: {
    rules: [
      // Allow extension-less imports in ESM packages like @react-navigation
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      // Application source code compilation
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:@react-native/babel-preset'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.png'),
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      'process.env': JSON.stringify({
        ...envVars,
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: false,
    client: {
      webSocketURL: 'ws://localhost:3000/ws',
      overlay: false,
    },
  },
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        // chunks: ['main'],
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        // filename: 'manifest.json',
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker source file
        swDest: 'src-sw.js', // Output service worker file name
        exclude: [/\.map$/, /manifest\.json$/, /install\.html$/],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
      },
      compress: true,
      port: 8080,
      watchFiles: ['./src/**/*']
    },
  };
};
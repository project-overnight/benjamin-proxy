const path = require('path');
require('dotenv').config();
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFileName: '[name].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'dist'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            '@airbnb',
          ],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssNormalize(),
              ],
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  watch: true,
};

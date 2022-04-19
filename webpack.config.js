const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, 'assets')

const htmlWebpackPluginDefaults = {
  scriptLoading: 'blocking',
  inject: 'head'
}

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')

    }
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'index.js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "style.css", }),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: './src/ui.html',
      filename: 'ui.html'
    }),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: './src/dialog-small.html',
      filename: 'dialog-small.html'
    }),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: './src/dialog-middle.html',
      filename: 'dialog-middle.html'
    }),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: './src/dialog-large.html',
      filename: 'dialog-large.html'
    }),
  ],
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: false,
    port: 9000,
    historyApiFallback: true,

  },

};

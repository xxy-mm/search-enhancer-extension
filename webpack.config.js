const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const AnalyzePlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = process.env.NODE_ENV === 'prod' ? true : false

const plugins = [
  new MiniCssExtractPlugin({}),
  new HtmlWebpackPlugin({
    title: 'Search Enhancer',
    filename: 'popup.html',
    chunks: ['popup'],
  }),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      isProd ? 'production' : 'development'
    ),
  }),
  new CopyPlugin({
    patterns: [{ from: 'images', to: 'images' }],
  }),
]

if (process.env.analyze === 'true') {
  plugins.push(new AnalyzePlugin())
}

module.exports = {
  mode: isProd ? 'production' : 'development',

  entry: {
    popup: './src/popup/index.tsx',
    content: './src/content/index.tsx',
    background: './src/background/index.ts',
  },
  devtool: isProd ? undefined : 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins,
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
}

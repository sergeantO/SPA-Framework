const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // базовая директория для точек входа и загрузчиков    
  context: path.join(__dirname, 'src'),
  
  entry: './index.ts',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  devtool: 'eval',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    port: 4200
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'FW': path.join(__dirname, 'src/framework')
    }
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'FW SPA',
      template: './index.html'
    }),
  ]
}
var path = require('path')
var webpack = require('webpack')
var ghpages = require('gh-pages')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    publicPath: "/build/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
          "es2015",
          "react",
          "stage-1"
        ]
      }
    },{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
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
          'react-hmre',
          "stage-1",
        ]
      }
    },{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};

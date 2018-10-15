const path = require('path');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './client'),

  entry: {
    javascript: './js/index.jsx'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build')
  },
  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx', '.css', '.styl'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

const webpack = require('webpack');
const path = require('path');

const DIST = path.join(__dirname, './react-client/dist');
const SRC = path.join(__dirname, './react-client/src');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  module: {
    loaders: [{
      include: SRC,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
}
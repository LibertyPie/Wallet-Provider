const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'wallet-provider.js',
    path: path.resolve(__dirname, 'dist')
  }
}
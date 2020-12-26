const path = require('path')
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'wallet-provider.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackInlineSVGPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        parallel: true
    })],
  },

  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
       {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },

      
    ]
  }

}
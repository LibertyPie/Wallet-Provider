const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
    
      {
        test: /\.tsx?$/,
        use: ['babel-loader','ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
       
        terserOptions: {
            mangle: true,
            sourceMap: false,       
            //keep_classnames: false,
            keep_fnames: false,
            toplevel: true,                                
        }, 
      }),
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'wallet-provider.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "WalletProvider",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
};
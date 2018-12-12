const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = {
  mode: 'production',
  entry: fs.readdirSync(path.join(__dirname, 'src')).reduce((o, d) => {

    for (const ex of ['main.', 'index.'].reduce((a, n) => a.concat(['ts', 'js', 'tsx', 'jsx'].map(x => n + x)), [])) {
      const p = path.join(__dirname, 'src', d, ex);
      if (fs.existsSync(p)) o[d] = p;
    }
    return o;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/i,
      loader: ['babel-loader', 'ts-loader']
    }, {
      test: /\.(js|jsx)$/i,
      loader: 'babel-loader'
    }, {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.(svg|png|jpg|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname
    }),
    new CopyWebpackPlugin([{
      to: path.join(__dirname, 'dist'),
      from: path.join(__dirname, 'src', 'copy'),
      toType: 'dir'
    }]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
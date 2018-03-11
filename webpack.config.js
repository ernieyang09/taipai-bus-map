const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ["babel-polyfill", './src/index.jsx']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        loader:'babel-loader',
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.html$/i,
        include: path.resolve(__dirname, 'src'),
        loader: 'html-loader',
      }
    ]
  },
  devServer:{
    port:3000,
    publicPath: "/",
    contentBase:'./src',
    inline:true,
  },
  resolve: {
    extensions: ['index.js', 'index.jsx', '.js', '.jsx'],
    modules: ['node_modules'], // 指定套件的路徑
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ]
}

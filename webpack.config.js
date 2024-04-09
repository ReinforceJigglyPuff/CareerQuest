
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   mode: 'development',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'index_bundle.js',
//   },
//   target: 'web',
//   devServer: {
   
//     static: {
//       directory: path.join(__dirname, 'public')
// },
//     open: true,
//     hot: true,
//     liveReload: true,
//     proxy: [
//       {
//         context: ['/api', '/auth', '/resume', '/top10'],
//         target: 'http://localhost:3000',
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.json'],
   
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, 
//         exclude: /node_modules/, 
//         use: 'babel-loader', 
//       },
//       {
//         test: /\.(css)$/,
//         use: ['style-loader', 'css-loader'],
//       }
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       // template: path.join(__dirname, 'public', 'index.html')
//       title:'development', template: './public/index.html'
//     })
//   ]
// };



const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: { index: "./src/index.js" },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  target: "web",
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ title: "development", template: "./public/index.html" }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname),
      publicPath: "/",
    },
    proxy: [
      {
        context: ["/api", '/auth', '/resume', '/top10'],
        target: "http://localhost:3000",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [ require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
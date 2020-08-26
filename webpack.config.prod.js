/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
console.log("\n", "\x1b[1m", "\x1b[31m");
console.log(
  "------------------------------------------------------------------------------------------"
);
console.log(
  "---------------------------------- VISERION IS RISING! -----------------------------------"
);
console.log(
  "---------------------------------------- V 2.0 -------------------------------------------"
);
console.log(
  "------------------------------------------------------------------------------------------"
);
console.log("\n");

console.log(
  "                                                       /===-_---~~~~~~~~~------____"
);
console.log(
  "                                                |===-~___                _,-' "
);
console.log(
  "                 -==\\                         `//~\\   ~~~~`---.___.-~~ "
);
console.log(
  "             ______-==|                         | |  \\           _-~` "
);
console.log(
  "       __--~~~  ,-/-==\\                        | |   `        ,' "
);
console.log("    _-~       /'    |  \\                      / /            / ");
console.log("  .'        /       |   \\                   /' /           /' ");
console.log(" /  ____  /         |    `.__/-~~ ~  _ _/'  /          /' ");
console.log("/-'~    ~~~~~---__  |     ~-/~         ( )   /'        _--~` ");
console.log("                  _|      /        _)   ;  ),   __--~~ ");
console.log("                    '~~--_/      _-~/-  /    '-~  ");
console.log("                   {__--_/}    / \\_&gt;- )&lt;__        ");
console.log("                   /'   (_/  _-~  | |__&gt;--&lt;__|      | ");
console.log("                  |0  0 _/) )-~     | |__&gt;--&lt;__|     | ");
console.log("                  / /~ ,_/       / /__&gt;---&lt;__/      | ");
console.log("                 o o _//        /-~_&gt;---&lt;__-~      / ");
console.log("                 (^(~          /~_&gt;---&lt;__-      _-~ ");
console.log("                ,/|           /__&gt;--&lt;__/     _-~ ");
console.log(
  "            ,//('(           |__&gt;--&lt;__|     /                  .----_      "
);
console.log(
  "            ( ( '))          |__&gt;--&lt;__|    |                 /' _---_~    "
);
console.log(
  "         `-)) )) (           |__&gt;--&lt;__|    |               /'  /     ~\\  "
);
console.log(
  "       ,/,'//( (             __&gt;--&lt;__                    /'  //       ||  "
);
console.log(
  "      ,( ( ((, ))              ~-__&gt;--&lt;_~-_  ~--____---~' _/'/        /'   "
);
console.log(
  "    `~/  )` ) ,/|                 ~-_~&gt;--&lt;_/-__       __-~ _/  "
);
console.log(" ._-~//( )/ )) `                    ~~-'_/_/ /~~~~~~~__--~  ");
console.log("  ;'( ')/ ,)(                              ~~~~~~~~~~  ");
console.log(" ' ') '( (/  ");
console.log("    '   '  `     ");
console.log("                       ");
console.log("                         ");

console.log("\n", "\x1b[0m", "\x1b[21m");

module.exports = {
  mode: 'production',
  devtool:'source-map',
  entry: ["babel-polyfill", "./src/index.jsx"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["react", "env"],
          plugins: [
            "syntax-dynamic-import",
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle-[name]-[chunkhash].js",
    path: path.resolve(__dirname, "public", "scripts"),
    publicPath: "scripts/"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 6001
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false,
        mangle: {
          safari10: true,
          keep_fnames: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "public/index-production.html"
    })
  ]
};

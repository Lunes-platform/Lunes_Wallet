/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ObjectRestSpreadPlugin = require('@sucrase/webpack-object-rest-spread-plugin');

console.log("\n", "\x1b[1m", "\x1b[31m");
console.log("------------------------------------------------------------------------------------------");
console.log("---------------------------------- VISERION IS RISING! -----------------------------------");
console.log("---------------------------------------- V 2.0 -------------------------------------------");
console.log("------------------------------------------------------------------------------------------",);
console.log("\n");

console.log("                                                       /===-_---~~~~~~~~~------____");
console.log("                                                |===-~___                _,-' ");
console.log("                 -==\\                         `//~\\   ~~~~`---.___.-~~ ");
console.log("             ______-==|                         | |  \\           _-~` ");
console.log("       __--~~~  ,-/-==\\                        | |   `\        ,' ");
console.log("    _-~       /'    |  \\                      / /      \      / ");
console.log("  .'        /       |   \\                   /' /        \   /' ");
console.log(" /  ____  /         |    \`\.__/-~~ ~ \ _ _/'  /          \/' ");
console.log("/-'~    ~~~~~---__  |     ~-/~         ( )   /'        _--~` ");
console.log("                  \_|      /        _)   ;  ),   __--~~ ");
console.log("                    '~~--_/      _-~/-  / \   '-~ \ ");
console.log("                   {\__--_/}    / \\_&gt;- )&lt;__\      \  ");
console.log("                   /'   (_/  _-~  | |__&gt;--&lt;__|      | ");
console.log("                  |0  0 _/) )-~     | |__&gt;--&lt;__|     | ");
console.log("                  / /~ ,_/       / /__&gt;---&lt;__/      | ");
console.log("                 o o _//        /-~_&gt;---&lt;__-~      / ");
console.log("                 (^(~          /~_&gt;---&lt;__-      _-~ ");
console.log("                ,/|           /__&gt;--&lt;__/     _-~ ");
console.log("            ,//('(           |__&gt;--&lt;__|     /                  .----_      ");
console.log("            ( ( '))          |__&gt;--&lt;__|    |                 /' _---_~\    ");
console.log("         `-)) )) (           |__&gt;--&lt;__|    |               /'  /     ~\\  ");
console.log("       ,/,'//( (             \__&gt;--&lt;__\    \                /'  //       ||  ");
console.log("      ,( ( ((, ))              ~-__&gt;--&lt;_~-_  ~--____---~' _/'/        /'   ");
console.log("    `~/  )` ) ,/|                 ~-_~&gt;--&lt;_/-__       __-~ _/  ");
console.log(" ._-~//( )/ )) `                    ~~-'_/_/ /~~~~~~~__--~  ");
console.log("  ;'( ')/ ,)(                              ~~~~~~~~~~  ");
console.log(" ' ') '( (/  ");
console.log("    '   '  `     ");             
console.log("                       ");
console.log("                         ");


console.log("\n", "\x1b[0m", "\x1b[21m");


module.exports = {
  entry: "./src/index.jsx",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["react", "env"],
          plugins: ["syntax-dynamic-import", "transform-class-properties", "transform-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle-[name].js",
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
    new ObjectRestSpreadPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};

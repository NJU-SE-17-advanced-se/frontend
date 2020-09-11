const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

function resolve(filename) {
  return path.join(__dirname, filename);
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ]
    }
    // plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.extensions.add("*", ".js", ".json", ".vue", ".ts", ".tsx");
  },
  devServer: {
    https: false,
    open: true,
    port: 8393
  }
};

const path = require('path');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
// const WebpackAssetsManifest = require('webpack-assets-manifest');

const WorkboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, "src"),
  };

module.exports = {
    mode: "development",
    entry: {
        index: { import: ['./src/index.js',"./serviceWorker.js","./src/all.js"] },
        routes: { import: ['./src/index.js',"./src/all.js"] },
        // all: './src/all.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, "css-loader"], //MiniCssExtractPlugin.loader,
            },
            {
                test: /\.(png|jpg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    // entry: './src/',
    // output: {
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, ''),
    // },
    // 
    // {
    //     test: /\.(png|svg|jpg|gif)$/,
    //     use: {
    //       loader: "file-loader",
    //     }
    // }, 
    // {
    //     test: /\.(png|jpe?g|gif)$/i,
    //     use: [
    //       {
    //         loader: 'url-loader',
    //         options: {
    //           limit: 8192,
    //           fallback: 'file-loader',
    //           outputPath: 'images',
    //           publicPath: 'images/'
    //         }
    //       }
    //     ]
    // }
    // ]
    // },
    plugins:
        [
            new MiniCssExtractPlugin(),
            new PurgeCSSPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
                safelist: {
                    deep: [/leaflet-/],
                }
              }),
              new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
              }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/html/index.html',
                chunks: ['index']
            }),
            new HtmlWebpackPlugin({
                filename: 'routes.html',
                template: 'src/html/routes.html',
                chunks: ['routes']
            })
        ]
    // new CopyWebpackPlugin({
    //     patterns: [
    //         { from: 'node_modules/leaflet/dist/images', to: '' }
    //     ]
    // }),
    // new CompressionPlugin({
    //     algorithm: 'gzip',
    //     test: /.js$|.css$/,
    // }),

};

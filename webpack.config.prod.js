//programas y archivos
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

//directorios
const path = require('path');
const basePath = __dirname;
const distPath = 'dist';

//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common,{
    output: {
        path: path.join(basePath, distPath),
        filename: 'bundle-omnicanality.js'
    },    
    mode: 'production',
    
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.jsx/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath:path.join(basePath, distPath) ,
                    },
                  },
                  'css-loader',
                ],
            },
            {
              test: /\.(png|jpg|svg)$/,
              exclude: /node_modules/,
              use: 'url-loader'
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: 'style-omincanality.css'
        }),
    ]
});
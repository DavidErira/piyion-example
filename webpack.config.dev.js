//programas y archivos
const { merge } = require('webpack-merge');
const webpack = require ('webpack');
const common = require('./webpack.config.common');

//directorios
const path = require('path');
const basePath = __dirname;
const distPath = '/src/public';


//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common,{
    output: {
        path: path.join(basePath, distPath),
        filename: 'bundle-omnicanality.js'
    },    
    mode: 'development',

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
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: 'style-omincanality.css'
        }),
    ],
    
    devServer: {
        before: function (app, server, compiler) {
          app.get('/firstsettings', function (req, res) {
            res.sendFile(path.join(__dirname,"src","public","index.html"));
          });
          app.get('/panel', function (req, res) {
            res.sendFile(path.join(__dirname,"src","public","index.html"));
          });
          app.get('/chatsonline', function (req, res) {
            res.sendFile(path.join(__dirname,"src","public","index.html"));
          });
        },
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'src','public'),
        compress: true,
        port: 9000,
    },
});
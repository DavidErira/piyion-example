const dotenv =  require('dotenv-webpack');

const path = require('path');
const basePath = __dirname;
const distPath = '/src/public';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackInitConfig = {
    
    plugins: [new dotenv()],
    resolve: {
        extensions: ['.js','.jsx']
    },
    entry: {
        bundle: ['./src/app/index.js'],
    },

   
};
module.exports = webpackInitConfig;


// module.exports={
//     entry: './src/app/index.js',
//     output: {
//         path: __dirname + '/src/public',
//         filename: 'bundle.js'
//     },

//     module: {
//         rules:[
//             {
//                 use: 'babel-loader',
//                 test: /\.js$/,
//                 exclude: /node_modules/
//             },


//             {
//                 use: 'babel-loader',
//                 test: /\.jsx$/,
//                 exclude: /node_modules/
//             }

//         ]
//     }

// };




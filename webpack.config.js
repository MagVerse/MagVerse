const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/javascripts/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
       title: 'MagVerse',
     }),
   ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
       {
         test: /\.s[ac]ss$/i,
         use: [
           // Creates `style` nodes from JS strings
            'style-loader',{
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: { importLoaders: 1 },
            },
            {
              loader:'postcss-loader',
              options:{
                postcssOptions: {
                  plugins: [
                  [
                  'autoprefixer',
                  {
                      //options
                  }
                  ],  
                  ],
                },
              },
            },
                      //    {
          //   // Loader for webpack to process CSS with PostCSS
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: function () {
          //       return [
          //       require('precss'),
          //         require('autoprefixer')
          //       ];
          //     }
          //   }
          // },
          // Compiles Sass to CSS
          'sass-loader',
         ]
       }
     ]
   }
};
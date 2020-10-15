const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    home: './src/javascripts/index.js'
    // mag : './src/javascripts/mag.js'
},  
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src', to: 'dist' },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
       title: 'MagVerse',
     }),
    // new ModernizrWebpackPlugin(),
   ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './dist',
    //  before: function(app, server, compiler){
    //   app.get('/some/path', function(req, res){
    //       res.sendFile('/mag.html');
    //       res.json({ custom: 'response' });
    //       //  res.sendFile('/mag.html');
    // });
    //}
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
       },
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
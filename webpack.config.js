const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/javascripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
  module: {
    rules: [
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
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
     module: {
     rules: [
       {
         test: /\.s[ac]ss$/index,
         use: [
           // Creates `style` nodes from JS strings
           'style-loader',
            // Translates CSS into CommonJS
           'css-loader',
            // Compiles Sass to CSS
           'sass-loader',
         ],
       },
     ],
   },
};
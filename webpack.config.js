const path = require('path');

module.exports = {
  entry: './src/app.js',
mode: 'development', watch: true,
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'bundle.js'
  }
};

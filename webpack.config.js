module.exports = {
  entry: "./js/app.js",
    output: {
      path: require('path').join(__dirname, '/build/'),
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {test: /\.less$/, loader: 'style!css!postcss!less'}
      ]
    }
};
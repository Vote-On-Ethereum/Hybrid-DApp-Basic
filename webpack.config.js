module.exports = {
  entry: './app.js',
  output: {
    path: './',
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'App'
  }
};

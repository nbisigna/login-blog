module.exports = {
  entry: __dirname + '/client/Index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.js|jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  }
};

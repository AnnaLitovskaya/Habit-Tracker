module.exports = {
  entry: ['./client/index.js'],
  module: {
    rules: [
      {
        test: /jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};

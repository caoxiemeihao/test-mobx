const path = require('path')

const resolve = (...args) => path.resolve(__dirname, ...args)

const config = {
  mode: 'development',
  entry: resolve('src/mobx-demo.jsx'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map'
}

module.exports = config

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  
  entry: {
    index: path.resolve(__dirname, 'src/views', 'TelaPrincipal', 'index.ts'),
    detalhes: path.resolve(__dirname, 'src/views', 'TelaDetalhes','detalhes.ts')
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }      
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.css'],

    alias: {
      assets: path.resolve(__dirname, 'src/assets')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views', 'TelaPrincipal','index.html'),
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      filename: 'detalhes.html',
      template: path.resolve(__dirname, 'src/views', 'TelaDetalhes','detalhes.html'),
      chunks: ['detalhes']
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ],

  devtool: 'source-map',
  
  devServer: {
    liveReload: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    watchFiles: {
      paths: ['src']
    }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
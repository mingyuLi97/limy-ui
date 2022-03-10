const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  optimization: {
    minimize: false
  },
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.md$/,
        use: [
          'vue-loader',
          {
            loader: path.resolve(__dirname, '../lib'),
            options: {
              rootTag: {
                opening: '<section class="md-doc-container1">',
                closing: '</section>'
              },
              cards: [
                {
                  marker: 'card',
                  tag: {
                    opening: '<div class="md-doc-card">',
                    closing: '</div>\n'
                  }
                },
                {
                  marker: 'card-prop',
                  tag: {
                    opening: '<div class="md-doc-card-prop">',
                    closing: '</div>\n'
                  }
                },
                {
                  marker: 'card-slot',
                  tag: {
                    opening: '<div class="md-doc-card-slot">',
                    closing: '</div>\n'
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};

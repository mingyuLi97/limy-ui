# `@mfelibs/markdown-to-vue-loader`

> 够将 md 转换成 vue 的 template

## Usage

```javascript
const markdownToVueLoader = require('@mfelibs/markdown-to-vue-loader');
// ...
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
```

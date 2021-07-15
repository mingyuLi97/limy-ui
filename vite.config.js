/*
 * @Description: vite config
 * @Author: 李明宇
 * @Date: 2021-07-13 13:16:25
 */
import { defineConfig } from 'vite';

import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    open: true,
    host: '0.0.0.0'
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      {
        find: '@packages',
        replacement: '/packages'
      }
    ]
  }
});

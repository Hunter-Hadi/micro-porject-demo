import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
import prefixSelector from 'postcss-prefix-selector'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qiankun('sub-react-product', {
      useDevMode: true
    })
  ],
  css: {
    postcss: {
      plugins: [
        prefixSelector({
          prefix: '.sub-app-product-root',
          transform(prefix, selector, prefixedSelector) {
            // 如果是 body 或 html，替换为 prefix
            if (selector === 'body' || selector === 'html') {
              return prefix;
            }
            // 排除 root，因为它通常已经是根节点了
            if (selector === '#root') {
               return selector; 
            }
            return prefixedSelector;
          }
        })
      ]
    }
  },
  server: {
    port: 3001,
    cors: true,
    origin: 'http://localhost:3001'
  }
})

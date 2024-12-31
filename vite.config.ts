import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import * as path from 'path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/index.ts', 'src/components']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@MaterialSymbols': resolve('./public/fonts/material-symbols-outlined.woff2')
    }
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DuanagaIcons',
      fileName: 'duanaga-icons'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

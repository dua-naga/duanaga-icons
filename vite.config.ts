import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import * as path from 'path'
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    copyPublicDir: true,
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

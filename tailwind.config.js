import { preset } from 'duanaga-ui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,vue}',
    './node_modules/duanaga-ui/dist/**/*.js'
  ],
  presets: [preset],
  theme: {
    extend: {}
  },
  plugins: []
}

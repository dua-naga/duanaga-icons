import { preset } from 'lilasia-ui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,vue}'],
  presets: [preset],
  theme: {
    extend: {}
  },
  plugins: []
}

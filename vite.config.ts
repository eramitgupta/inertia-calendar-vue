import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({ exclude: ['vite.config.ts'], include: ['src'], insertTypesEntry: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'InertiaCalendar',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'inertia-calendar.js' : 'inertia-calendar.umd.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', '@inertiajs/vue3'],
      output: {
        globals: {
          vue: 'Vue',
          '@inertiajs/vue3': 'InertiaVue',
        },
        exports: 'named',
      },
    },
    sourcemap: true,
  },
})

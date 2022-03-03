import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, `${process.cwd()}/env`)};
// https://vitejs.dev/config/
  return defineConfig({
    envDir: fileURLToPath(new URL("./env", import.meta.url)),
    plugins: [vue({ customElement: true})],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        preserveEntrySignatures: 'allow-extension',
        inlineDynamicImports: true,
        input: `./src/main.ts`,
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "static/[name].[ext]",
          dir: `dist/${process.env.VITE_APP_NAME}`,
          format: "es",
        },
      },
      minify: true,
      sourcemap: 'inline'
    }
  })

}

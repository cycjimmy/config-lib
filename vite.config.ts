import { readdirSync } from 'node:fs'

import { defineConfig } from 'vite'

// Every source file is a published entry point: consumers import them by path
// (e.g. `@cycjimmy/config-lib/dist/terser/4.x/production.js`), so the build has
// to keep the `src/` tree shape instead of bundling a single library entry.
const entries = Object.fromEntries(
  (readdirSync('src', { recursive: true }) as string[])
    // Normalised on purpose: Windows returns backslash separated paths, which
    // would end up in the output directory names.
    .map(file => file.replaceAll('\\', '/'))
    .filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'))
    .map(file => [
      file.replace(/\.ts$/, ''),
      `src/${file}`,
    ]),
)

export default defineConfig({
  build: {
    target: 'node22',
    // Node oriented build: `node:` builtins stay as imports instead of being
    // stubbed out by the browser environment.
    ssr: true,
    outDir: 'dist',
    // `tsc -p tsconfig.build.json` runs first and writes the declarations into
    // the same directory.
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      input: entries,
      // Vite turns entry signatures off, which lets the tree shaker drop every
      // export of an entry nothing else imports. Combined with `preserveModules`
      // that produced empty files for almost every module.
      preserveEntrySignatures: 'strict',
      output: {
        format: 'es',
        // Keeps the one module per file layout: `working` mutates the options
        // object it imports, so the modules must stay separate at runtime.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
  },
})

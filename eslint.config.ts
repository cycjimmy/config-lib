import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  // The published entries and the packaging tasks are build-time tooling: their
  // progress output is the interface, not debugging leftovers.
  ignores: [
    '.release/**',
    'dist/**',
    'docs/**',
    'temp/**',
    'coverage/**',
  ],
}, {
  files: ['src/**/*.ts', 'tasks/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})

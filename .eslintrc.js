module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'jsdoc', 'markdown'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended'
    "react-app"
  ],
  overrides: [
    {
      // 2. Enable the Markdown processor for all .md files.
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    }
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jest/consistent-test-it': 'error',
    'jest/expect-expect': 'off',
    'jsdoc/no-types': 'error',
    'import/no-unresolved': 'off',
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: '*', next: 'return'}
    ]
  }
}

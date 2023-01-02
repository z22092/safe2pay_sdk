const { defineConfig } = require('eslint-define-config');


module.exports = defineConfig({
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier'
  ],
  rules: {
    'no-prototype-builtins': 'off',
    'eol-last': 0,
    indent: ['warn', 2, { SwitchCase: 1 }],
    'new-cap': 'warn',
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'ignore'
    }],
    'brace-style': 'off',
    'padded-blocks': 'off',
    'linebreak-style': 'off',
    strict: 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['warn', 'always'],
    eqeqeq: ['error', 'smart'],
    'max-len': ['warn', 1000],
    'object-curly-spacing': 'off',
    'no-nested-ternary': 1,
    'no-empty': 'error',
    'no-constant-condition': 'error',
    curly: ['warn', 'multi-line'],
    'keyword-spacing': 'off',
    'spaced-comment': ['warn', 'always'],
    'space-before-function-paren': 'off',
    'space-before-blocks': ['warn', 'always'],
    'array-bracket-spacing': 'off',
    'block-spacing': ['error'],
    'no-console': [
      'warn', { allow: ['warn', 'error', 'info'] }
    ],

    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],

    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'node/no-deprecated-api': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-extraneous-import': 'off',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
  }
});

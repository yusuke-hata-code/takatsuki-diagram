module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
  ],
  overrides: [
    {
      files: ['*.{spec,test}.{js,ts}'],
      rules: {
        'no-console': 'off',
        'unicorn/no-nested-ternary': 'off',
      },
    },
    {
      files: ['*.config.{js,ts}'],
      rules: {
        'import/no-default-export': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'unicorn/no-nested-ternary': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': ['error'],
    camelcase: 'warn',
    eqeqeq: 'warn',
    'max-params': 'warn',
    'max-depth': 'warn',
    'array-callback-return': 'warn',
    'no-return-await': 'warn',
    'require-atomic-updates': 'warn',
    'require-await': 'warn',
    'unicorn/prefer-includes': 'off',
    'no-param-reassign': ['warn', { props: true }],
    curly: ['warn', 'multi-line'],
    'no-console': [
      'warn',
      { allow: ['time', 'timeEnd', 'info', 'error', 'debug'] },
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['block-like', 'return', 'throw', 'export', 'break', 'continue'],
      },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-default-export': 'warn',
    '@typescript-eslint/padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'type' },
      { blankLine: 'always', prev: 'type', next: '*' },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
    '@typescript-eslint/sort-type-union-intersection-members': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-native-coercion-function': 'off',
    'unicorn/no-new-array': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-array-index-of': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'unicorn/catch-error-name': [
      'warn',
      {
        name: 'err',
      },
    ],
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

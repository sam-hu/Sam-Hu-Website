const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react/require-default-props': 'off',
    'no-restricted-syntax': 'off',
    'max-len': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'guard-for-in': 'off',
    'no-plusplus': 'off',
    ...a11yOff,
  },
}

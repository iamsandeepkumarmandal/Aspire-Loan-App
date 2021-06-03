module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    omitLastInOneLineBlock: 'off',
    'max-len': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    quotes: ['error', 'single'],
    'vue/require-prop-types': 'off',
  },
};

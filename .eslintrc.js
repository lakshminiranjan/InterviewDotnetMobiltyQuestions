module.exports = {
  root: true,
  extends: ['universe/native', 'universe/typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error'
  }
};

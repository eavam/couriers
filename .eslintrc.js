module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        parser: 'flow',
      },
    ],
  },
  globals: {
    document: true,
  },
};

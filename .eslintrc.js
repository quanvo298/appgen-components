module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'plugin:jest/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest'],
  settings: {
    'import/resolver': {
      alias: [['@app', './src']],
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'off',
    radix: 0, // Turn off require radix number when use parseInt
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-unresolved':'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-underscore-dangle': 'off',
    'guard-for-in':'off',
    'no-continue': 'off',
    'react/no-danger': 'off'
  },
};

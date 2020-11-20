/* eslint-disable quote-props,key-spacing */
module.exports = {
  'root': true,
  'extends': ['airbnb-base'],
  'rules': {
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'spaced-comment': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
    'space-in-parens': 'off',
    'space-before-function-paren': 'off',
    'no-spaced-func': 'off',
    'padding-line-between-statements': 'off',
    'no-mixed-operators': 'off',
    'no-else-return': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'prefer-destructuring': 'off',
    'indent': ['error'],
    'yoda': ['error', 'always', {onlyEquality: true}],

    'import/no-anonymous-default-export': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    // because our lambdas have its own node_module, so we disable this rule
    'import/no-unresolved': 'off',
  },
  'globals': {},
  'env': {
    'node': true,
    'browser': true,
    'es6': true,
  },
  'plugins': [
  ]
};

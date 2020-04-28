module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'camelcase': ['error', { allow: [] }],
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'comma-style': ['error', 'last'],
        'func-call-spacing': ['error', 'never'],
        'indent': ['error', 4],
        'new-cap': ['error', { properties: false }],
        'new-parens': 'error',
        'no-trailing-spaces': 'warn',
        'no-unused-expressions': 'error',
        'no-use-before-define': 'warn',
        'no-var': 'error',
        'object-curly-spacing': ['error', 'always'],
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '?': 'before',
                ':': 'before',
                '&&': 'before',
                '||': 'before'
            }
        }],
        'quote-props': [1, 'consistent-as-needed'],
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'space-infix-ops': 'error'
  },
  overrides: [
    {
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/**/*.spec.{j,t}s?(x)'
        ],
        env: {
            jest: true
        }
    }
]
}

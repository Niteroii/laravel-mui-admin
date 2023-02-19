// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        'no-else-return': [
            'error',
            {
                allowElseIf: false,
            }
        ],
        'prefer-const': 'error',
        'no-var': 'error'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};

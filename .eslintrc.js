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
        'plugin:import/recommended',
        'plugin:import/react',
        'plugin:jsx-a11y/recommended',
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
        'no-var': 'error',
        'no-const-assign': 'error',
        'no-console': 'warn',
        'no-multi-spaces': 'error',
        'no-new-object': 'error',
        'object-shorthand': 'error',
        'quote-props': ['error', 'as-needed'],
        'prefer-object-spread': 'error',
        'no-array-constructor': 'error',
        'array-callback-return': 'error',
        'prefer-destructuring': [
            "error",
            { "object": true, "array": false },
            {
                "enforceForRenamedProperties": true
            }
        ],
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'no-useless-escape': 'error',
        'wrap-iife': 'error',
        'no-loop-func': 'error',
        'func-style': [
            'error',
            'expression'
        ],
        'prefer-rest-params': 'error',
        'default-param-last': 'error',
        'no-new-func': 'error',
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }
        ],
        'space-before-blocks': 'error',
        'no-param-reassign': 'error',
        'prefer-spread': 'error',
        'function-paren-newline': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'arrow-parens': 'error',
        'arrow-body-style': 'error',
        'no-confusing-arrow': 'error',
        'implicit-arrow-linebreak': 'error',
        'no-useless-constructor': 'error',
        'no-dupe-class-members': 'error',
        'class-methods-use-this': 'error',
        'no-duplicate-imports': 'error',
        'eqeqeq': 'error',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'object-curly-newline': ["error", {
            'multiline': true,
            'minProperties': 4,
        }],
        'no-iterator': 'error',
        'dot-notation': 'error',
        'no-restricted-properties': [
            'error',
            {
                'object': 'Math',
                'property': 'pow',
                'message': 'Use the exponentiation operator (**) instead.'
            }

        ],
        'no-restricted-syntax': [
            'error',
            {
                'selector': 'ForInStatement',
                'message': 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                'selector': 'ForOfStatement',
                'message': 'for..of loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                'selector': 'LabeledStatement',
                'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                'selector': 'WithStatement',
                'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            },
            {
                'selector': 'BinaryExpression[operator=\'in\']',
                'message': 'The `in` operator can be confusing to readers unfamiliar with JavaScripts semantics. Use `Array.prototype.includes` or the `indexOf` method instead.'
            },
            {
                'selector': 'BinaryExpression[operator=\'instanceof\']',
                'message': 'The `instanceof` operator is subject to the whims of the JavaScript engine. Use `Array.isArray` or `Object.getPrototypeOf` instead.'
            }
        ],
        'one-var': ['error', 'never'],
        'no-multi-assign': 'error',
        'no-plusplus': 'error',
        'max-len': ['error', {
            'code': 100,
            'ignoreTrailingComments': true,
            'ignoreStrings': true,
        }],
        'operator-linebreak': ['error', 'before'],
        'no-mixed-operators': 'error',
        'curly': 'error',
        'brace-style': 'error',
        'spaced-comment': 'error',
        'space-before-blocks': 'error',
        'keyword-spacing': 'error',
        'space-infix-ops': 'error',
        'newline-per-chained-call': ["error", { "ignoreChainWithDepth": 2 }],
        'no-trailing-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'space-in-parens': 'error',
        'array-bracket-spacing': 'error',
        'object-curly-spacing': ['error', 'always'],
        'block-spacing': 'error',
        'comma-spacing': 'error',
        'computed-property-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'key-spacing': 'error',
        'comma-style': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'no-new-wrappers': 'error',
        'radix': 'error',
        'camelcase': 'error',
        'new-cap': 'error',
        'no-underscore-dangle': 'error',
        'semi-spacing': 'error',
        'import/no-mutable-exports': 'error',
        'import/prefer-default-export': 'error',
        'import/first': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/extensions': [
            'error',
            'never',
            {
                pattern: {
                    'svg': 'always',
                    'png': 'always',
                    'jpg': 'always',
                    'jpeg': 'always',
                    'gif': 'always',
                    'webp': 'always',
                    'ico': 'always',
                    'json': 'always',
                    'css': 'always',
                    'scss': 'always',
                }
            }
        ],
        'no-restricted-globals': ['error', 'event', 'fdescribe', 'isNaN', 'isFinite'],
        'react/no-multi-comp': 'error',
        'react/forbid-prop-types': 'error',
        'react/jsx-boolean-value': 'error', // copilot suggestion
        'react/jsx-curly-spacing': 'error', // copilot suggestion
        'react/jsx-equals-spacing': 'error', // copilot suggestion
        'react/jsx-filename-extension': 'error', // copilot suggestion
        'react/jsx-first-prop-new-line': 'error', // copilot suggestion
        'react/jsx-handler-names': 'error', // copilot suggestion
        'react/jsx-indent': 'error', // copilot suggestion
        'react/jsx-indent-props': 'error', // copilot suggestion
        'react/jsx-key': 'error', // copilot suggestion
        'react/jsx-max-props-per-line': 'error', // copilot suggestion
        'react/jsx-no-bind': [
            'error',
            {
                'allowArrowFunctions': true,
            }
        ], // copilot suggestion
        'react/jsx-no-duplicate-props': 'error', // copilot suggestion
        'react/prefer-stateless-function': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-tag-spacing': 'error',
        'react/jsx-curly-spacing': 'error',
        'react/jsx-boolean-value': 'error',
        'react/no-array-index-key': 'error',
        'react/no-string-refs': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/self-closing-comp': 'error',

    },
    'settings': {
        'react': {
            'version': 'detect'
        },
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx']
            }
        }
    }
};

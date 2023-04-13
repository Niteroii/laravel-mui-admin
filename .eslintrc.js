
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
        './.eslintrc.jsdocs.js',
        './.eslintrc.i18n.js',
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
        'react',
        'react-hooks',
        'import',
        'jsx-a11y',
    ],
    'rules': {
        'array-bracket-spacing': 'error',
        'array-callback-return': 'error',
        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'block-spacing': 'error',
        'brace-style': 'error',
        'camelcase': 'error',
        'class-methods-use-this': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': ['error', 'never'],
        'curly': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        'eqeqeq': 'error',
        'func-call-spacing': ['error', 'never'],
        'func-style': ['error', 'expression'],
        'function-paren-newline': 'error',
        'implicit-arrow-linebreak': 'error',
        'import/extensions': ['error', 'never', {
            pattern: {
                'css': 'always',
                'gif': 'always',
                'ico': 'always',
                'jpeg': 'always',
                'jpg': 'always',
                'json': 'always',
                'png': 'always',
                'scss': 'always',
                'svg': 'always',
                'webp': 'always'
            }
        }],
        'import/first': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/prefer-default-export': 'error',
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'jsx-quotes': ['error', 'prefer-double'],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': ['error', 'unix'],
        'max-len': ['error', {
            'code': 100,
            'ignoreTrailingComments': true,
            'ignoreUrls': true,
        }],
        'new-cap': 'error',
        'newline-per-chained-call': ["error", {
            "ignoreChainWithDepth": 2
        }],
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-confusing-arrow': 'error',
        'no-console': 'warn',
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': ['error', {
            allowElseIf: false
        }],
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-parens': ['error', 'all', {
            'ignoreJSX': 'multi-line'
        }],
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-loop-func': 'error',
        'no-mixed-operators': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': ['error', {
            'max': 1,
            'maxBOF': 0,
        }],
        'no-nested-ternary': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        'no-param-reassign': 'error',
        'no-plusplus': 'error',
        'no-restricted-globals': ['error', 'event', 'fdescribe', 'isNaN', 'isFinite'],
        'no-restricted-properties': ['error', {
            'message': 'Use the exponentiation operator (**) instead.',
            'object': 'Math',
            'property': 'pow'
        }],
        'no-restricted-syntax': ['error', {
            'message': 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            'selector': 'ForInStatement'
        }, {
                'message': 'for..of loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
                'selector': 'ForOfStatement'
            }, {
                'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
                'selector': 'LabeledStatement'
            }, {
                'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
                'selector': 'WithStatement'
            }, {
                'message': 'The `in` operator can be confusing to readers unfamiliar with JavaScripts semantics. Use `Array.prototype.includes` or the `indexOf` method instead.',
                'selector': 'BinaryExpression[operator=\'in\']'
            }, {
                'message': 'The `instanceof` operator is subject to the whims of the JavaScript engine. Use `Array.isArray` or `Object.getPrototypeOf` instead.',
                'selector': 'BinaryExpression[operator=\'instanceof\']'
            }],
        'no-return-assign': 'error',
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'error',
        'no-unneeded-ternary': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'object-curly-newline': ["error", {
            'minProperties': 4,
            'multiline': true
        }],
        'object-curly-spacing': ['error', 'always'],
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'operator-linebreak': ['error', 'before'],
        'padded-blocks': ['error', {
            'blocks': 'never',
            'classes': 'always',
            'switches': 'never',
        }],
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': ["error", {
            "array": false,
            "object": true
        }, {
                "enforceForRenamedProperties": false
            }],
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'quote-props': ['error', 'as-needed'],
        'quotes': ['error', 'single'],
        'radix': 'error',
        'react/destructuring-assignment': 'error',
        'react/forbid-prop-types': 'error',
        'react/jsx-boolean-value': 'error',
        'react/jsx-boolean-value': 'error',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-spacing': 'error',
        'react/jsx-curly-spacing': 'error',
        'react/jsx-equals-spacing': 'error',
        'react/jsx-filename-extension': 'error',
        'react/jsx-first-prop-new-line': 'error',
        'react/jsx-handler-names': 'error',
        'react/jsx-indent': 'error',
        'react/jsx-indent-props': 'error',
        'react/jsx-key': 'error',
        'react/jsx-max-props-per-line': 'error',
        'react/jsx-no-bind': ['error', {
            'allowArrowFunctions': true
        }],
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-tag-spacing': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/no-array-index-key': 'error',
        'react/no-multi-comp': 'error',
        'react/no-string-refs': 'error',
        'react/prefer-stateless-function': 'error',
        'react/self-closing-comp': 'error',
        'rest-spread-spacing': 'error',
        'semi': ['error', 'always'],
        'semi-spacing': 'error',
        'space-before-blocks': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'asyncArrow': 'always',
            'named': 'never'
        }],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',
        'template-curly-spacing': 'error',
        'wrap-iife': 'error',
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
    },
    'globals': {
        'blade': false,
        'error': false,
        'route': false,
    }
};

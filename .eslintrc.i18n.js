const path = require('path');

module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'plugin:i18n-json/recommended',
        'plugin:i18next/recommended',
        // 'plugin:json/recommended',
    ],
    'plugins': [
        'i18n-json',
        'i18next',
        // 'json',
    ],
    'rules': {
        'i18n-json/identical-keys': [
            2,
            {
                filePath: path.resolve('./resources/js/src/lang/lint/schema.json'),
            }
        ],
        'i18n-json/valid-message-syntax': [
            'error',
            {
                syntax: path.resolve('./resources/js/src/lang/lint/syntax-validator.js')
            }
        ],
        'i18next/no-literal-string': [
            'error',
            {
                'mode': 'all',
                'jsx-attributes': {
                    'include': ['label', 'aria-label', 'placeholder', 'title', 'alt', 'value', 'defaultValue']
                },
                'object-properties': {
                    'exclude': [
                        'type',
                        'icon',
                        'overflow',
                        'overflowX',
                        'overflowY',
                        'justifyContent',
                        'alignItems',
                        'alignContent',
                        'flexDirection',
                        'flexWrap',
                        'flex',
                        'flexGrow',
                        'flexShrink',
                        'flexBasis',
                        'order',
                        'gridTemplateColumns',
                        'gridTemplateRows',
                        'gridTemplateAreas',
                        'gridAutoColumns',
                        'gridAutoRows',
                        'gridAutoFlow',
                        'gridColumn',
                        'gridRow',
                        'gridColumnStart',
                        'gridColumnEnd',
                        'gridRowStart',
                        'gridRowEnd',
                        'gridArea',
                        'gridGap',
                        'gridColumnGap',
                        'gridRowGap',
                        'justifyItems',
                        'justifySelf',
                        'alignItems',
                        'alignSelf',
                        'placeItems',
                        'placeSelf',
                        'placeContent',
                        'edge',
                    ],
                },
                'callees': {
                    'exclude': ['*'],
                }
            }
        ],
       
    }
}
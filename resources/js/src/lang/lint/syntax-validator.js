/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-description */
/* eslint-disable func-style */
/* eslint-disable no-extend-native */
/* eslint-disable no-undef */

module.exports = (_message, key) => {
    // Check if the key is in camel case
    if (!/^[a-z]+([A-Z][a-z]+)*$/.test(key)) {
        throw new Error(`Key ${key} is not in camel case`);
    }
};

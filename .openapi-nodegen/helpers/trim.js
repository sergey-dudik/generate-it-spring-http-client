/**
 * Cleans all spaces before and after the text
 * @param str
 * @returns {string}
 */
exports.default = (str = '') =>
    str.replace(/^\s+|\s+$/g, '');
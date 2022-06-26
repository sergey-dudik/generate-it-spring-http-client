/**
 * Seeks the 'x-response-definitions' to find a successful definition
 * @param path
 * @returns {*|string}
 */
const main = (path) => {
    const definitions = path['x-response-definitions'] || {};
    const swaggerReturnDefinition = definitions['200'] || definitions['201'];
    return swaggerReturnDefinition || '';
}

exports.default = main;
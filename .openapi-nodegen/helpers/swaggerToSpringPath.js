const regex = /:(\w+)(?=\/|$)/gm;

/**
 * Transforms the pattern ':param' into '{param}'
 * @param str the path, for example '/vehicles/:vin/:cbs'
 * @returns {string}
 */
exports.default = (str = '') => str.replace(regex, '{$1}');
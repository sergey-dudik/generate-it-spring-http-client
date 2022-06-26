const {default: findJavaTypeForBody} = require('./findJavaTypeForBody');

/**
 * Seeks all the possible Java types for bodies
 * @param operations
 * @returns {string[]} The found types
 */
const main = (operations = []) => {
    const javaTypes = operations
        .flatMap(op => op.path)
        .flatMap(path => Object.values(path))// To each method
        .filter(method => method.requestBody && method['x-request-definitions'])
        .map(method => findJavaTypeForBody(method))
        .filter(javaType => !! javaType);

    return [... new Set(javaTypes)];
}

exports.default = main;
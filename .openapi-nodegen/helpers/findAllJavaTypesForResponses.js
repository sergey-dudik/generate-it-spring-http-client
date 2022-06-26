const {default: findJavaTypeForResponse} = require('./findJavaTypeForResponse');

/**
 * Seeks all the possible returns for the Java types
 * @param operations
 * @returns {string[]} The found types
 */
const main = (operations = []) => {
    const javaTypes = operations
        .flatMap(op => op.path)
        .flatMap(path => Object.values(path))// To each method
        .map(findJavaTypeForResponse)
        .filter(javaType => !! javaType);

    return [... new Set(javaTypes)];
}


exports.default = main;
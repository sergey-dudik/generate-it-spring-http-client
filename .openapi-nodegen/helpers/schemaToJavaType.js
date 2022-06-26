const mapSchemaToJava = {
    string: 'String',
    number: 'java.math.BigDecimal',
    integer: 'Integer',
    boolean: 'Boolean',
    object: 'Object'
}

/**
 * Tries to find the type for a schema
 * @param schema
 * @returns {string}
 */
const main = (schema = {}) => {
    const {type=''} = schema;
    if (type === 'array') {
        const {items = {}} = schema;
        return `java.util.List<${main(items)}>`;
    }

    return mapSchemaToJava[type] || '';
}

exports.default = main;
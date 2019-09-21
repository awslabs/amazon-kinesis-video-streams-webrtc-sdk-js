const sortedImports = require('./sorted-imports');

module.exports = {
    rules: {
        'sorted-imports': {
            create: sortedImports,
        },
    },
};

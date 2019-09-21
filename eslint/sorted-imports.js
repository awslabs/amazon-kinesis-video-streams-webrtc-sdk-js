function isBlankLineBefore(context, node) {
    return node.range[0] > 0 && !context.getSourceCode().getLocFromIndex(node.range[0] - 1).column;
}

function getText(context, node) {
    return context.getSourceCode().getText(node);
}

module.exports = context => {
    let previousImport = null;
    let previousKvsImport = null;

    return {
        meta: {
            type: 'layout',
            fixable: 'whitespace',
        },
        ImportDeclaration(node) {
            const sourceValue = node.source.value;

            // Check if there is a relative or absolute filepath
            if (sourceValue.startsWith('.') || sourceValue.startsWith('/')) {
                context.report({
                    node: node.source,
                    message: 'Relative and absolute module paths are not supported.',
                });
            }

            if (sourceValue.startsWith('kvs-webrtc')) {
                // Check if there is not a blank line before the first kvs-webrtc import
                if (!isBlankLineBefore(context, node) && node.range[0] > 0 && previousKvsImport === null) {
                    context.report({
                        node,
                        message: 'The KVS imports should be separated by an empty line.',
                        fix(fixer) {
                            return fixer.insertTextBefore(node, '\n');
                        },
                    });
                }

                // Check if there is a blank line between KVS imports
                if (isBlankLineBefore(context, node) && previousKvsImport !== null) {
                    context.report({
                        node,
                        message: 'The KVS imports should not be separated by any empty lines.',
                        fix(fixer) {
                            return fixer.removeRange([node.range[0] - 1, node.range[0]]);
                        },
                    });
                }

                // Check if a kvs-webrtc import is not sorted
                if (previousKvsImport !== null && sourceValue.toString() < previousKvsImport.source.value.toString()) {
                    context.report({
                        node: node.source,
                        message: `Imports should be sorted. '${previousKvsImport.source.value}' should come after '${sourceValue}'`,
                        fix(fixer) {
                            return [fixer.replaceText(node, getText(context, previousKvsImport)), fixer.replaceText(previousKvsImport, getText(context, node))];
                        },
                    });
                }
                previousKvsImport = node;
            } else {
                // Check if a non-kvs-webrtc import came after a kvs-webrtc import
                if (previousKvsImport !== null) {
                    context.report({
                        node: node.source,
                        message: `Non-KVS imports should come before KVS imports. '${sourceValue}' should come before '${previousKvsImport.source.value}'`,
                        fix(fixer) {
                            return [fixer.replaceText(node, getText(context, previousKvsImport)), fixer.replaceText(previousKvsImport, getText(context, node))];
                        },
                    });
                }

                // Check if there is a blank line between non-KVS imports
                if (isBlankLineBefore(context, node) && previousImport !== null) {
                    context.report({
                        node,
                        message: 'The non-KVS imports should not be separated by any empty lines.',
                        fix(fixer) {
                            return fixer.removeRange([node.range[0] - 1, node.range[0]]);
                        },
                    });
                }

                // Check if a non-kvs-webrtc import is not sorted
                if (previousImport !== null && sourceValue < previousImport.source.value) {
                    context.report({
                        node: node.source,
                        message: `Imports should be sorted. '${previousImport.source.value}' should come after '${sourceValue}'`,
                        fix(fixer) {
                            return [fixer.replaceText(node, getText(context, previousImport)), fixer.replaceText(previousImport, getText(context, node))];
                        },
                    });
                }
                previousImport = node;
            }

            // Check if import specifiers are. not sorted
            const specifiers = node.specifiers.filter(s => s.type === 'ImportSpecifier');
            const sortedSpecifiers = specifiers.concat().sort((a, b) => {
                if (a.local.name > b.local.name) {
                    return 1;
                }
                return -1;
            });
            for (const i in specifiers) {
                const specifier = specifiers[i];
                const specifierName = specifier.local.name;
                const sortedSpecifier = sortedSpecifiers[i];
                const sortedSpecifierName = sortedSpecifier.local.name;
                if (specifierName !== sortedSpecifierName) {
                    context.report({
                        node: specifier,
                        message: `Import specifiers should be sorted. '${specifierName}' should come after '${sortedSpecifierName}'`,
                        fix(fixer) {
                            const fixes = [];
                            for (const j in specifiers) {
                                const s = specifiers[j];
                                const ss = sortedSpecifiers[j];
                                fixes.push(fixer.replaceText(s, getText(context, ss)));
                            }
                            return fixes;
                        },
                    });
                    break;
                }
            }
        },
    };
};

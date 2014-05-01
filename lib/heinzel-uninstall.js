var Q = require('q'),
_ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'uninstall',
    alias: 'un',
    description: 'uninstall templates and generators',
    options: [
        ['-g, --gen <items>', 'uninstall generators', 'LIST'],
        ['-t, --tem <items>', 'uninstall templates', 'LIST']
    ],
    action: uninstall
};

function uninstall(options) {
    var result = {},
        promises = [],
        q;

    if (!options.gen && !options.tem) {
        q = Q.defer();
        q.reject(new Error('You should specify a generator or a template'));
        return q.promise;
    }

    if (options.gen) {
        promises.push(heinzel.uninstallGenerators(options.gen)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (options.tem) {
        promises.push(heinzel.uninstallTemplates(options.tem)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

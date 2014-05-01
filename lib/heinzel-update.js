var Q = require('q'),
_ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'update',
    alias: 'up',
    description: 'update templates and generators',
    options: [
        ['-g, --gen <items>', 'update generators', 'LIST'],
        ['-t, --tem <items>', 'update templates', 'LIST']
    ],
    action: update
};

function update(options) {
    var result = {},
        promises = [],
        q;

    if (!options.gen && !options.tem) {
        q = Q.defer();
        q.reject(new Error('You should specify a generator or a template'));
        return q.promise;
    }

    if (options.gen) {
        promises.push(heinzel.updateGenerators(options.gen)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (options.tem) {
        promises.push(heinzel.updateTemplates(options.tem)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

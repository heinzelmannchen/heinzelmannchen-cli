var Q = require('q'),
_ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'install',
    alias: 'in',
    description: 'install templates and generators',
    options: [
        ['-g, --gen [items]', 'install generators', 'LIST'],
        ['-t, --tem [items]', 'install templates', 'LIST'],
        ['-G, --global', 'install globaly']
    ],
    action: install
};

function install(options) {
    var result = {},
        promises = [],
        q;

    if (!_.isArray(options.gen) && !_.isArray(options.tem) && !_.isString(options.gen) && !_.isString(options.tem)) {
        q = Q.defer();
        q.reject(new Error('You should specify a generator or a template'));
        return q.promise;
    }

    if (options.gen) {
        promises.push(heinzel.installGenerators(options.gen)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (options.tem) {
        promises.push(heinzel.installTemplates(options.tem)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

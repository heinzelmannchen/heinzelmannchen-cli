var Q = require('q'),
_ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'uninstall',
    alias: 'un',
    description: 'uninstall templates and generators',
    options: [
        ['-g, --gen [items]', 'uninstall generators', 'LIST'],
        ['-t, --tem [items]', 'uninstall templates', 'LIST'],
        ['-G, --global', 'uninstall globaly'],
        ['-S, --save', 'save to config']
    ],
    action: uninstall
};

function uninstall(options) {
    var result = {},
        promises = [],
        q;

    if (!_.isArray(options.gen) && !_.isArray(options.tem) && !_.isString(options.gen) && !_.isString(options.tem)) {
        q = Q.defer();
        q.reject(new Error('You should specify a generator or a template'));
        return q.promise;
    }

    if (_.isArray(options.gen) || _.isString(options.gen)) {
        promises.push(heinzel.uninstallGenerators(options.gen)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (_.isArray(options.tem) || _.isString(options.tem)) {
        promises.push(heinzel.uninstallTemplates(options.tem)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

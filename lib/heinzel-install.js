var Q = require('q'),
    _ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'install',
    alias: 'in',
    description: 'install templates and generators',
    options: [
        ['-g, --gen [items]', 'install generators', 'LIST'],
        ['-t, --tem [items]', 'install templates', 'LIST']
    ],
    action: install
};

function install(options) {
    var result = {},
        promises = [],
        installOptions = {
            saveInConfig: true
        };

    if (!_.isArray(options.gen) && !_.isArray(options.tem) && !_.isString(options.gen) && !_.isString(options.tem)) {
        return heinzel.listGenerators()
            .then(function(generators) {
                return heinzel.installGenerators(generators, installOptions);
            })
            .then(function(generators) {
                result.generators = generators;
                return heinzel.listTemplates();
            })
            .then(function(templates) {
                return heinzel.installTemplates(templates, installOptions);
            })
            .then(function(templates) {
                result.templates = templates;
                return result;
            });
    }

    if (_.isArray(options.gen) || _.isString(options.gen)) {
        promises.push(heinzel.installGenerators(options.gen, installOptions)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (_.isArray(options.tem) || _.isString(options.tem)) {
        promises.push(heinzel.installTemplates(options.tem, installOptions)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

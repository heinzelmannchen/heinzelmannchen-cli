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
        promises = [];

    if (!_.isArray(options.gen) && !_.isArray(options.tem) && !_.isString(options.gen) && !_.isString(options.tem)) {
        return heinzel.listGenerators()
            .then(function(generators) {
                var options = {
                    saveInConfig: true
                };
                return heinzel.installGenerators(generators, options);
            })
            .then(function(generators) {
                result.generators = generators;
                return heinzel.listTemplates();
            })
            .then(function(templates) {
                var options = {
                    saveInConfig: true
                };
                return heinzel.installTemplates(templates, options);
            })
            .then(function(templates) {
                result.templates = templates;
                return result;
            });
    }

    if (_.isArray(options.gen) || _.isString(options.gen)) {
        promises.push(heinzel.installGenerators(options.gen, true)
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (_.isArray(options.tem) || _.isString(options.tem)) {
        promises.push(heinzel.installTemplates(options.tem, true)
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

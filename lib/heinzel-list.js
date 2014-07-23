var Q = require('q'),
    clc = require('cli-color'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'list',
    alias: 'ls',
    description: 'list domains, templates and generators',
    options: [
        ['-g, --gen', 'list generators'],
        ['-t, --tem', 'list templates'],
        ['-d, --dom', 'list domains']
    ],
    action: list
};

function list(options) {
    var result = {},
        promises = [],
        listAll = !options.gen && !options.tem && !options.dom;

    result[clc.blue('List')] = [];
    if (options.gen || listAll) {
        promises.push(heinzel.listGenerators()
            .then(function(generators) {
                result.generators = generators.join('\n');
            }));
    }

    if (options.tem || listAll) {
        promises.push(heinzel.listTemplates()
            .then(function(templates) {
                result.templates = templates.join('\n');
            }));
    }

    if (options.dom || listAll) {
        promises.push(heinzel.listDomains()
            .then(function(domains) {
                result.domains = domains.join('\n');
            }));
    }
    return Q.allSettled(promises).then(function() {
        return result;
    });
}

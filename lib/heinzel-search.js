var Q = require('q'),
    _ = require('underscore'),
    Table = require('cli-table'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'search <keywords>',
    alias: 'se <keywords>',
    description: 'search templates and generators in the npm registry',
    options: [
        ['-g, --gen', 'search only for generators'],
        ['-t, --tem', 'search only for templates'],
    ],
    action: search
};

function search(keywords, options) {
    var result = {},
        promises = [],
        searchAll = !options.gen && !options.tem;
    keywords = keywords.split(',');

    if (options.gen || searchAll) {
        promises.push(heinzel.searchGenerators(keywords)
            .then(function(generators) {
                result.generators = mapForOutput(generators);
            }));
    }

    if (options.tem || searchAll) {
        promises.push(heinzel.searchTemplates(keywords)
            .then(function(templates) {
                result.templates = mapForOutput(templates);
            }));
    }

    return Q.allSettled(promises).then(function() {
        return result;
    });
}

function mapForOutput(items) {
    var table = new Table({
        head: ['Name', 'Description']
    });

    if (_.isEmpty(items)) {
        return 'nothing found';
    }
    _.each(items, function(item) {
        table.push([item.name, item.description]);
    });
    return table.toString();
}

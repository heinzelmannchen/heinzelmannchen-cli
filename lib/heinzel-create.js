var Q = require('q'),
    _ = require('underscore'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'create <domain> [filters]',
    alias: 'cr <domain> [filters]',
    description: 'create domains, templates and generators',
    options: [
        ['-o, --override', 'override existing files'],
        ['-e, --ensurePathExists', 'ensure path exists'],
        ['-g, --gen', 'create generators'],
        ['-t, --tem', 'create templates'],
        ['-d, --dom', 'create domains']
    ],
    action: create
};

function create(filters, domain,  options) {
    var result = {};

    options.filters = createFilterObject(filters);
    return heinzel.create(domain, options)
        .then(function(createdFiles) {
            return { 'Created': createdFiles.sort().join('\n') };
        });
}

function createFilterObject(filters) {
    var filterObject = {};

    filters = filters.split('/');
    _.each(filters, function(filter) {
        var values;
        filter = filter.split('=');
        values = filter[1].split(',');
        if (values.length === 1) {
            values = _.first(values);
        }
        filterObject[filter[0]] = values;
    });

    return filterObject;
}

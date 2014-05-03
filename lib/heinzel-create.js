var Q = require('q'),
    _ = require('underscore'),
    winston = require('winston'),
    clc = require('cli-color'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'create <domain> [filters]',
    alias: 'cr <domain> [filters]',
    description: 'create domains, templates and generators',
    options: [
        ['-o, --override', 'override existing files'],
        ['-e, --ensurePathExists', 'ensure path exists'],
        ['-y, --dryRun', 'dry run, heinzel doesn\'t create files'],
        ['-g, --gen', 'create generators'],
        ['-t, --tem', 'create templates'],
        ['-d, --dom', 'create domains']
    ],
    action: create
};

function create(domain, filters, options) {
    var result = {},
        promises = [],
        domains = domain.split(','),
        q = Q.defer();

    if (options.dryRun) {
        winston.warn('THIS IS A DRY RUN');
        winston.warn('=================');
    }

    winston.info('start creating files');

    options.filters = createFilterObject(filters);
    promises = _.map(domains, function(domain) {
        winston.info('creating domain ' + domain);
        return heinzel.create(domain, options)
            .then((function(dom) {
                return function(createdFiles) {
                    return {
                        domain: dom,
                        created: createdFiles.sort().join('\n')
                    };
                };
            })(domain));
    });
    Q.all(promises).then(function(results) {
        var output = {},
            titleCreated;
        if (options.dryRun) {
            titleCreated = 'Would create';
        } else {
            titleCreated = 'Created files';
        }
        output[clc.blue('Domain')] = [clc.blue(titleCreated)];
        _.each(results, function(result) {
            output[result.domain] = [result.created];
        });
        q.resolve(output);
        winston.info('finished');
    }).fail(function(error) {
        q.reject(error);
    });
    return q.promise;
}

function createFilterObject(filters) {
    var filterObject = {};
    if (!filters) {
        return null;
    }

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

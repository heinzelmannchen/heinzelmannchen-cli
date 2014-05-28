var Q = require('q'),
    _ = require('underscore'),
    winston = require('winston'),
    clc = require('cli-color'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'create <domain> [filters]',
    alias: 'cr <domain> [filters]',
    description: 'create domains',
    options: [
        ['-o, --override', 'override existing files'],
        ['-d, --ensureDirExists', 'ensure dir exists'],
        ['-y, --dryRun', 'dry run, heinzel doesn\'t create files'],
        ['-l, --delimiter [delimiter]', 'set delimiters for example "{{ }}". Start and end separated by a space', '<% %>']
    ],
    action: create
};

function create(domain, filters, options) {
    var results = [],
        promises = [],
        domains = domain.split(','),
        q = Q.defer();

    if (options.dryRun) {
        winston.warn('THIS IS A DRY RUN');
        winston.warn('=================');
    }
    if (options.delimiter) {
        options.delimiter= options.delimiter.split(' ');
        options.delimiter = {
            start: options.delimiter[0],
            end: options.delimiter[1]
        };
    }

    options.ensurePathExists = options.ensureDirExists;

    winston.info('start creating files');

    options.filters = createFilterObject(filters);
    promises = _.map(domains, function(domain) {
        return function() {
            winston.info('creating domain ' + domain);
            return heinzel.create(domain, options)
                .then(
                    function(createdFiles) {
                        results.push( {
                            domain: domain,
                            created: createdFiles.sort().join('\n')
                        });
                    });
        };
    });
    promises.reduce(Q.when, Q()).then(function() {
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

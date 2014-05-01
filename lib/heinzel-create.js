var Q = require('q'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'create <domain>',
    alias: 'cr <domain>',
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

function create(domain, options) {
    var result = {};

    return heinzel.create(domain, options)
        .then(function(createdFiles) {
            return { 'Created': createdFiles.sort().join('\n') };
        });
}

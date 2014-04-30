var DESCRIPTION = 'list domains, templates and generators',
    Q = require('q'),
    heinzel, program;

module.exports = function(theProgram, theHeinzel, outputter) {
    program = theProgram;
    heinzel = theHeinzel;
    program
        .command('list')
        .description(DESCRIPTION)
        .option('-g, --gen', 'list generators')
        .option('-t, --tem', 'list templates')
        .option('-d, --dom', 'list domains')
        .action(outputter(list));
};

function list(options) {
    var result = {},
        promises = [],
        listAll = !options.gen && !options.tem && !options.dom;

    if (options.gen || listAll) {
        promises.push(heinzel.listGenerators()
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (options.tem || listAll) {
        promises.push(heinzel.listTemplates()
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    if (options.dom || listAll) {
        promises.push(heinzel.listDomains()
            .then(function(domains) {
                result.domains = domains;
            }));
    }
    return Q.allSettled(promises).then(function() {
        return result;
    });
}

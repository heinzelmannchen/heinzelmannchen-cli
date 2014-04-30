var DESCRIPTION = 'list domains, templates and generators',
    Q = require('q'),
    heinzel, program;

module.exports = function(theProgram, theHeinzel, outputter) {
    program = theProgram;
    heinzel = theHeinzel;
    program
        .command('list')
        .description(DESCRIPTION)
        .option('-G, --onlyGenerators', 'list generators')
        .option('-T, --onlyTemplates', 'list templates')
        .option('-D, --onlyDomains', 'list domains')
        .action(outputter(list));
};

function list(options) {
    var result = {},
        promises = [],
        listGenerators = options.onlyGenerators,
        listTemplates = options.onlyTemplates,
        listDomains = options.onlyDomains,
        listAll = !listGenerators && !listTemplates && !listDomains;

    if (listGenerators ||  listAll) {
        promises.push(heinzel.listGenerators()
            .then(function(generators) {
                result.generators = generators;
            }));
    }

    if (listTemplates ||  listAll) {
        promises.push(heinzel.listTemplates()
            .then(function(templates) {
                result.templates = templates;
            }));
    }

    if (listDomains ||  listAll) {
        promises.push(heinzel.listDomains()
            .then(function(domains) {
                result.domains = domains;
            }));
    }
    return Q.allSettled(promises).then(function() {
        return result;
    });
}

var DESCRIPTION = 'list domains, templates and generators',
    heinzel;
module.exports = function(program, theHeinzel) {
    heinzel = theHeinzel;
    program
        .command('list')
        .description(DESCRIPTION)
        .action(list);
    program
        .command('ls')
        .description(DESCRIPTION)
        .action(list);
};

function list(options) {
    var result = {},
        listGenerators = options.parent.generators,
        listTemplates = options.parent.templates,
        listDomains = options.parent.domains,
        listAll = !listGenerators && !listTemplates && !listDomains;

    if (listGenerators ||  listAll) {
        heinzel.listGenerators()
            .then(function(generators) {
                console.dir(generators);
            });
    }

    if (listTemplates ||  listAll) {
        heinzel.listTemplates()
            .then(function(templates) {
                console.dir(templates);
            });
    }

    if (listDomains ||  listAll) {
        heinzel.listDomains()
            .then(function(domains) {
                console.dir(domains);
            });
    }
}

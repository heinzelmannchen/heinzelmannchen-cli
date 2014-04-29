var heinzel;
module.exports = function(program, theHeinzel) {
    heinzel = theHeinzel;
    program
        .command('list')
        .description('list domains, templates and generators').
    action(list);
};

function list(options) {
    var result = {};
    if (options.parent.generator) {
        heinzel.listGenerators()
            .then(function(generators) {
                console.dir(generators);
            });
    }
}

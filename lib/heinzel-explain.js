var DESCRIPTION = 'explain datastructur returned by generator',
    Q = require('q'),
    heinzel, program;

module.exports = function(theProgram, theHeinzel, outputter) {
    program = theProgram;
    heinzel = theHeinzel;
    program
        .command('explain <generator>')
        .description(DESCRIPTION)
        .action(outputter(explain));
};

function explain(generator, options) {
    var result = '';

    return heinzel.explain(generator);
}

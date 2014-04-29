var program = require('commander'),
    heinzel = require('heinzelmannchen'),
    list = require('./heinzel-list'),
    me = module.exports;

me.start = function(argv) {
    program
        .version('0.0.1')
        .option('-g, --generator [name]', 'specify a generator');

    list(program, heinzel);

    program.parse(argv);
};

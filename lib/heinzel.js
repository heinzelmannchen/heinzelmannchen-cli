var program = require('commander'),
    heinzel = require('heinzelmannchen'),
    list = require('./heinzel-list'),
    me = module.exports;

me.start = function(argv) {
    program
        .version('0.0.1')
        .option('-g, --generators [name]', 'specify a generator')
        .option('-t, --templates [name]', 'specify a template')
        .option('-d, --domains [name]', 'specify a domain');

    list(program, heinzel);

    program.parse(argv);
};

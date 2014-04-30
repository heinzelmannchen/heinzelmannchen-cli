var program = require('commander'),
    heinzel = require('heinzelmannchen'),
    list = require('./heinzel-list'),
    explain = require('./heinzel-explain'),
    winston = require('winston'),
    _ = require('underscore'),
    Table = require('cli-table'),
    me = module.exports;

winston.cli();

me.start = function(argv) {
    program
        .version('0.0.1');

    addCommands([
        list,
        explain
    ]);

    program.parse(argv);
};

function addCommands(commands) {
    _.each(commands, function(command) {
        command(program, heinzel, outputter);
    });
}

function outputter(fun) {
    return function() {
        fun.apply(this, arguments)
            .then(function(result) {
                var table;
                if (_.isObject(result)) {
                    table = new Table();
                    _.each(result, function(item, key) {
                        var row = {};
                        row[key] = item;
                        table.push(row);
                    });
                    console.log(table.toString());
                } else {
                    winston.info(arguments);
                }
            })
            .fail(function(error) {
                winston.error(error.message);
            });
    };
}

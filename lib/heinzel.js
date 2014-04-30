var program = require('commander'),
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
    _.each(commands, function(item) {
        var command = program.command(item.command)
            .description(item.description)
            .action(outputter(item.action)),
        alias = program.command(item.alias)
            .description('an alias for ' + item.command)
            .action(outputter(item.action));
        _.each(item.options, function(option) {
            var flags = option[0],
                description = option[1];
            command.option(flags, description);
            alias.option(flags, description);
        });
    });
}

function outputter(fun) {
    return function() {
        fun.apply(this, arguments)
            .then(function(result) {
                if (_.isObject(result)) {
                    printTable(result);
                } else if (_.isString(result)) {
                    winston.info(result);
                }
            })
            .fail(function(error) {
                winston.error(error.message);
            });
    };

    function printTable(result) {
        var table;
        table = new Table();
        _.each(result, function(item, key) {
            var row = {};
            row[key] = item;
            table.push(row);
        });
        console.log(table.toString());
    }
}

var program = require('commander'),
    winston = require('winston'),
    _ = require('underscore'),
    Table = require('cli-table'),
    me = module.exports;

winston.cli();

me.start = function(argv) {
    var commands = [
        'create',
        'list',
        'explain',
        'install',
        'uninstall',
        'update',
        'search'
    ];
    program.version('0.0.1');

    addCommands(commands);

    program.parse(argv);

};

function addCommands(commands) {
    _.each(commands, function(item) {
        item = require('./heinzel-' + item);
        createCommand(item);
    });
}

function createCommand(item) {
    var command = program.command(item.command)
        .description(item.description)
        .action(outputter(item.action)),
        alias = program.command(item.alias)
            .description('an alias for ' + item.command)
            .action(outputter(item.action));

    _.each(item.options, function(option) {
        var flags = option[0],
            description = option[1],
            type = option[2];
        command.option(flags, description, getTypeFunction(type));
        alias.option(flags, description, getTypeFunction(type));
    });
}

function parseList(val) {
    return val.split(',');
}

function getTypeFunction(type) {
    var types = {
        list: parseList
    };
    type = type ? type.toLowerCase() : type;
    if (_.has(types, type)) {
        return types[type];
    } else {
        return null;
    }
}

function outputter(fun) {
    return function() {
        try {
            fun.apply(this, arguments)
                .then(function(result) {
                    if (_.isObject(result)) {
                        printTable(result);
                    } else if (_.isString(result)) {
                        winston.info(result);
                    }
                    process.exit(0);
                })
                .fail(function(error) {
                    winston.error(error.message);
                    process.exit(1);
                });
        } catch (error) {
            winston.error(error.message);
            process.exit(1);
        }
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

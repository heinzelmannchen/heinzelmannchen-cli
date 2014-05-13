var program = require('commander'),
    winston = require('winston'),
    packageJson = require('../package.json'),
    inquirer = require('inquirer'),
    heinzel = require('heinzelmannchen'),
    inquander = require('inquander'),
    _ = require('underscore'),
    Table = require('cli-table'),
    clc = require('cli-color'),
    me = module.exports,
    commands = [
        'create',
        'list',
        'explain',
        'install',
        'uninstall',
        'update',
        'search'
    ];

winston.cli();

me.start = function(argv) {
    program.version(packageJson.version);

    addCommands();
    heinzel.listDomains()
        .then(function(domains) {
            domains[0] = {
                name: domains[0],
                value: domains[0],
                checked: true
            };
            inquander.parse(program, process.argv, {
                defaultCommand: 'create',
                message: 'What would you like me to do today?',
                commandFilter: function(command) {
                    return _.contains(commands, command);
                },
                overrides: {
                    domain: {
                        type: 'checkbox',
                        choices: domains,
                        validate: function(values) {
                            if ( values.length > 0) {
                                return true;
                            } else {
                                return 'Select a domain!';
                            }
                        }
                    }
                }
            });
        })
        .fail(function(error) {
            inquander.parse(program, process.argv, {
                message: 'What would you like me to do today?',
                commandFilter: function(command) {
                    if (command === 'create') {
                        return false;
                    }
                    return _.contains(commands, command);
                }
            });
        });
};

function getCommand(commandName) {
    return _.findWhere(program.commands, {
        _name: commandName
    });
}

function isCommandGiven(argv) {
    var commands = _.flatten(_.map(program.commands, function(command) {
        return command._name;
    })),
        secArg = argv[2];
    return _.contains(commands, secArg) || argv.length > 2;
}

function addCommands() {
    _.each(commands, function(item) {
        item = require('./heinzel-' + item);
        createCommand(item);
    });
}

function createCommand(item) {
    var command = program.command(item.command)
        .description(getDescription(item.description))
        .action(onOverride(outputter(item.action))),
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

function getDescription(desc) {
    var desc = desc.split(' ');
    desc[0] = clc.bold.green(desc[0]);
    return desc.join(' ');
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

function onOverride(fun) {
    return function() {
        var override = isOverride(),
            args = arguments,
            me = this;
        if (override) {
            inquirer.prompt([{
                type: 'confirm',
                message: 'This will override all files. Are you sure?',
                name: 'override',
                default: false
            }], function(answer) {
                if (answer.override) {
                    fun.apply(me, args);
                }
            });
        } else {
            fun.apply(this, arguments);
        }
    };
}

function isOverride() {
    var override = false,
        dryRun = false;
    _.each(program.args, function(arg) {
        if (_.has(arg, 'override')) {
            override = arg.override;
        }
        if (_.has(arg, 'dryRun')) {
            if (arg.dryRun) {
                dryRun = true;
            }
        }
    });
    if (dryRun) {
        return false;
    }
    return override;
}

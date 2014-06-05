var Q = require('q'),
    _ = require('underscore'),
    winston = require('winston'),
    TEMPLATE_REPO = 'git+http://github.com/heinzelmannchen/heinzelmannchen-tpl-default-config',
    TEMPLATE_FILE = 'heinzelrc.tpl',
    DATA_FILE = 'heinzelrc.json',
    heinzel = require('heinzelmannchen'),
    askGen = require('heinzelmannchen-gen-ask');

module.exports = {
    command: 'init [template] [ask] [repo]',
    alias: 'ii [template] [ask] [repo]',
    description: 'initialize the .heinzelrc',
    action: init
};

function init(template, ask, repo) {
    var options = {
        silent: true,
        global: true
    };
    if (template && !ask) {
        ask = template.replace('tpl', 'json');
    }
    repo = repo || TEMPLATE_REPO;
    template = template || TEMPLATE_FILE;
    ask = ask || DATA_FILE;
    winston.info('installing', repo,'...');
    return heinzel.installTemplates(repo, options)
        .then(function(module) {
            module = heinzel.resolvePackageNameFromUrl(module);
            askGen = new askGen();
            askGen.setConfig(require(module[0] + '/' + ask));
            return askGen.createData().then(function(answers) {
                var data = {};
                answers = answers[0];
                _.each(answers, function(element, key) {
                    var values = _.map(element.split(','), function(value) {
                        return value.trim();
                    });
                    data[key] = values;
                });
                return heinzel.templateFromNpm(module[0] + '/' + template, data);
            });
        })
        .then(function(content) {
            return heinzel.write('.heinzelrc', content);
        })
        .fail(function(error) {
            if (/^win/.test(process.platform)) {
                if (error.message && error.message.search(/Cannot find module/) >= 0) {
                    winston.info('KNOWN WINDOWS ERROR');
                    winston.error('Try to copy modules from C:\\program files\\nodejs\\node_modules to %APPDATA%/npm/node_modules');
                }
            }
            return error;
        });
}

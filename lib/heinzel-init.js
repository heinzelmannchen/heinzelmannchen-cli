var Q = require('q'),
    _ = require('underscore'),
    TEMPLATE_REPO = 'git+http://github.com/heinzelmannchen/heinzelmannchen-tpl-default-config',
    TEMPLATE_FILE = 'heinzelrc.tpl',
    GeneratorAsk = require('heinzelmannchen-gen-ask'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'init',
    alias: 'ii',
    description: 'initialize the .heinzelrc',
    action: init
};

function init(options) {
    var ask = new GeneratorAsk();
    ask.setConfig({
        ask: [{
            type: 'input',
            name: 'generators',
            message: 'Add generators'
        }, {
            type: 'input',
            name: 'templates',
            message: 'Add templates'
        }]
    });
    return ask.createData().then(function(answers) {
        var data = {};
        answers = answers[0];
        _.each(answers, function(element, key) {
            var values = _.map(element.split(','), function(value) {
                return {
                    name: value.trim(),
                    module: value.trim()
                };
            });
            data[key] = values;
        });
        return heinzel.init(TEMPLATE_REPO, TEMPLATE_FILE, data);
    });
}

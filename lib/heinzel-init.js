var Q = require('q'),
    _ = require('underscore'),
    TEMPLATE_REPO = 'git+http://github.com/heinzelmannchen/heinzelmannchen-tpl-default-config',
    TEMPLATE_FILE = 'heinzelrc.tpl',
    DATA_FILE = 'heinzelrc.json',
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'init [template] [ask] [repo]',
    alias: 'ii [template] [ask] [repo]',
    description: 'initialize the .heinzelrc',
    action: init
};

function init(template, ask, repo) {
    if (template && !ask) {
        ask = template.replace('tpl', 'json');
    }
    return heinzel.init(repo || TEMPLATE_REPO, template || TEMPLATE_FILE, ask || DATA_FILE);
}

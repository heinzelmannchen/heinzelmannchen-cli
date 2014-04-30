var Q = require('q'),
    heinzel = require('heinzelmannchen');

module.exports = {
    command: 'explain <generator>',
    alias: 'ex <generator>',
    description: 'explain datastructur returned by generator',
    action: explain
};

function explain(generator, options) {
    var result = '';

    return heinzel.explain(generator);
}

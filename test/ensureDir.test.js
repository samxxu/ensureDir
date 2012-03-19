var ensureDir = require('../index.js');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

function removeDir(dir, depth) {
    for (var i = 0, current = dir; i < depth; i++,current = path.dirname(current)) {
        fs.rmdirSync(current);
        //console.log('[' + current + '] removed');
    }
}

var dir = '/tmp/path/to/nonexist';
ensureDir(dir, 0755, function(err) {
    assert.ifError(err);
    path.exists(dir, function(exists) {
        assert.ok(exists, '#ensureDir(notExistingDir) should ensure the dir exists');
        removeDir(dir, 3);
    });
});


var relativeDir = './temp/path/to/nonexist';
ensureDir(relativeDir, 0755, function(err) {
    assert.ifError(err);
    path.exists(relativeDir, function(exists) {
        assert.ok(exists, '#ensureDir(relativeDir) should ensure the dir exists');
        removeDir(relativeDir, 4);
    });
});

var path = require('path');
var fs = require('fs');

/**
 * ensure a directory exists, create it recursively if not.
 *
 * @param dir the directory you want to ensure it exists
 * @param mode refer to fs.mkdir()
 * @param callback
 */
module.exports = function ensureDir(dir, mode, callback) {
    if (mode && typeof(mode) === 'function') {
        callback = mode;
        mode = null;
    }

    mode = mode || 0777 & (~process.umask());

    callback = callback || function () {
    };

    _ensureDir(dir, mode, callback);
}

function _ensureDir(dir, mode, callback) {
    var existsFunction = fs.exists || path.exists;

    existsFunction(dir, function (exists) {
        if (exists) return callback(null);

        var current = path.resolve(dir);
        var parent = path.dirname(current);

        _ensureDir(parent, mode, function (err) {
            if (err)return callback(err);

            fs.mkdir(current, mode, function (err) {
                if (err)return callback(err);
                callback();
            });
        });
    });
}

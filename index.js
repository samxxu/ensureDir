var path = require('path');
var fs = require('fs');

module.exports = function ensureDir(dir, mode, callback) {

    path.exists(dir, function(exists) {
        if (exists) return callback(null);

        if (typeof mode === 'function') {
            callback = mode;
            mode = 0777 & (~process.umask());
        }

        var current = path.resolve(dir);
        var parent = path.dirname(current);

        ensureDir(parent, mode, function(err) {
            if (err)return callback(err);

            fs.mkdir(current, mode, function(err) {
                if (err)return callback(err);
                console.log('folder[' + current + '] created');
                callback();
            });
        });
    });
}

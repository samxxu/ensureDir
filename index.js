var path = require('path')
  , fs = require('fs');

var fnExists = fs.exists || path.exists;

/**
 * Ensures the directory exists, creating it recursively if not.
 *
 * @param {string} dir The directory path to ensure existance.
 * @param {number=} mode See fs.mkdir
 * @param {function(?Error)} callback
 */
module.exports = function (dir, mode, callback) {
  if (mode && typeof(mode) === 'function') {
    callback = mode;
    mode = null;
  }

  mode = mode || 0777 & (~process.umask());

  callback = callback || function () {
  };

  _ensureDir(dir, mode, callback);
};

function _ensureDir(dir, mode, callback) {
  fnExists(dir, function (exists) {
    if (exists) return callback(null);

    var current = path.resolve(dir), parent = path.dirname(current);

    _ensureDir(parent, mode, function (err) {
      if (err) return callback(err);

      fs.mkdir(current, mode, function (err) {
        if (err && err.code != 'EEXIST') return callback(err); // avoid the error under concurrency
        callback(null);
      });
    });
  });
}

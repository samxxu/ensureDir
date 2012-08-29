A utility for [node](http://nodejs.org), ensures the directory exists, creating it recursively if not.

## Example

    ensureDir('./temp/path/to/nonexist/dir/', 0755, function (err) {
        if (err) return next(err);
        // your code here!
    });

## Installation

    $ npm install ensureDir


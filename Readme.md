Ensure directory exists, create it recursively if not.

## Example

    ensureDir('./temp/path/to/nonexist/dir/', 0755, function (err) {
        if (err) return next(err);
        // your code here!
    });

## Installation

    $ npm install ensureDir


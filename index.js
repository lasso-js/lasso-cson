'use strict';

var CSON = require('season');

module.exports = function(lasso, config) {
    lasso.dependencies.registerRequireExtension('cson', {
            object: true,

            read: function(path, lassoContext, callback) {
                return new Promise((resolve, reject) => {
                    callback = callback || function (err, res) {
                        return err ? reject(err) : resolve(res);
                    };

                    CSON.readFile(path, function(err, o) {
                        if (err) {
                            return callback(err);
                        }


                        callback(null, JSON.stringify(o));
                    });
                })
            },

            getLastModified: function(path, lassoContext, callback) {
                return lassoContext.getFileLastModified(path, callback);
            }
        });
};

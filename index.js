var CSON = require('season');

module.exports = function(lasso, config) {
    lasso.dependencies.registerRequireExtension('cson', {
            object: true,

            read: function(path, lassoContext, callback) {

                CSON.readFile(path, function(err, o) {
                    if (err) {
                        return callback(err);
                    }


                    callback(null, JSON.stringify(o));
                });
            },

            getLastModified: function(path, lassoContext, callback) {
                lassoContext.getFileLastModified(path, callback);
            }
        });
};

'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var plugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-CSON' , function() {

    beforeEach(function(done) {
        for (var k in require.cache) {
            if (require.cache.hasOwnProperty(k)) {
                delete require.cache[k];
            }
        }
        done();
    });

    it('should render a simple CSON dependency that uses require', function(done) {

        var myLasso = lasso.create({
                fingerprintsEnabled: false,
                outputDir: nodePath.join(__dirname, 'static'),
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: plugin,
                        config: {

                        }
                    },
                    {
                        plugin: 'lasso-require',
                        config: {
                            includeClient: false
                        }
                    }
                ]
            });

        myLasso.lassoPage({
                name: 'testPage',
                dependencies: [
                    'require: ./test.cson'
                ],
                from: nodePath.join(__dirname, 'fixtures/project1')
            },
            function(err, lassoPageResult) {
                if (err) {
                    return done(err);
                }

                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), {encoding: 'utf8'});
                expect(output).to.contain("test.cson");
                expect(output).to.contain('".text.html.marko"');

                lasso.flushAllCaches(done);
            });
    });


});

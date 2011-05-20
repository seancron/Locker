/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var assert = require("assert");
var vows = require("vows");
var RESTeasy = require("api-easy");
var lconfig = require('../Common/node/lconfig.js');

lconfig.load('config.json');

var tests = RESTeasy.describe("MongoDB");

tests.use(lconfig.lockerHost, lconfig.lockerPort)
    .discuss("A service")
        .path("/Me/mongo-client")
        .discuss("can connect to a mongo server")
            .get("/names")
                .expect("and connects to the correct collections", function(err, resp, body) {
                    var names = JSON.parse(body);
                    assert.equal(names.length, 2);
                    assert.equal(names[0], 'thing1');
                    assert.equal(names[1], 'thing2');
                })
            .get("/put")
                .expect("and can put an object in the collection", function(err, resp, body) {
                    assert.equal(body, '1');
                })
        .undiscuss()
        .unpath()
    .undiscuss();
    
tests.use(lconfig.lockerHost, lconfig.lockerPort)
    .discuss("A service")
        .path("/Me/mongo-client")
        .discuss("can connect to a mongo server")
            .get("/get")
                .expect("and can get an object from the collection", function(err, resp, body) {
                    assert.equal(JSON.parse(body).hello, 'world');
                })
        .undiscuss()
        .unpath()
    .undiscuss();
    
tests.export(module);
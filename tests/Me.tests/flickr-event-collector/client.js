var http = require("http");
var fs = require("fs");
var sys = require('sys');
var connect = require('connect'),
    express = require('express'),
    app = express.createServer(
            connect.bodyParser(),
            connect.cookieParser(),
            connect.session({secret : "locker"}));

var eventCount = 1;
app.post('/event', function(req, res) {
   sys.debug('flickr-event!!!');
    fs.writeFileSync('events', "" + eventCount);
    eventCount++;
//        sys.debug("events:" + fs.readFileSync('events'));
    res.writeHead(200);
    res.end();
});

// Startup shiz
process.stdin.resume();
process.stdin.on("data", function(chunk) {
    var processInfo = JSON.parse(chunk);
    process.chdir(processInfo.workingDirectory);
    process.stderr.write("Listening on " + processInfo.port);
    app.listen(processInfo.port, function() {
        process.stdout.write(chunk);
        process.stdout.flush();
    });
});

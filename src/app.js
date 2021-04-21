var http = require('http');

var app = http.createServer(function (req, resp) {
    resp.writeHead(200, {'Content-Type': 'text/plain'});
    resp.write('Hello world!');
    resp.end('');
}).listen(8080);

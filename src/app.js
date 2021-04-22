var http = require('http');
var url = require('url');
var config = require('./config');
var template = require('./lib/template');

http.createServer(function (req, resp) {
    var pathname = url.parse(req.url).pathname;
    var htmlTemplate = '';
    var status = 200;

    if (pathname === '/') 
        htmlTemplate = template.root;
    else if (pathname === '/create')
        htmlTemplate = template.create;
    else {
        status = 404;
        htmlTemplate = 'Not found';
    }

    resp.writeHead(status);
    resp.end(htmlTemplate);
}).listen(config.port);

var http = require('http');
var url = require('url');
var config = require('./config');
var template = require('./lib/template');
var process = require('./lib/process');

http.createServer(function (req, resp) {
    var pathname = url.parse(req.url).pathname;
    var htmlTemplate = '';
    var status = 200;
    var statusMsg = {};

    switch (pathname) {
        case '/':
            htmlTemplate = template.root;
            break;
        case '/create':
            htmlTemplate = template.create;
            break;
        case '/create_process':
            process.create(req, resp);
            status = 302;
            statusMsg = {
                'Location': '/'
            };
            break;
        default:
            status = 404;
            htmlTemplate = 'Not found';
    }

    resp.writeHead(status, statusMsg);
    resp.end(htmlTemplate);
}).listen(config.port);

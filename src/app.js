var http = require('http');
var url = require('url');
var config = require('./config');
var template = require('./lib/template');
var process = require('./lib/process');

http.createServer(function (req, resp) {
    var urlParse = url.parse(req.url, true);
    var pathname = urlParse.pathname;
    var queryObj = urlParse.query;
    var htmlTemplate = '';
    var status = 200;
    var statusMsg = {'Content-Type': 'text/html'};

    switch (pathname) {
        case '/':
            htmlTemplate = template.root(queryObj.id);
            break;
        case '/create':
            htmlTemplate = template.create();
            break;
        case '/create_process':
            process.create(req);
            status = 302;
            statusMsg = {
                'Location': '/'
            };
            break;
        case '/update':
            htmlTemplate = template.update(queryObj.id);
            break;
        case '/update_process':
            process.update(req);
            status = 302;
            statusMsg = {
                'Location': '/'
            };
            break;
        case '/delete_process':
            process.delete(req);
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

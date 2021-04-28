var qs = require('querystring');
var fs = require('fs');
var config = require('../config');

module.exports = {
    create: function(req) {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk;

            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var path = `${config.dataDir}/${post.title}.txt`
            fs.writeFile(path, post.desc, function (err) {
                if (err) return console.log(err);
                console.log(`Write a file (${post.title}: ${post.desc})`);
            });
        });
    }
};
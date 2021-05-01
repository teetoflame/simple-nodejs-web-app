const qs = require('querystring');
const fs = require('fs');
const config = require('../config');

module.exports = {
    create: function(req) {
        let body = '';
        req.on('data', function(chunk) {
            body += chunk;

            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function() {
            const post = qs.parse(body);
            const path = `${config.dataDir}/${post.title}.txt`;
            fs.writeFile(path, post.desc, function (err) {
                if (err) return console.log(err);
                console.log(`Write a file (${post.title}: ${post.desc})`);
            });
        });
    },
    update: function(req) {
        let body = '';
        req.on('data', function(chunk) {
            body += chunk;

            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function() {
            const post = qs.parse(body);
            const path = `${config.dataDir}/${post.title}.txt`;
            fs.writeFile(path, post.desc, function(err) {
                if (err) return console.log(err);
                console.log(`Update the file "${post.title}.txt"`);
            });
        });
    },
    delete: function(req) {
        let body = '';
        req.on('data', function(chunk) {
            body += chunk;

            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function() {
            const post = qs.parse(body);
            const path = `${config.dataDir}/${post.id}.txt`;
            fs.unlink(path, function(err) {
                if (err) return console.log(err);
                console.log(`Delete the file "${post.id}.txt"`);
            });
        });
    }
};
var config = require('../config');
var fs = require('fs');
var path = require('path');

function makeHtmlTemplate(htmlBody) {
    return `
    <!DOCTYPE HTML>
    <HTML>
        <HEAD>
            <meta charset="utf-8">
        </HEAD>
        <BODY>
            ${htmlBody}
        </BODY>
    </HTML>
    `;
}

function makeHtmlPostList() {
    var htmlPostList = '';
    fs.readdir(config.dataDir, function(err, files) {
        if (err) return console.log(err);
        
        htmlPostList = '<ul>';
        files.forEach(function(filepath) {
            htmlPostList += `<li>${path.parse(filepath).name}</li>`;
        });
        htmlPostList += '</ul>';
    });

    return htmlPostList;
}

module.exports = {
    root: makeHtmlTemplate(`
    <h3>Posts</h3>
    <p> 
        ${makeHtmlPostList()}
    </p>
    <p>
        <a href="/create">Create</a>
    </p>
    `),
    create: makeHtmlTemplate(`
    <form action="http://localhost:${config.port}/create_process" method="post">
        <p><input type="text" id="title" name="title" placeholder="Title"></p>
        <p><textarea id="desc" name="desc" placeholder="Description"></textarea></p>
        <p><input type="submit"></p>
    </form>
    `),
};
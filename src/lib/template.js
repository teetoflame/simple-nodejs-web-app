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
    var htmlPostList = '<ul>';
    var files = fs.readdirSync(config.dataDir);
    files.forEach(function(filepath) {
        htmlPostList += `<li>${path.parse(filepath).name}</li>`;
    });
    htmlPostList += '</ul>';

    return htmlPostList;
}

module.exports = {
    root: function(id) {
        var htmlContent = '<h2>Welcome to My Node.js Web App</h2>';
        var hrefList = '<a href="/create">Create</a><br>';

        if (id !== undefined) {
            htmlContent += '<p>';
            var postPath = `${config.dataDir}/${id}.txt`;
            if (fs.existsSync(postPath)) {
                var postDesc = fs.readFileSync(postPath, 'utf-8');
                htmlContent += postDesc;
                hrefList += `<a href="/update?id=${id}">Update</a>`;
            }
            else
                htmlContent += 'No post was found.';
            
            htmlContent += '</p>';
        }
        return makeHtmlTemplate(`
        <p>${htmlContent}</p>
        <h3>Posts</h3>
        <p>${makeHtmlPostList()}</p>
        <p>${hrefList}</p>
        `);
    },
    create: function() {
        return makeHtmlTemplate(`
        <form action="http://localhost:${config.port}/create_process" 
        method="post">
            <p><input type="text" id="title" name="title" placeholder="Title">
            </p>
            <p><textarea id="desc" name="desc" 
                placeholder="Description"></textarea>
            </p>
            <p><input type="submit"></p>
        </form>
        `);
    },
    update: function(id) {
        var postPath = `${config.dataDir}/${id}.txt`;
        var postDesc = fs.readFileSync(postPath, 'utf-8');
        console.log(postDesc);
        return makeHtmlTemplate(`
        <form action="http://localhost:${config.port}/update_process" 
        method="post">
            <p>
            <input type="hidden" id="id" name="id" value=${id}>
            <input type="text" id="title" name="title" placeholder="Title",
             value="${id}">
            </p>
            <p><textarea id="desc" name="desc" 
                placeholder="Description">${postDesc}</textarea>
            </p>
            <p><input type="submit"></p>
        </form>
        `);
    }
};
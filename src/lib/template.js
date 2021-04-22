var config = require('../config');

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

module.exports = {
    root: makeHtmlTemplate(`
    <a href="/create">Create</a>
    `),
    create: makeHtmlTemplate(`
    <form action="http://localhost:${config.port}/create_process" method="post">
        <p><input type="text" id="title" name="title" placeholder="Title"></p>
        <p><textarea id="desc" name="desc" placeholder="Description"></textarea></p>
        <p><input type="submit"></p>
    </form>
    `),
};
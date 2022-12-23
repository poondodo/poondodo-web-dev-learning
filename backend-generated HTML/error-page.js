const errorWeb = {
    errorPage: function (error) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Error</title>
                    <link rel="stylesheet" href="/game.css">
                </head>
                <body>
                    <div id="error-message">
                        <h1 class="error" >${error}</h1>
                        <form class="back-to-home" action="/" method="GET">
                            <p><button class="bigbutton" type="submit">Go to Home Page</button></p>
                        </form>
                    </div>
                </body>
            </html>
        `;
    },
};
module.exports = errorWeb;
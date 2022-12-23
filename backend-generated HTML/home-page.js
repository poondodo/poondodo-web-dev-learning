const homeWeb = {
    loginPage: function () {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Log In Page</title>
                    <link rel="stylesheet" href="/home.css">
                </head>
                <body>
                    <div id="login-app">
                        ${homeWeb.getLoginPage()}
                    </div>
                </body>
            </html>
        `;
    },

    getLoginPage: function () {
        return `
            <h1 class="login-welcome" style="color:orange;text-align:center;">Welcome to guess game!</h1>
            <div class="login-form">
                
                <form action="/login" method="POST">
                    <p><input class="username" name="username" placeholder="Username"/></p>
                    <p><button type="submit">login</button></p>
                </form>
            </div>
        `;
    },
};
module.exports = homeWeb;
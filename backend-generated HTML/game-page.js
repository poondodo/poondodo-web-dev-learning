const gameWeb = {
    gamePage: function (game, words) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Guess Game</title>
                    <link rel="stylesheet" href="/game.css">
                </head>
                <body>
                    <div id="game-app">
                        ${gameWeb.getGamePage(game.username)}
                    </div>
                    <div id="secret-words">
                        ${gameWeb.getSecretWords(words)}
                    </div>
                    <div id="guess-history">
                        ${gameWeb.getGuessHistory(game.guessHistory)}
                    </div>
                    <div id="guess-page">
                        ${gameWeb.getGuessInput(game.winOrNot)}
                    </div>
                </body>
            </html>
        `;
    },

    getGamePage: function (username) {
        return `
            <div class="top-part">
                <h1 class="welcome" >Welcome ${username}!</h1>
                <form class="logout" action="/logout" method="POST">
                    <p><button type="submit">Log out</button></p>
                </form>
            </div>
        
            
        `;
    },

    getSecretWords: function (words) {
        return `
        <h1 class="words-title" >Secret Words</h1>
        <div class="words">${words}</div>
        <div class="new-game-form">
            <form  action="/new-game" method="POST">
                <p><button class="bigbutton" type="submit">Start New Game</button></p>
            </form>
        </div>
        `;
    },

    getGuessHistory: function (guessHistory) {
        if (guessHistory) {
            let guessString = "";
            for (let index = 0; index < guessHistory.length; index++) {
                guessString = guessString.concat(`Your ${index + 1}th guess is ${guessHistory[index].guessWord}, it matches ${guessHistory[index].matchLetterNumber} character(s). <br>`);
            }
            return `
                <p class="guess-history">${guessString}</p>
            `;
        } else {
            return ``;
        }
    },

    getGuessInput: function (winOrNot) {
        if (!winOrNot) {
            return `
                <div class="guess-form">
                    <form class="guess-form-form" action="/guess" method="POST">
                        <p><input class="guess-input" name="newguess" placeholder="make a guess"/></p>
                        <p><button class="bigbutton" type="submit">guess now</button></p>
                    </form>
                </div>
            `;
        } else {
            return `
            <div class="has-win">
                <p class="win">You Win!!</p>
            </div>
            `;
        }
    },
};

module.exports = gameWeb;
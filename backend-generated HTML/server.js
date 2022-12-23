const cookieParser = require('cookie-parser');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

const userdata = require('./user-data');
const homeWeb = require('./home-page');
const gameWeb = require('./game-page');
const gameInfo = require('./game-info');
const errorWeb = require('./error-page');
const words = require('./words');

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (userdata.isValidSessionId(sid)) {
        const username = userdata.getUsernameBySessionId(sid);
        const hasGameStarted = gameInfo.games[username];
        if (hasGameStarted) {
            const currentGame = gameInfo.findExistingGame(username);
            res.send(gameWeb.gamePage(currentGame, words));
        } else {
            const newGame = gameInfo.startNewGame(username);
            res.send(gameWeb.gamePage(newGame, words));
        }
    } else {
        res.clearCookie('sid');
        res.send(homeWeb.loginPage());
    }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username } = req.body;
    const regex = /^[A-Za-z0-9]+$/;
    const checkUsernameValidation = (username) && (username.match(regex)) && (username.toUpperCase() !== "DOG");

    if (checkUsernameValidation) {
        const sessionId = uuidv4();
        userdata.addSession(sessionId, username);
        userdata.addUserName(username);
        res.cookie('sid', sessionId);
        res.redirect('/');
    } else {
        const error = "Username should only contain letters and numbers and not to be 'dog'."
        res.status(403).send(errorWeb.errorPage(error));
    }
});

app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
    const { newguess } = req.body;
    const sid = req.cookies.sid;
    if (userdata.isValidSessionId(sid)) {
        const username = userdata.getUsernameBySessionId(sid);
        gameInfo.checkGuess(username, newguess);
        res.redirect('/');
    } else {
        res.clearCookie('sid');
        const error = "You are not authorized to make a guess. Please login.";
        res.status(403).send(errorWeb.errorPage(error));
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    if (userdata.isValidSessionId(sid)) {
        const username = userdata.getUsernameBySessionId(sid);
        gameInfo.startNewGame(username);
        res.redirect('/');
    } else {
        res.clearCookie('sid');
        const error = "You are not authorized to start a new game. Please login.";
        res.status(403).send(errorWeb.errorPage(error));
    }

});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
const { gamePage } = require("./game-page");
const words = require('./words');

const games = {};

function findExistingGame(username) {
    console.log(`username: ${username}, secret word: ${games[username].secretWord}`);
    return games[username];
}

function startNewGame(username) {
    const game = {};
    game.username = username;
    game.guessHistory = [];
    game.secretWord = words[parseInt(Math.random() * words.length)];
    game.status = false;
    games[username] = game;
    console.log(`username: ${username}, secret word: ${game.secretWord}`);
    return game;
}

function letterCountsOf(str) {
    const letterCounts = {};
    str.toUpperCase().split('').forEach(letter => {
        letterCounts[letter] = letterCounts[letter] + 1 || 1;
    });
    return letterCounts;
}

function calculateMatch(guessWord, secretWord) {
    const wordCounts = letterCountsOf(secretWord);
    const guessCounts = letterCountsOf(guessWord);
    let matched = 0;
    for (let letter in guessCounts) {
        const wordCount = wordCounts[letter] || 0;
        const guessCount = guessCounts[letter] || 0;
        matched += Math.min(wordCount, guessCount);
    }
    return matched;
}

function addGuess(username, guessWord, matchLetterNumber) {
    games[username].guessHistory.push({
        guessWord,
        matchLetterNumber,
    })
};

function checkGuess(username, guessWord) {
    const matched = calculateMatch(guessWord, games[username].secretWord);
    addGuess(username, guessWord, matched);
    games[username].winOrNot = (guessWord === games[username].secretWord);
}

const guess = {
    games,
    findExistingGame,
    startNewGame,
    checkGuess,
};

module.exports = guess;
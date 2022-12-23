const loggedInUsers = ['Alice']

const messages = {
    'Alice': {
        'Jay': [
            {
                sendFrom: 'John',
                content: `hang out tonight?`,
            },
            {
                sendFrom: 'Jay',
                content: `OK cool`,
            },
        ],
    },
}

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isValidWord(word) {
    let isValid = true;
    isValid = isValid && word.match(/^[A-Za-z]*$/);
    return isValid;
}

function addUser(username) {
    messages[username] = {};
}

function deleteLoggedInUser(username) {
    const index = loggedInUsers.findIndex((user) => user == username);
    loggedInUsers.splice(index, 1);
}

module.exports = {
    isValidUsername,
    isValidWord,
    addUser,
    deleteLoggedInUser,
    loggedInUsers,
    messages,
};
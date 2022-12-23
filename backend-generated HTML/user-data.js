const users = {
    
};

const sessionIds = {

};

function addSession(sid, username) {
    sessionIds[sid] = username;
}

function addUserName(username) {
    if (!users[username]) {
        users[username] = username;
    }
}

function isValidSessionId(sid) {
    if (sid && sessionIds[sid]) {
        return true;
    }
    return false;
}

function getUsernameBySessionId(sid) {
    const username = sessionIds[sid];
    return username;
}

const userData = {
    addSession,
    addUserName,
    isValidSessionId,
    getUsernameBySessionId,
};

module.exports = userData;
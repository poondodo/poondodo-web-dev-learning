const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

const cats = {
    Jorts: {
        name: "Jorts",
        age: 4,
        color: "orange",
    }
};

app.use(express.static('./public'));

app.get('/cats', (req, res) => {
    res.json(Object.keys(cats));
});
app.get('/cats/:name', (req, res) => {
    const name = req.params.name;
    if (cats[name]) {
        res.json(cats[name]);
        return;
    }
    res.status(404).json({ error: `Unknown cat: ${name}` });
});

app.post('/cats', express.json(), (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).json({ error: "'name' required" });
    } else if (cats[name]) {
        res.status(409).json({ error: `duplicate: ${name}` });
    } else {
        cats[name] = req.body;
        res.sendStatus(200);
    }
});

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);

    users.loggedInUsers.push(username);

    if (!users.messages[username]) {
        users.addUser(username);
    }
    
    if (!users.messages[username].Alice) {
        users.messages[username].Alice = [{
            sendFrom: 'Alice',
            sendTime: '2022-12-06 11:12:23',
            content: `I'm synthetic data. You can talk to me.`,
        }]
    }

    res.cookie('sid', sid);
    res.json({ username });
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
        users.deleteLoggedInUser(username);
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
});

app.get('/api/loggedinusers', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const loggedInUsers = users.loggedInUsers;

    res.json({ loggedInUsers });
})

app.post('/api/messagelist', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { currentTalkingTo } = req.body;
    const messageList = users.messages[username][currentTalkingTo] || [];

    res.json({ username, messageList });
});

app.post('/api/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { message, currentTalkingTo } = req.body;

    if (!message || message === '') {
        res.status(400).json({ error: 'require-message'});
    }

    if (!users.messages[username][currentTalkingTo]) {
        users.messages[username][currentTalkingTo] = [];
    }
    if (!users.messages[currentTalkingTo][username]) {
        users.messages[currentTalkingTo][username] = [];
    }
    users.messages[username][currentTalkingTo].push( message );
    users.messages[currentTalkingTo][username].push( message );
    res.json({ username, message});
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));